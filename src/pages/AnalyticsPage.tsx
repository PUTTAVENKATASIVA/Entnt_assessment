import React from 'react';
import { CommunicationChart } from '../components/Analytics/CommunicationChart';
import { OverdueReport } from '../components/Analytics/OverdueReport';
import { ActivityLog } from '../components/Analytics/ActivityLog';

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CommunicationChart />
        <OverdueReport />
      </div>
      <ActivityLog />
    </div>
  );
}