import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  Trash2, 
  Download, 
  Share2, 
  Search,
  FileText,
  Car,
  Calendar,
  MapPin,
  Fuel
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import { vehicleService } from '@/lib/vehicleService';
import { useAuth } from '@/contexts/AuthContext';
import { VehicleEntry } from '@/types/vehicle';

export const VehicleHistory = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<VehicleEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<VehicleEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = vehicleService.subscribeToUserEntries(user.uid, (newEntries) => {
      setEntries(newEntries);
      setFilteredEntries(newEntries);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = entries.filter((entry) =>
        entry.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.tripTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.vehiclePlateNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEntries(filtered);
    } else {
      setFilteredEntries(entries);
    }
  }, [searchTerm, entries]);

  const handleDelete = async (entryId: string) => {
    try {
      await vehicleService.deleteEntry(entryId);
      toast.success('Entry deleted successfully');
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast.error('Failed to delete entry');
    }
  };

  const handleShare = (entry: VehicleEntry) => {
    const shareText = `Vehicle Trip Details:\n` +
      `Date: ${format(entry.dateTime, 'PPP p')}\n` +
      `Driver: ${entry.driverName}\n` +
      `Destination: ${entry.tripTo}\n` +
      `Vehicle: ${entry.vehicleType} (${entry.vehiclePlateNumber})\n` +
      `Total Mileage: ${entry.totalMileage} km/mi\n` +
      `Fuel: ${entry.fuelGaugeBefore} → ${entry.fuelGaugeAfter}`;

    if (navigator.share) {
      navigator.share({
        title: 'Vehicle Trip Entry',
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Entry details copied to clipboard');
    }
  };

  const generatePDF = (entry: VehicleEntry) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('Vehicle Mileage & Fuel Report', 20, 20);
    
    // Entry details
    doc.setFontSize(12);
    let yPosition = 40;
    
    const addLine = (label: string, value: string) => {
      doc.text(`${label}: ${value}`, 20, yPosition);
      yPosition += 10;
    };
    
    addLine('Date & Time', format(entry.dateTime, 'PPP p'));
    addLine('Driver Name', entry.driverName);
    addLine('Trip Destination', entry.tripTo);
    addLine('Vehicle Type', entry.vehicleType);
    addLine('Plate Number', entry.vehiclePlateNumber);
    addLine('Mileage Out', `${entry.mileageOut} km/mi`);
    addLine('Mileage In', `${entry.mileageIn} km/mi`);
    addLine('Total Mileage', `${entry.totalMileage} km/mi`);
    addLine('Fuel Before Trip', entry.fuelGaugeBefore);
    addLine('Fuel After Trip', entry.fuelGaugeAfter);
    
    // Footer
    yPosition += 20;
    doc.setFontSize(10);
    doc.text(`Generated on ${format(new Date(), 'PPP p')}`, 20, yPosition);
    
    // Save the PDF
    doc.save(`vehicle-entry-${entry.id}.pdf`);
    toast.success('PDF downloaded successfully');
  };

  const downloadAllPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('Vehicle Mileage & Fuel History Report', 20, 20);
    
    doc.setFontSize(12);
    let yPosition = 40;
    
    filteredEntries.forEach((entry, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.text(`Entry ${index + 1}`, 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      doc.text(`Date: ${format(entry.dateTime, 'PPP p')}`, 20, yPosition);
      doc.text(`Driver: ${entry.driverName}`, 120, yPosition);
      yPosition += 6;
      
      doc.text(`Destination: ${entry.tripTo}`, 20, yPosition);
      doc.text(`Vehicle: ${entry.vehicleType}`, 120, yPosition);
      yPosition += 6;
      
      doc.text(`Plate: ${entry.vehiclePlateNumber}`, 20, yPosition);
      doc.text(`Total: ${entry.totalMileage} km/mi`, 120, yPosition);
      yPosition += 6;
      
      doc.text(`Fuel: ${entry.fuelGaugeBefore} → ${entry.fuelGaugeAfter}`, 20, yPosition);
      yPosition += 15;
    });
    
    // Footer
    doc.setFontSize(10);
    doc.text(`Generated on ${format(new Date(), 'PPP p')}`, 20, yPosition + 10);
    
    doc.save('vehicle-history-report.pdf');
    toast.success('Full history PDF downloaded successfully');
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading history...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Vehicle History & Logs
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by driver, destination, vehicle type, or plate number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={downloadAllPDF} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download All PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredEntries.length === 0 ? (
            <div className="text-center py-8">
              <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'No entries match your search' : 'No vehicle entries found'}
              </p>
            </div>
          ) : (
            <>
              {/* Mobile view */}
              <div className="md:hidden space-y-4">
                {filteredEntries.map((entry) => (
                  <Card key={entry.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{entry.driverName}</p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(entry.dateTime, 'PPP p')}
                          </p>
                        </div>
                        <Badge variant="outline">{entry.totalMileage} km/mi</Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          {entry.tripTo}
                        </p>
                        <p className="flex items-center gap-2">
                          <Car className="h-3 w-3" />
                          {entry.vehicleType} ({entry.vehiclePlateNumber})
                        </p>
                        <p className="flex items-center gap-2">
                          <Fuel className="h-3 w-3" />
                          {entry.fuelGaugeBefore} → {entry.fuelGaugeAfter}
                        </p>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShare(entry)}
                          className="flex-1"
                        >
                          <Share2 className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => generatePDF(entry)}
                          className="flex-1"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          PDF
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Entry</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this entry? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(entry.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Desktop view */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Mileage</TableHead>
                      <TableHead>Fuel</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          {format(entry.dateTime, 'MMM dd, yyyy\np')}
                        </TableCell>
                        <TableCell className="font-medium">
                          {entry.driverName}
                        </TableCell>
                        <TableCell>{entry.tripTo}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{entry.vehicleType}</div>
                            <div className="text-sm text-gray-600">{entry.vehiclePlateNumber}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{entry.totalMileage} km/mi</div>
                            <div className="text-sm text-gray-600">
                              {entry.mileageOut} → {entry.mileageIn}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{entry.fuelGaugeBefore}</div>
                            <div className="text-gray-600">→ {entry.fuelGaugeAfter}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleShare(entry)}
                            >
                              <Share2 className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => generatePDF(entry)}
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Entry</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this entry? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(entry.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};