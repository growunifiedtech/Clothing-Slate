'use client';

import React, { Suspense } from 'react';
import UserDashboardView from '@/components/user/UserDashboardView';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono text-xs">Loading User Portal...</div>}>
      <UserDashboardView />
    </Suspense>
  );
}
