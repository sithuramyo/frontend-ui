import {
  UsersRound,
  LayoutDashboard,
  Home,
  Boxes,
  FileText,
  UploadCloud,
  Database,
  SoapDispenserDroplet,
  Cog,
  LayoutDashboardIcon,
} from "lucide-react";

export const sidebarItems: SidebarMenuItem[] = [
  {
    id: 1,
    label: "Home",
    path: "/home/dashboard",
    icon: Home,
  },
  {
    id: 2,
    label: "Clients",
    icon: UsersRound,
    isDropdown: true,
    children: [
      {
        id: 1,
        label: "Client Registration",
        path: "/home/registration",
      },
      {
        id: 2,
        label: "Follow Up",
        path: "/home/patient",
      },
    ],
  },
  {
    id: 3,
    label: "Daily Operation",
    path: "/home/daily-operation",
    icon: SoapDispenserDroplet,
  },

  {
    id: 3,
    label: "Inventory",
    path: "/home/inventory",
    icon: Boxes,
  },
  {
    id: 4,
    label: "Facility Dashboard",
    path: "/home/facility-dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 5,
    label: "Reports",
    path: "/home/reports",
    icon: FileText,
  },
  {
    id: 6,
    label: "Backup Database",
    path: "/home/backup",
    icon: Database,
  },
  {
    id: 7,
    label: "Individual Export Data",
    path: "/home/export",
    icon: UploadCloud,
  },
  {
    id: 8,
    label: "Dispenser Control",
    path: "/home/dispense",
    icon: Cog,
  },
  {
    id: 9,
    label: "New Dashboard",
    path: "/iconOnlyHome/dashboard",
    icon: LayoutDashboardIcon,
  }
];

export const iconSidebarItems: SidebarMenuItem[] = [
  {
    id: 1,
    label: "Home",
    path: "/iconOnlyHome/dashboard",
    icon: Home,
  },
  {
    id: 2,
    label: "Clients",
    icon: UsersRound,
    isDropdown: true,
    // Add a parent path for the dropdown
    path: "/iconOnlyHome/clients",
    children: [
      {
        id: 1,
        label: "Client Registration",
        path: "/iconOnlyHome/registration",
      },
      {
        id: 2,
        label: "Follow Up",
        path: "/iconOnlyHome/patient",
      },
    ],
  },
  {
    id: 3,
    label: "Daily Operation",
    path: "/iconOnlyHome/daily-operation",
    icon: SoapDispenserDroplet,
  },
  {
    // Fix the duplicate ID
    id: 4,
    label: "Inventory",
    path: "/iconOnlyHome/inventory",
    icon: Boxes,
  },
  {
    id: 5,
    label: "Facility Dashboard",
    path: "/iconOnlyHome/facility-dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 6,
    label: "Reports",
    path: "/iconOnlyHome/reports",
    icon: FileText,
  },
  {
    id: 7,
    label: "Backup Database",
    path: "/iconOnlyHome/backup",
    icon: Database,
  },
  {
    id: 8,
    label: "Individual Export Data",
    path: "/iconOnlyHome/export",
    icon: UploadCloud,
  },
  {
    id: 9, // Fix the duplicate ID
    label: "Dispenser Control",
    path: "/iconOnlyHome/dispense",
    icon: Cog,
  },
  {
    id: 10, // Fix the duplicate ID
    label: "Back to prev Dashboard",
    path: "/home/dashboard",
    icon: LayoutDashboardIcon,
  },
];