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
    path: "/iconOnlyHome",
    icon: Cog,
  }
];
