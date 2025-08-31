// src/app/admin/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pharmacy Admin Dashboard',
  description: 'Admin panel for managing pharmacy inventory',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}