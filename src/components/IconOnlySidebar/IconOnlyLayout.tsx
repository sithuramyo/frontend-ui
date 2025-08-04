// layouts/IconOnlyLayout.tsx
// import { useSidebarState } from "@/providers/SidebarProvider";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { IconOnlySidebar } from "./IconOnlySidebar";

const IconOnlyLayout = () => {
  // const { isCollapsed } = useSidebarState();

  return (
    <div>
      <Toaster />
      <IconOnlySidebar />
      <main className="transition-all duration-300 px-6  w-full hide-scrollbar overflow-auto ml-16">
        <Outlet />
      </main>
    </div>
  );
};

export default IconOnlyLayout;
