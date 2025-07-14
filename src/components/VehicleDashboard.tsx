import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Car, 
  Fuel, 
  MapPin, 
  TrendingUp, 
  Calendar,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { vehicleService } from '@/lib/vehicleService';
import { useAuth } from '@/contexts/AuthContext';
import { VehicleEntry, VehicleStats } from '@/types/vehicle';
import { format, subMonths, isAfter } from 'date-fns';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const VehicleDashboard = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<VehicleEntry[]>([]);
  const [stats, setStats] = useState<VehicleStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = vehicleService.subscribeToUserEntries(user.uid, (newEntries) => {
      setEntries(newEntries);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!user || entries.length === 0) return;

    vehicleService.getUserStats(user.uid).then(setStats);
  }, [user, entries]);

  // Calculate monthly mileage data
  const getMonthlyData = () => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = subMonths(new Date(), i);
      return {
        month: format(date, 'MMM yyyy'),
        date,
        mileage: 0,
        trips: 0
      };
    }).reverse();

    entries.forEach(entry => {
      const entryMonth = format(entry.dateTime, 'MMM yyyy');
      const monthData = last6Months.find(m => m.month === entryMonth);
      if (monthData) {
        monthData.mileage += entry.totalMileage;
        monthData.trips += 1;
      }
    });

    return last6Months;
  };

  // Calculate vehicle usage distribution
  const getVehicleUsageData = () => {
    const vehicleUsage: Record<string, number> = {};
    
    entries.forEach(entry => {
      const vehicleKey = `${entry.vehicleType} (${entry.vehiclePlateNumber})`;
      vehicleUsage[vehicleKey] = (vehicleUsage[vehicleKey] || 0) + entry.totalMileage;
    });

    return Object.entries(vehicleUsage).map(([vehicle, mileage]) => ({
      vehicle,
      mileage
    }));
  };

  // Calculate fuel efficiency trends
  const getFuelEfficiencyData = () => {
    const last30Days = entries
      .filter(entry => isAfter(entry.dateTime, subMonths(new Date(), 1)))
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());

    return last30Days.map(entry => ({
      date: format(entry.dateTime, 'MMM dd'),
      efficiency: entry.totalMileage, // Simplified - in real app, would calculate actual efficiency
      mileage: entry.totalMileage
    }));
  };

  // Calculate top destinations
  const getTopDestinations = () => {
    const destinations: Record<string, number> = {};
    
    entries.forEach(entry => {
      destinations[entry.tripTo] = (destinations[entry.tripTo] || 0) + 1;
    });

    return Object.entries(destinations)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([destination, count]) => ({ destination, count }));
  };

  const monthlyData = getMonthlyData();
  const vehicleUsageData = getVehicleUsageData();
  const fuelEfficiencyData = getFuelEfficiencyData();
  const topDestinations = getTopDestinations();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading dashboard...</div>
        </CardContent>
      </Card>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Vehicle Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
              <p className="text-gray-600">
                Start adding vehicle entries to see insights and analytics.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Entries</p>
                <p className="text-2xl font-bold">{stats?.totalEntries || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Mileage</p>
                <p className="text-2xl font-bold">{stats?.totalMileage?.toFixed(1) || '0'}</p>
                <p className="text-xs text-gray-500">km/mi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg per Trip</p>
                <p className="text-2xl font-bold">{stats?.averageMileagePerTrip?.toFixed(1) || '0'}</p>
                <p className="text-xs text-gray-500">km/mi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Fuel className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Most Used Vehicle</p>
                <p className="text-sm font-bold">{stats?.mostUsedVehicle || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Mileage Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Monthly Mileage Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="mileage" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ fill: '#8884d8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vehicle Usage Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Vehicle Usage Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vehicleUsageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ vehicle, percent }) => `${vehicle}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="mileage"
                >
                  {vehicleUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Fuel Efficiency */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fuel className="h-5 w-5" />
              Recent Mileage Pattern (Last 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fuelEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="mileage" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Destinations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Top Destinations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDestinations.length > 0 ? (
                topDestinations.map((dest, index) => (
                  <div key={dest.destination} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{index + 1}</Badge>
                      <span className="font-medium">{dest.destination}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {dest.count} trip{dest.count > 1 ? 's' : ''}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No destination data available
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Month</th>
                  <th className="text-right p-2">Total Trips</th>
                  <th className="text-right p-2">Total Mileage</th>
                  <th className="text-right p-2">Avg per Trip</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((month) => (
                  <tr key={month.month} className="border-b">
                    <td className="p-2 font-medium">{month.month}</td>
                    <td className="p-2 text-right">{month.trips}</td>
                    <td className="p-2 text-right">{month.mileage.toFixed(1)} km/mi</td>
                    <td className="p-2 text-right">
                      {month.trips > 0 ? (month.mileage / month.trips).toFixed(1) : '0'} km/mi
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};