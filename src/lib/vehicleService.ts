import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { VehicleEntry, VehicleEntryInput, VehicleStats } from '@/types/vehicle';

const COLLECTION_NAME = 'vehicleEntries';

export const vehicleService = {
  // Add a new vehicle entry
  async addEntry(userId: string, entryData: VehicleEntryInput): Promise<string> {
    const totalMileage = entryData.mileageIn - entryData.mileageOut;
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...entryData,
      userId,
      totalMileage,
      dateTime: Timestamp.fromDate(entryData.dateTime),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return docRef.id;
  },

  // Update an existing entry
  async updateEntry(entryId: string, entryData: Partial<VehicleEntryInput>): Promise<void> {
    const updates: any = {
      ...entryData,
      updatedAt: serverTimestamp(),
    };

    if (entryData.dateTime) {
      updates.dateTime = Timestamp.fromDate(entryData.dateTime);
    }

    if (entryData.mileageIn && entryData.mileageOut) {
      updates.totalMileage = entryData.mileageIn - entryData.mileageOut;
    }

    await updateDoc(doc(db, COLLECTION_NAME, entryId), updates);
  },

  // Delete an entry
  async deleteEntry(entryId: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTION_NAME, entryId));
  },

  // Get entries for a specific user (with real-time updates)
  subscribeToUserEntries(
    userId: string,
    callback: (entries: VehicleEntry[]) => void
  ): () => void {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      orderBy('dateTime', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const entries: VehicleEntry[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          dateTime: data.dateTime.toDate(),
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as VehicleEntry;
      });
      callback(entries);
    });
  },

  // Get statistics for a user
  async getUserStats(userId: string): Promise<VehicleStats> {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId)
    );

    const snapshot = await getDocs(q);
    const entries = snapshot.docs.map((doc) => doc.data() as any);

    if (entries.length === 0) {
      return {
        totalEntries: 0,
        totalMileage: 0,
        averageMileagePerTrip: 0,
        mostUsedVehicle: '',
        fuelEfficiencyTrend: 0,
      };
    }

    const totalMileage = entries.reduce((sum, entry) => sum + entry.totalMileage, 0);
    const averageMileagePerTrip = totalMileage / entries.length;

    // Find most used vehicle
    const vehicleCounts = entries.reduce((acc, entry) => {
      const key = `${entry.vehicleType} (${entry.vehiclePlateNumber})`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostUsedVehicle = Object.keys(vehicleCounts).reduce((a, b) =>
      vehicleCounts[a] > vehicleCounts[b] ? a : b
    );

    // Calculate fuel efficiency trend (simplified)
    const fuelEfficiencyTrend = entries.length > 1 ? 
      (entries[0].totalMileage - entries[entries.length - 1].totalMileage) / entries.length : 0;

    return {
      totalEntries: entries.length,
      totalMileage,
      averageMileagePerTrip,
      mostUsedVehicle,
      fuelEfficiencyTrend,
    };
  },

  // Search entries
  async searchEntries(userId: string, searchTerm: string): Promise<VehicleEntry[]> {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId)
    );

    const snapshot = await getDocs(q);
    const entries = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        dateTime: data.dateTime.toDate(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as VehicleEntry;
    });

    // Client-side filtering (in a real app, you'd want server-side search)
    return entries.filter((entry) =>
      entry.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tripTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.vehiclePlateNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },
};