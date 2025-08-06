import { useEffect } from "react";
import { SidebarTrigger, useSidebar } from "./sidebar";
import { useSidebarState } from "@/providers/SidebarProvider";

const Navbar = () => {
  const { state } = useSidebar();
  const { isCollapsed, setIsCollapsed } = useSidebarState();

  useEffect(() => {
    setIsCollapsed(state !== "expanded");
  }, [state]);

  return (
    <header className={`fixed top-0 z-40 h-16 border-b bg-white shadow-sm transition-all duration-300 ${isCollapsed ? "left-0" : "left-64"} right-0`}>
      <div className="px-6 h-full flex items-center relative">
        <SidebarTrigger variant="outline" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full pointer-events-none">
          <span className="font-semibold text-lg"></span>
        </div>
        <div className="flex justify-between items-center w-full mr-12">
          <div className="font-semibold text-lg ml-6 text-[#051463]">DTIS: Drug Treatment Information System</div>
          <div>
            <img src="/logo.png" alt="" className="w-12" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
