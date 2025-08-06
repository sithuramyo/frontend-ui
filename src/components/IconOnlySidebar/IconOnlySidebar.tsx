// components/ui/icon-only-sidebar.tsx
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { iconSidebarItems } from "@/constants/sidebar";
import { ChevronDown } from "lucide-react";

export const IconOnlySidebar = () => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const location = useLocation();

  const handleSidebarMouseLeave = () => {
    // This will close the dropdown automatically when the mouse leaves the sidebar
    setOpenDropdownId(null);
  };

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-18 hover:w-64 transition-all duration-300 h-full flex flex-col justify-center z-50 group"
      onMouseLeave={handleSidebarMouseLeave}
    >
      <div className="relative flex flex-col items-center justify-center gap-1 pt-3 px-4 pb-8">
        <div className="absolute inset-0 z-0 bg-[#011E57] rounded-tr-[40px] rounded-br-[40px] h-full"></div>
        <div className="z-10 flex flex-col w-full items-center justify-center group-hover:items-start gap-5 pt-[18px]">
          {iconSidebarItems.map((item) => (
            <div key={item.id} className="relative flex flex-col w-full group">
              <NavLink
                to={item.isDropdown ? "" : item.path || "#"}
                className={({ isActive }) => {
                  const isItemActive = item.isDropdown
                    ? location.pathname === item.path || item.children?.some(child => location.pathname === child.path)
                    : isActive;

                  return cn(
                    "p-2 rounded-md transition-all duration-200 flex items-center gap-4 w-full",
                    "justify-center group-hover:justify-start",
                    isItemActive || openDropdownId === String(item.id)
                      ? "bg-white shadow text-black"
                      : "text-white hover:bg-white hover:shadow hover:text-black"
                  );
                }}
                onClick={(e) => {
                  if (item.isDropdown) {
                    e.preventDefault();
                    setOpenDropdownId(openDropdownId === String(item.id) ? null : String(item.id));
                  }
                }}
                end={!item.isDropdown}
              >
                <div className="flex items-center gap-4 flex-grow">
                  <item.icon />
                  <span className={cn(
                    "text-sm font-semibold whitespace-nowrap hidden transition-all duration-300",
                    "group-hover:block"
                  )}>
                    {item.label}
                  </span>
                </div>
                {item.isDropdown && (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300 hidden",
                      "group-hover:block",
                      openDropdownId === String(item.id) ? "rotate-180" : ""
                    )}
                  />
                )}
              </NavLink>

              {/* Dropdown Menu */}
              {item.isDropdown && item.children && (
                <div
                  className={cn(
                    "flex flex-col w-full overflow-hidden transition-all duration-300 ease-in-out",
                    "mt-2 gap-2",
                    openDropdownId === String(item.id) ? "max-h-20" : "max-h-0"
                  )}
                >
                  {item.children?.map((child) => (
                    <NavLink
                      key={child.id}
                      to={child.path}
                      className={({ isActive }) => cn(
                        "text-sm rounded whitespace-nowrap flex items-center gap-4 transition-all duration-200 p-2",
                        "text-white hover:bg-gray-100 hover:text-black",
                        "pl-10", // Indent with padding instead of margin
                        isActive && "text-black bg-gray-100"
                      )}
                      onClick={() => setOpenDropdownId(null)}
                      end
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};