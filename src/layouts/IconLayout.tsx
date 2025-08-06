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
      <div className="flex flex-col min-h-screen w-full">
        {/* Header content added here */}
        <div className="flex justify-between items-center w-full pr-12 h-16 bg-white border-b shadow-sm">
          <div className="font-semibold text-lg ml-6 text-[#051463]">DTIS: Drug Treatment Information System</div>
          <div>
            <img src="/logo.png" alt="" className="w-12" />
          </div>
        </div>

        <main
          className={`flex-grow transition-all duration-300 pl-22 pr-6 pt-6 w-full hide-scrollbar overflow-auto`}
        >
          <Outlet />
        </main>

        {/* Footer placed at the bottom */}
        <footer className="w-full bg-gray-100 py-4 text-center text-sm text-gray-600">
          YangonMental Health Hospital (DDTRU)
        </footer>
      </div>
    </SidebarProvider>
  );
};

export default IconLayout;