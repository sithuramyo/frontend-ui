import { FacilitySidebar } from '@/components/ui/facility-sidebar';
import Navbar from '@/components/ui/navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useSidebarState } from '@/providers/SidebarProvider';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

const HomeLayout: React.FC = () => {
  const { isCollapsed } = useSidebarState();
  return (
    <SidebarProvider className=''>
      <Toaster />
      <FacilitySidebar />
      <div className={`fixed top-0 ${isCollapsed ? "left-0" : "left-64"} right-0 z-40 h-16 bg-white border-b shadow-sm flex items-center`}>
        <Navbar />
      </div>

      <div className={`transition-all duration-300  pt-16 flex flex-col min-h-screen w-full`}>
        <main className="flex-grow">
          {/* Page Content */}
          <div className="p-4">
            <Outlet />
          </div>
        </main>

        {/* Footer placed at the bottom */}
        <footer className="w-full bg-gray-100 py-4 text-right pr-12 text-sm text-gray-600 fixed bottom-0 left-0 right-0">
          YangonMental Health Hospital (DDTRU)
        </footer>
      </div>
    </SidebarProvider>
  )
};

export default HomeLayout;