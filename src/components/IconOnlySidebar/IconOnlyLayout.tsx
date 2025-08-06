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
      <footer className="w-full bg-gray-100 py-4 text-right pr-12 text-sm text-gray-600 fixed bottom-0 left-0 right-0">
        YangonMental Health Hospital (DDTRU)
      </footer>
    </div>
  );
};

export default IconOnlyLayout;
