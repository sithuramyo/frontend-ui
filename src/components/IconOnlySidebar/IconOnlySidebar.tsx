// components/ui/icon-only-sidebar.tsx
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
// import { sidebarItems } from "@/constants/sidebarItems"; // your provided data
import { cn } from "@/lib/utils"; // for conditional classes (optional)
// import { useSidebarState } from "@/providers/SidebarProvider";
import { sidebarItems } from "@/constants/sidebar";

export const IconOnlySidebar = () => {
  // const { isCollapsed } = useSidebarState();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Create a single ref to be attached to the currently open dropdown's container.
  const dropdownRef = useRef<HTMLDivElement>(null);

  // This effect handles clicks outside the dropdown menu.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if a dropdown is open AND the click is outside the dropdown's container.
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };

    // Add the event listener when a dropdown is open.
    if (openDropdownId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener when the component unmounts or dropdown closes.
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]); // Re-run the effect whenever openDropdownId changes.

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-16 h-full flex flex-col justify-center">
      <div className="relative flex flex-col items-center justify-center gap-5 pb-5">
        {/* Background shape */}
        <div className="absolute inset-0 z-0 bg-[#011E57] rounded-tr-[40px] rounded-br-[40px] h-full"></div>

        {/* Icons on top */}
        <div className="z-10 flex flex-col items-center justify-center gap-5 pt-[18px]">
          {sidebarItems.map((item) => (
            <div
              key={item.id}
              className="relative group flex flex-col items-center justify-center"
              // Dynamically attach the ref to the currently open dropdown's container.
              ref={openDropdownId === String(item.id) ? dropdownRef : null}

            >
              <NavLink
                to={item.path || "#"}
                className={({ isActive }) =>
                  cn(
                    "p-2 rounded-md hover:bg-white hover:shadow transition-all duration-200",
                    isActive || openDropdownId === String(item.id) ? "bg-white shadow" : ""
                  )
                }
                onClick={(e) => {
                  if (item.isDropdown) {
                    e.preventDefault();
                    setOpenDropdownId(openDropdownId === String(item.id) ? null : String(item.id));

                  }
                }}
              >
                {({ isActive }) => (
                  <item.icon
                    className={cn(
                      !item.isDropdown && "group-hover:text-black",
                      isActive || openDropdownId === String(item.id) ? "text-black" : "text-white"
                    )}
                  />
                )}
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