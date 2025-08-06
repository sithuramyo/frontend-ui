// src/components/dashboard/AbsentMoreThan5DaysTable.tsx
import React from 'react';
import { Copy, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { format, isValid } from 'date-fns';
// import { useNavigate } from 'react-router-dom';
import { useSidebarState } from '@/providers/SidebarProvider';
// import EditButton from '@/components/ui/edit-button';
import type { Column } from '@/components/ui/data-table';
import UserTable from '@/pages/Home/Dashboard/UserTable';

interface Patient {
  id: number;
  patientId: string;
  name: string;
  phoneNumber: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  nrc: string;
  dateOfRegistration: string;
  transferInDate: string;
}

const staticAbsentUsers: Patient[] = [
  {
    "id": 301,
    "patientId": "004/000001",
    "name": "Henry Wilson",
    "phoneNumber": "9253623668",
    "dateOfBirth": "1988-07-07 00:00:00.000000",
    "age": 37,
    "gender": "Male",
    "nrc": "12/LaThaNa(N)012345",
    "dateOfRegistration": "2017-05-15 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 302,
    "patientId": "004/000002",
    "name": "Jessica Taylor",
    "phoneNumber": "9763093875",
    "dateOfBirth": "1992-12-04 00:00:00.000000",
    "age": 32,
    "gender": "Female",
    "nrc": "12/LaThaNa(N)012345",
    "dateOfRegistration": "2016-03-16 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 303,
    "patientId": "004/000003",
    "name": "Mark Evans",
    "phoneNumber": "9420278521",
    "dateOfBirth": "1978-09-03 00:00:00.000000",
    "age": 46,
    "gender": "Male",
    "nrc": "12/LaThaNa(N)012345",
    "dateOfRegistration": "2019-09-03 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
];

const AbsentMoreThan5DaysTable: React.FC = () => {
  const { isCollapsed } = useSidebarState();
  // const navigate = useNavigate();

  // const handleRowClick = (row: Patient) => {
  //   navigate(`follow-up?id=${row.id}`);
  // };

  const columns: Column<Patient>[] = isCollapsed
    ? [
      {
        label: "Actions",
        render: () => {
          return (
            // EditButton is replaced with a non-interactive element
            <div className="flex items-center gap-2 text-muted-foreground">
              Edit
            </div>
          );
        },
      },
      {
        label: "Patient Code",
        render: (row) => <span className="text-sm font-semibold text-primary">{row.patientId}</span>
      },
      {
        label: "Name",
        render: (row) => <span className="text-sm font-medium capitalize">{row.name}</span>
      },
    ]
    : [
      {
        label: "Actions",
        render: () => {
          return (
            // EditButton is replaced with a non-interactive element
            <div className="flex items-center gap-2 text-muted-foreground">
              <Settings className='size-4' />
            </div>
          );
        },
      },
      {
        label: "Patient Code",
        render: (row) => (
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            {row.patientId}
            <Button
              variant="ghost"
              size="icon"
              disabled={true} // Button is now disabled
              onClick={(e) => {
                e.stopPropagation();
                // onClick handler is effectively disabled
                navigator.clipboard.writeText(row.patientId);
                toast.success("Copied!");
              }}
            >
              <Copy className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        )
      },
      {
        label: "Name",
        render: (row) => <span className="text-sm font-medium capitalize">{row.name}</span>
      },
      {
        label: "Phone",
        render: (row) => <span className="text-sm">{row.phoneNumber || "-"}</span>
      },
      {
        label: "NRC",
        render: (row) => <span className="text-sm">{row.nrc || "-"}</span>
      },
      {
        label: "DOB / Age",
        render: (row) => (
          <div className="text-sm">
            <div
              className={`font-medium ${row.age > 60
                ? "text-red-600"
                : row.age >= 18
                  ? "text-blue-600"
                  : "text-gray-500"
                }`}
            >
              {row.age} yrs
            </div>
            <div className="text-xs text-muted-foreground">
              {isValid(new Date(row.dateOfBirth))
                ? format(new Date(row.dateOfBirth), "MMM d, yyyy")
                : "-"}
            </div>
          </div>
        )
      },
      {
        label: "Gender",
        render: (row) => <span className="capitalize text-sm">{row.gender}</span>
      }
    ];

  return (
    <UserTable<Patient>
      cardTitle="Absent more than 5 Days"
      data={staticAbsentUsers}
      columns={columns}
      onRowClick={undefined} // Disables the row click behavior
    />
  );
};

export default AbsentMoreThan5DaysTable;