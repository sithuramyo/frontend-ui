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
  CloudDownload,
  Users,
  Warehouse,
  Pill,
  LineChart,
  Worm,
  CalendarCheck,
  Skull,
  Package,
  Syringe,
  TestTube,
  ArrowDownToLine,
  ArrowUpFromLine,
  Settings,
  DatabaseBackup,
  User,
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
    path: "/facility/dashboard",
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
  },
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
    icon: Users,
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
    icon: Warehouse,
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
    icon: CloudDownload,
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

export const FacilitySidebarItems: SidebarMenuItem[] = [
  {
    id: 1,
    label: "Dashboard",
    path: "/facility/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    label: "Drugs Treatment",
    path: "/facility/drugs-treatment",
    icon: Pill,
  },
  {
    id: 3,
    label: "MMT-ART Cascade",
    path: "/facility/mmt-art-cascade",
    icon: LineChart,
  },
  {
    id: 4,
    label: "B-C Co-Infection",
    path: "/facility/b-c-co-infection",
    icon: Worm,
  },
  {
    id: 5,
    label: "Six Months Retention",
    path: "/facility/six-months-retention",
    icon: CalendarCheck,
  },
  {
    id: 6,
    label: "Expired and Cause of Death",
    path: "/facility/expired-and-cause-of-death",
    icon: Skull,
  },
];

export const operaLongSidebarItems: SidebarMenuItem[] = [
  {
    id: 1,
    label: "Take Home List",
    path: "",
    icon: Package, // Represents a package of medicine for a patient.
  },
  {
    id: 2,
    label: "Treated List",
    path: "",
    icon: Syringe, // A clear and direct icon for medical treatment.
  },
  {
    id: 3,
    label: "Urine Test List",
    path: "",
    icon: TestTube, // A universally recognized icon for a laboratory test.
  },
  {
    id: 4,
    label: "Transfer In List",
    path: "",
    icon: ArrowDownToLine, // Visually indicates data or items being moved into the system.
  },
  {
    id: 5,
    label: "Transfer Out List",
    path: "",
    icon: ArrowUpFromLine, // The opposite of 'Transfer In', showing data or items leaving.
  },
];

export const operaShortSidebarItems: SidebarMenuItem[] = [
  {
    id: 1,
    label: "Dispenser control",
    path: "",
    icon: Settings, // A standard icon for system controls and settings.
  },
  {
    id: 2,
    label: "Data backup",
    path: "",
    icon: DatabaseBackup, // A specific icon for backing up a database.
  },
];

export const entryItems: SidebarMenuItem[] = [
  {
    id: 1,
    label: "Home",
    path: "/operalikeHome/dashboard",
    icon: Home,
  },
  {
    id: 2,
    label: "Client Registration",
    path: "/operalikeHome/registration",
    icon: User,
  },
  {
    id: 2,
    label: "Follow Up",
    path: "/operalikeHome/patient",
    icon: User,
  },
  {
    id: 3,
    label: "Daily Operation",
    path: "/operalikeHome/daily-operation",
    icon: SoapDispenserDroplet,
  },

  {
    id: 4,
    label: "Inventory",
    path: "/operalikeHome/inventory",
    icon: Boxes,
  },
  {
    id: 5,
    label: "Facility Dashboard",
    path: "/facility/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 6,
    label: "Reports",
    path: "/operalikeHome/reports",
    icon: FileText,
  },
  {
    id: 7,
    label: "Backup Database",
    path: "/operalikeHome/backup",
    icon: Database,
  },
  {
    id: 8,
    label: "Individual Export Data",
    path: "/operalikeHome/export",
    icon: UploadCloud,
  },
  {
    id: 9,
    label: "Dispenser Control",
    path: "/operalikeHome/dispense",
    icon: Cog,
  },
];
