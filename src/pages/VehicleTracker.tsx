import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { VehicleEntryForm } from '@/components/VehicleEntryForm';
import { VehicleHistory } from '@/components/VehicleHistory';
import { VehicleDashboard } from '@/components/VehicleDashboard';

type CurrentPage = 'entry' | 'dashboard' | 'history';

export const VehicleTracker = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('entry');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'entry':
        return (
          <VehicleEntryForm 
            onEntrySubmitted={() => {
              // Optionally switch to history after successful submission
              // setCurrentPage('history');
            }}
          />
        );
      case 'dashboard':
        return <VehicleDashboard />;
      case 'history':
        return <VehicleHistory />;
      default:
        return <VehicleEntryForm />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      {renderCurrentPage()}
    </Layout>
  );
};