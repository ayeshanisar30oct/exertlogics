import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from './DefaultLayout'; // Import your DashboardLayout or other layout components

const DefaultLayout = ({ children }) => {
  // Example of conditional rendering based on route
  const router = useRouter();
  const isDashboard = router.pathname.startsWith('/dashboard');
  
  // Render DashboardLayout for paths starting with /dashboard/
  if (isDashboard) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }
  
//   Render default layout or another layout as needed
  return (
    <div className="default-layout">
      {/* Your default layout content here */}
      {children}
    </div>
  );
};

export default DefaultLayout;
