import { AppSidebar } from '@/components/ui/app-sidebar';
import Navbar from '@/components/ui/navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useSidebarState } from '@/providers/SidebarProvider';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

const HomeLayout: React.FC = () => {
  const { isCollapsed, setIsCollapsed } = useSidebarState();
    return (
        <SidebarProvider>
            <Toaster />
            <AppSidebar />
            <div  className={`fixed top-0 ${isCollapsed ? "left-0" : "left-64"} right-0 z-40 h-16 bg-white border-b shadow-sm flex items-center`}>
                <Navbar />
            </div>
            <main
                className={`transition-all duration-300 px-6 pt-22 w-full hide-scrollbar overflow-auto`}
            >
                <Outlet />
            </main>
        </SidebarProvider>
    )
};

export default HomeLayout;
