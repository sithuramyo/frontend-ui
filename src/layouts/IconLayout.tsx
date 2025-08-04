import { IconOnlySidebar } from '@/components/IconOnlySidebar/IconOnlySidebar';

import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';


const IconLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <Toaster />
      <IconOnlySidebar />
      <main
        className={`transition-all duration-300 pl-22 pr-6 pt-6  w-full hide-scrollbar overflow-auto`}
      >
        <Outlet />
      </main>
    </SidebarProvider>
  )
};

export default IconLayout;
