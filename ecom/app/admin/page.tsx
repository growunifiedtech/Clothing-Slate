'use client';

import React, { Suspense } from 'react';
import AdminDashboardView from '@/components/admin/AdminDashboardView';

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono text-xs">Loading Admin Console...</div>}>
      <AdminDashboardView />
    </Suspense>
  );
}
