import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { vehicleService } from '@/lib/vehicleService';
import { useAuth } from '@/contexts/AuthContext';
import { FuelLevel, VehicleEntryInput } from '@/types/vehicle';

const fuelLevels: FuelLevel[] = [
  'Full',
  'Full−',
  'Three Quarter+',
  'Three Quarter',
  'Three Quarter−',
  'Half+',
  'Half',
  'Half−',
  'Quarter+',
  'Quarter',
  'Quarter−',
  'Empty+',
];

const formSchema = z.object({
  dateTime: z.date({
    required_error: 'Date and time is required',
  }),
  driverName: z.string().min(1, 'Driver name is required'),
  tripTo: z.string().min(1, 'Trip destination is required'),
  vehicleType: z.string().min(1, 'Vehicle type is required'),
  vehiclePlateNumber: z.string().min(1, 'Plate number is required'),
  mileageOut: z.number().min(0, 'Mileage out must be a positive number'),
  fuelGaugeBefore: z.enum(fuelLevels as [FuelLevel, ...FuelLevel[]]),
  mileageIn: z.number().min(0, 'Mileage in must be a positive number'),
  fuelGaugeAfter: z.enum(fuelLevels as [FuelLevel, ...FuelLevel[]]),
}).refine((data) => data.mileageIn >= data.mileageOut, {
  message: 'Mileage in must be greater than or equal to mileage out',
  path: ['mileageIn'],
});

type FormData = z.infer<typeof formSchema>;

interface VehicleEntryFormProps {
  onEntrySubmitted?: () => void;
}

export const VehicleEntryForm = ({ onEntrySubmitted }: VehicleEntryFormProps) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalMileage, setTotalMileage] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateTime: new Date(),
    },
  });

  const mileageOut = watch('mileageOut');
  const mileageIn = watch('mileageIn');

  // Auto-calculate total mileage
  useEffect(() => {
    if (mileageOut && mileageIn && mileageIn >= mileageOut) {
      setTotalMileage(mileageIn - mileageOut);
    } else {
      setTotalMileage(0);
    }
  }, [mileageOut, mileageIn]);

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast.error('You must be logged in to submit entries');
      return;
    }

    setIsSubmitting(true);
    try {
      await vehicleService.addEntry(user.uid, data);
      toast.success('Entry successfully submitted');
      reset({
        dateTime: new Date(),
        driverName: '',
        tripTo: '',
        vehicleType: '',
        vehiclePlateNumber: '',
        mileageOut: 0,
        fuelGaugeBefore: undefined,
        mileageIn: 0,
        fuelGaugeAfter: undefined,
      });
      setTotalMileage(0);
      onEntrySubmitted?.();
    } catch (error) {
      console.error('Error submitting entry:', error);
      toast.error('Failed to submit entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Vehicle Mileage & Fuel Entry
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Date and Time */}
          <div className="space-y-2">
            <Label htmlFor="dateTime">Date and Time *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch('dateTime') ? format(watch('dateTime'), 'PPP p') : 'Pick a date and time'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={watch('dateTime')}
                  onSelect={(date) => {
                    if (date) {
                      const currentTime = new Date();
                      date.setHours(currentTime.getHours());
                      date.setMinutes(currentTime.getMinutes());
                      setValue('dateTime', date);
                    }
                  }}
                  initialFocus
                />
                <div className="p-3 border-t">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={watch('dateTime') ? format(watch('dateTime'), 'HH:mm') : ''}
                    onChange={(e) => {
                      const currentDate = watch('dateTime') || new Date();
                      const [hours, minutes] = e.target.value.split(':');
                      const newDate = new Date(currentDate);
                      newDate.setHours(parseInt(hours), parseInt(minutes));
                      setValue('dateTime', newDate);
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
            {errors.dateTime && (
              <p className="text-sm text-red-500">{errors.dateTime.message}</p>
            )}
          </div>

          {/* Driver Name */}
          <div className="space-y-2">
            <Label htmlFor="driverName">Driver Name *</Label>
            <Input
              id="driverName"
              {...register('driverName')}
              placeholder="Enter driver name"
            />
            {errors.driverName && (
              <p className="text-sm text-red-500">{errors.driverName.message}</p>
            )}
          </div>

          {/* Trip To */}
          <div className="space-y-2">
            <Label htmlFor="tripTo">Trip Destination *</Label>
            <Input
              id="tripTo"
              {...register('tripTo')}
              placeholder="e.g., Harare CBD"
            />
            {errors.tripTo && (
              <p className="text-sm text-red-500">{errors.tripTo.message}</p>
            )}
          </div>

          {/* Vehicle Type */}
          <div className="space-y-2">
            <Label htmlFor="vehicleType">Vehicle Type *</Label>
            <Input
              id="vehicleType"
              {...register('vehicleType')}
              placeholder="e.g., Sedan, SUV, Truck"
            />
            {errors.vehicleType && (
              <p className="text-sm text-red-500">{errors.vehicleType.message}</p>
            )}
          </div>

          {/* Vehicle Plate Number */}
          <div className="space-y-2">
            <Label htmlFor="vehiclePlateNumber">Plate Number *</Label>
            <Input
              id="vehiclePlateNumber"
              {...register('vehiclePlateNumber')}
              placeholder="e.g., ABC 1234"
            />
            {errors.vehiclePlateNumber && (
              <p className="text-sm text-red-500">{errors.vehiclePlateNumber.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mileage Out */}
            <div className="space-y-2">
              <Label htmlFor="mileageOut">Mileage Out (km or mi) *</Label>
              <Input
                id="mileageOut"
                type="number"
                step="0.1"
                {...register('mileageOut', { valueAsNumber: true })}
                placeholder="0"
              />
              {errors.mileageOut && (
                <p className="text-sm text-red-500">{errors.mileageOut.message}</p>
              )}
            </div>

            {/* Fuel Gauge - Before Trip */}
            <div className="space-y-2">
              <Label>Fuel In (Before Trip) *</Label>
              <Select onValueChange={(value) => setValue('fuelGaugeBefore', value as FuelLevel)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel level" />
                </SelectTrigger>
                <SelectContent>
                  {fuelLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.fuelGaugeBefore && (
                <p className="text-sm text-red-500">{errors.fuelGaugeBefore.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mileage In */}
            <div className="space-y-2">
              <Label htmlFor="mileageIn">Mileage In (km or mi) *</Label>
              <Input
                id="mileageIn"
                type="number"
                step="0.1"
                {...register('mileageIn', { valueAsNumber: true })}
                placeholder="0"
              />
              {errors.mileageIn && (
                <p className="text-sm text-red-500">{errors.mileageIn.message}</p>
              )}
            </div>

            {/* Fuel In (After Trip) */}
            <div className="space-y-2">
              <Label>Fuel In (After Trip) *</Label>
              <Select onValueChange={(value) => setValue('fuelGaugeAfter', value as FuelLevel)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel level" />
                </SelectTrigger>
                <SelectContent>
                  {fuelLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.fuelGaugeAfter && (
                <p className="text-sm text-red-500">{errors.fuelGaugeAfter.message}</p>
              )}
            </div>
          </div>

          {/* Total Mileage - Auto-calculated */}
          <div className="space-y-2">
            <Label>Total Mileage (km or mi)</Label>
            <div className="p-3 bg-gray-50 rounded-md border">
              <span className="text-lg font-semibold">{totalMileage.toFixed(1)}</span>
              <span className="text-sm text-gray-600 ml-2">
                (Auto-calculated)
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Entry'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};