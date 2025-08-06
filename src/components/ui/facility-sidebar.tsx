import { ChevronDown, ChevronRight, ChevronUp, CreditCard, Dot, LogOut, User, User2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useState } from "react";
import { useRef } from "react";
import { useAuthStore } from "@/stores/userStore";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FacilitySidebarItems, sidebarItems } from "@/constants/sidebar";
import { Separator } from "./separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";


export function FacilitySidebar() {
  const [isCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();

  const toggleDropdown = (id: number) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(id);
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { staggerChildren: 0.05, duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    const current = location.pathname;
    return current === path || current.startsWith(path + "/");
  };

  const isDropdownActive = (item: typeof sidebarItems[0]) => {
    if (!item.children) return false;
    return item.children.some(child => isActive(child.path));
  };

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-col items-center justify-center px-3 pt-6 pb-4 mb-5">
            <div className="w-12 h-12 flex items-center justify-center shadow rounded-lg">
              <img
                src="/dtis.png"
                alt="LOGO"
                className="w-10 h-10 object-contain rounded-lg"
              />
            </div>
          </SidebarGroupLabel>
          <Separator className="mb-5" />
          <SidebarGroupContent>
            <SidebarMenu>
              {FacilitySidebarItems.map((item) => (
                <li key={item.id} className="relative">
                  {item.isDropdown ? (
                    <>
                      <SidebarMenuButton
                        className={`flex items-center w-full gap-4 px-3 py-2 rounded transition group ${openDropdown === item.id || isDropdownActive(item)
                            ? "bg-[#051463] text-white"
                            : ""
                          }`}
                        onClick={() => toggleDropdown(item.id)}
                        aria-expanded={openDropdown === item.id}
                      >
                        <item.icon />
                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.2 }}
                              className="flex-1 text-left"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {!isCollapsed &&
                          (openDropdown === item.id ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          ))}
                      </SidebarMenuButton>

                      {/* Expanded dropdown */}
                      {!isCollapsed && openDropdown === item.id && (
                        <AnimatePresence>
                          <motion.ul
                            className="ml-4 pl-2 mt-1 border-l border-gray-300 space-y-1"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={dropdownVariants}
                          >
                            {item.children?.map((child) => (
                              <motion.li key={child.id} variants={itemVariants}>
                                <Link
                                  to={child.path}
                                  className={`flex items-center gap-2 px-3 py-2 rounded transition ${isActive(child.path)
                                    ? "bg-[#051463] text-white"
                                    : ""
                                    }`}
                                >
                                  <Dot />
                                  {child.label}
                                </Link>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </AnimatePresence>
                      )}
                      {/* Collapsed dropdown */}
                      {isCollapsed && openDropdown === item.id && (
                        <AnimatePresence>
                          <motion.div
                            ref={dropdownRef}
                            initial={{ opacity: 0, x: -10, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-full top-1 z-50"
                          >
                            <div className="ml-2 bg-white border border-gray-300 shadow-xl rounded-lg w-56">
                              <ul className="p-2 space-y-1">
                                {item.children?.map((child) => (
                                  <li key={child.id}>
                                    <Link
                                      to={child.path}
                                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all whitespace-nowrap text-sm ${isActive(child.path)
                                        ? "bg-[#051463] text-white"
                                        : ""
                                        }`}
                                    >
                                      <Dot size={18} />
                                      <span>{child.label}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.path || "#"}
                        className={`flex items-center gap-4 px-3 py-2 rounded transition ${isActive(item.path)
                          ? "bg-[#051463] text-white"
                          : ""
                          }`}
                        title={isCollapsed ? item.label : ""}
                      >
                        <item.icon />
                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </li>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator className="mb-3" />
      <SidebarFooter className="w-full">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {user?.profile?.trim() ? (
                    <img
                      src={user.profile}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover shadow-md ring-2 ring-white"
                    />
                  ) : (
                    <User2 className="w-5 h-5 mr-2" />
                  )}
                  {user?.name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                align="center"
                className="min-w-[240px] bg-white shadow-xl rounded-lg border border-gray-200 p-1 text-sm"
              >
                <DropdownMenuItem className="px-3 py-2 flex items-center gap-2 rounded-md transition-colors">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 flex items-center gap-2 rounded-md transition-colors">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="px-3 py-2 flex items-center gap-2 rounded-md text-red-600 transition-colors"
                  onClick={() => {
                    // TODO: Add logout logic
                  }}
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
