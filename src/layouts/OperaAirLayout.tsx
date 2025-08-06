import OperaAirSidebar from '@/components/ui/opera-air-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

const OperaAirLayout: React.FC = () => {
  return (
    <SidebarProvider className='bg-gradient-to-br from-[#f0f4f8] to-[#d9e2ec] px-12 pl-24 

'>
      <Toaster />
      <OperaAirSidebar />
      <div className='fixed top-0 w-full left-0 right-0 flex items-center justify-between bg-white border-b shadow-sm z-40 h-16 px-12'>
        <div>
          DTIS: Drug Treatment Information System
        </div>
        <div>
          <img src="/logo.png" alt="" className='w-12' />
        </div>
      </div>
        
      <div className={`transition-all duration-300  pt-16 flex flex-col min-h-screen w-full pb-12`}>
        <main className="flex-grow">
          {/* Page Content */}
          <div className="p-4">
            <Outlet />
          </div>
        </main>

        {/* Footer placed at the bottom */}
        <footer className="w-full  bg-gray-100 py-4 text-right pr-12 text-sm text-gray-600 fixed bottom-0 left-0 right-0">
          YangonMental Health Hospital (DDTRU)
        </footer>
      </div>
    </SidebarProvider>
  )
};

export default OperaAirLayout;