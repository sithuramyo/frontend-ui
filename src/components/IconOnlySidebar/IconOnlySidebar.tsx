// components/ui/icon-only-sidebar.tsx
import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { iconSidebarItems } from "@/constants/sidebar";

export const IconOnlySidebar = () => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };
    if (openDropdownId) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-16 h-full flex flex-col justify-center z-50">
      <div className="relative flex flex-col items-center justify-center gap-5 pb-5">
        <div className="absolute inset-0 z-0 bg-[#011E57] rounded-tr-[40px] rounded-br-[40px] h-full"></div>
        <div className="z-10 flex flex-col items-center justify-center gap-5 pt-[18px]">
          {iconSidebarItems.map((item) => (
            <div
              key={item.id}
              className="relative group flex flex-col items-center justify-center"
              ref={openDropdownId === String(item.id) ? dropdownRef : null}
            >
              <NavLink
                to={item.path || "/"}
                className={({ isActive }) => {
                  const isItemActive = item.isDropdown
                    ? location.pathname === item.path || item.children?.some(child => location.pathname === child.path)
                    : isActive;

                  return cn(
                    "p-2 rounded-md hover:bg-white hover:shadow transition-all duration-200",
                    isItemActive || openDropdownId === String(item.id) ? "bg-white shadow" : ""
                  );
                }}
                onClick={(e) => {
                  if (item.isDropdown) {
                    e.preventDefault();
                    setOpenDropdownId(openDropdownId === String(item.id) ? null : String(item.id));
                  } else {
                    setOpenDropdownId(null);
                  }
                }}
                end={!item.isDropdown}
              >
                {({ isActive }) => {
                  const isItemActive = item.isDropdown
                    ? location.pathname === item.path || item.children?.some(child => location.pathname === child.path)
                    : isActive;

                  return (
                    <item.icon
                      className={cn(
                        // --- FIX IS HERE: Apply hover color change to all items
                        "group-hover:text-black",
                        isItemActive || openDropdownId === String(item.id) ? "text-black" : "text-white"
                      )}
                    />
                  );
                }}
              </NavLink>

              {/* Regular Tooltip */}
              {!item.isDropdown && (
                <span className="absolute left-14 top-2 hidden group-hover:inline-block whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  {item.label}
                </span>
              )}

              {/* Dropdown Flyout */}
              {item.isDropdown && item.children && openDropdownId === String(item.id) && (
                <div className="absolute left-16 top-0 flex flex-col bg-white shadow-lg rounded p-2 z-20">
                  {item.children?.map((child) => (
                    <NavLink
                      key={child.id}
                      to={child.path}
                      className="text-sm text-black px-4 py-2 hover:bg-gray-100 rounded whitespace-nowrap"
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