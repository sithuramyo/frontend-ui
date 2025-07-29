import { Button } from "@/components/ui/button";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { format, isValid } from "date-fns";
import { useSidebarState } from "@/providers/SidebarProvider";
import EditButton from "@/components/ui/edit-button";

const staticPatients = [
  {
    "id": 1,
    "patientId": "001/000001",
    "oldPatientId": "573",
    "name": "oK oK ahihT ewZ",
    "type": "New Register",
    "phoneNumber": "9772993811",
    "dateOfBirth": "1992-01-01 00:00:00.000000",
    "age": 33,
    "gender": "Male",
    "height": 177.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000001",
    "dateOfRegistration": "2016-03-25 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 2,
    "patientId": "001/000002",
    "oldPatientId": "001/01072",
    "name": "nuT uhT iS",
    "type": "New Register",
    "phoneNumber": "9976533403",
    "dateOfBirth": "1993-09-03 00:00:00.000000",
    "age": 31,
    "gender": "Male",
    "height": 167.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "001000002",
    "dateOfRegistration": "2019-09-03 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 3,
    "patientId": "001/000003",
    "oldPatientId": "620",
    "name": "oO oK oK niM",
    "type": "New Register",
    "phoneNumber": "9253623668",
    "dateOfBirth": "1988-07-07 00:00:00.000000",
    "age": 37,
    "gender": "Male",
    "height": 175.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000003",
    "dateOfRegistration": "2017-05-15 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 4,
    "patientId": "001/000004",
    "oldPatientId": "714",
    "name": "eoS gnuaN eY",
    "type": "New Register",
    "phoneNumber": "9266996478",
    "dateOfBirth": "1990-01-01 00:00:00.000000",
    "age": 35,
    "gender": "Male",
    "height": 0.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000004",
    "dateOfRegistration": "2017-09-25 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 5,
    "patientId": "001/000005",
    "oldPatientId": "520",
    "name": "wayK niaruhT",
    "type": "New Register",
    "phoneNumber": "9420278521",
    "dateOfBirth": "1978-09-03 00:00:00.000000",
    "age": 46,
    "gender": "Male",
    "height": 180.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "001000005",
    "dateOfRegistration": "2019-09-03 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 6,
    "patientId": "001/000006",
    "oldPatientId": "174",
    "name": "niZ wayK",
    "type": "New Register",
    "phoneNumber": "9699381696",
    "dateOfBirth": "1987-01-01 00:00:00.000000",
    "age": 38,
    "gender": "Male",
    "height": 172.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000006",
    "dateOfRegistration": "2016-03-03 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 7,
    "patientId": "001/000007",
    "oldPatientId": "607",
    "name": "gnuA eayP tetH",
    "type": "New Register",
    "phoneNumber": "9899371169",
    "dateOfBirth": "1996-07-30 00:00:00.000000",
    "age": 28,
    "gender": "Male",
    "height": 0.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000007",
    "dateOfRegistration": "2017-04-24 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 8,
    "patientId": "001/000008",
    "oldPatientId": "649",
    "name": "niW nahS eayP",
    "type": "New Register",
    "phoneNumber": "09442595768",
    "dateOfBirth": "2001-01-01 00:00:00.000000",
    "age": 24,
    "gender": "Male",
    "height": 0.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000008",
    "dateOfRegistration": "2017-05-22 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 9,
    "patientId": "001/000009",
    "oldPatientId": "60",
    "name": "gnuA eY gniaN",
    "type": "New Register",
    "phoneNumber": "09883358293",
    "dateOfBirth": "1996-01-01 00:00:00.000000",
    "age": 29,
    "gender": "Male",
    "height": 177.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000009",
    "dateOfRegistration": "2019-10-09 10:20:42.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 10,
    "patientId": "001/000010",
    "oldPatientId": "1025",
    "name": "wayK oyM gnuA",
    "type": "New Register",
    "phoneNumber": "9698041196",
    "dateOfBirth": "1986-06-01 00:00:00.000000",
    "age": 39,
    "gender": "Male",
    "height": 0.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000010",
    "dateOfRegistration": "2018-06-15 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 11,
    "patientId": "001/000011",
    "oldPatientId": "528",
    "name": "yatH aruhT",
    "type": "New Register",
    "phoneNumber": "9763093875",
    "dateOfBirth": "1992-12-04 00:00:00.000000",
    "age": 32,
    "gender": "Male",
    "height": 170.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000011",
    "dateOfRegistration": "2016-03-16 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 12,
    "patientId": "001/000012",
    "oldPatientId": "747",
    "name": "ttaL oK niZ",
    "type": "New Register",
    "phoneNumber": "9674337080",
    "dateOfBirth": "1994-09-02 00:00:00.000000",
    "age": 30,
    "gender": "Male",
    "height": 175.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000012",
    "dateOfRegistration": "2017-02-07 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 13,
    "patientId": "001/000013",
    "oldPatientId": "2000649",
    "name": "oO waZ waZ",
    "type": "New Register",
    "phoneNumber": "9972148848",
    "dateOfBirth": "1979-01-01 00:00:00.000000",
    "age": 46,
    "gender": "Male",
    "height": 182.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000013",
    "dateOfRegistration": "2020-03-10 13:11:14.603000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 15,
    "patientId": "001/000015",
    "oldPatientId": "482",
    "name": "waZ iyN iyN",
    "type": "New Register",
    "phoneNumber": "9783094485",
    "dateOfBirth": "1989-01-01 00:00:00.000000",
    "age": 36,
    "gender": "Male",
    "height": 0.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000015",
    "dateOfRegistration": "2020-03-10 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 16,
    "patientId": "001/000016",
    "oldPatientId": "165",
    "name": "iaW gnialH tihC gnuA",
    "type": "New Register",
    "phoneNumber": "973066435",
    "dateOfBirth": "1973-07-29 00:00:00.000000",
    "age": 52,
    "gender": "Male",
    "height": 182.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000016",
    "dateOfRegistration": "2015-01-01 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 17,
    "patientId": "001/000017",
    "oldPatientId": "91",
    "name": ")2( nuT niM wayK",
    "type": "New Register",
    "phoneNumber": "9250033961",
    "dateOfBirth": "1978-01-01 00:00:00.000000",
    "age": 47,
    "gender": "Male",
    "height": 172.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000017",
    "dateOfRegistration": "2020-01-21 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 18,
    "patientId": "001/000018",
    "oldPatientId": "986",
    "name": "oO oK eY",
    "type": "New Register",
    "phoneNumber": "9783302913",
    "dateOfBirth": "1989-03-22 00:00:00.000000",
    "age": 36,
    "gender": "Male",
    "height": 175.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000018",
    "dateOfRegistration": "2018-02-28 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 19,
    "patientId": "001/000019",
    "oldPatientId": "01/408",
    "name": "wahT oK iyK",
    "type": "New Register",
    "phoneNumber": "9695031912",
    "dateOfBirth": "1984-01-01 00:00:00.000000",
    "age": 41,
    "gender": "Male",
    "height": 180.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000019",
    "dateOfRegistration": "2008-06-01 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 20,
    "patientId": "001/000020",
    "oldPatientId": "137",
    "name": "wayK oB oB",
    "type": "New Register",
    "phoneNumber": "9761072008",
    "dateOfBirth": "1989-05-25 00:00:00.000000",
    "age": 36,
    "gender": "Male",
    "height": 167.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000020",
    "dateOfRegistration": "2013-05-28 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  },
  {
    "id": 21,
    "patientId": "001/000021",
    "oldPatientId": "104",
    "name": "oO niZ tnahT",
    "type": "New Register",
    "phoneNumber": "9404671428",
    "dateOfBirth": "1988-07-30 00:00:00.000000",
    "age": 36,
    "gender": "Male",
    "height": 0.00,
    "nrc": "12/LaThaNa(N)012345",
    "barcode": "1000021",
    "dateOfRegistration": "2015-11-03 00:00:00.000000",
    "transferInDate": "1900-01-01 00:00:00.000000"
  }
];

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

const Patients = () => {
  const { isCollapsed } = useSidebarState();

  const columns: Column<Patient>[] =
    isCollapsed ?
      [
        {
          label: "Actions",
          render: () => {
            const href = '/home/follow-up';
            return (
              <div className="flex items-center gap-2">
                <EditButton href={href} />
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
                onClick={() => {
                  navigator.clipboard.writeText(row.patientId);
                  toast.success("Copied to clipboard!");
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
          label: "Age / DOB",
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
        },
        {
          label: "Registered Date",
          render: (row) => (
            <span className="text-sm">
              {isValid(new Date(row.dateOfRegistration))
                ? format(new Date(row.dateOfRegistration), "MMM d, yyyy")
                : "-"}
            </span>
          )
        },
        {
          label: "Transfer In Date",
          render: (row) => {
            const transferDate = new Date(row.transferInDate);
            const hideFakeDate = transferDate.getFullYear() === 1900;
            return (
              <span className="text-sm">
                {isValid(transferDate) && !hideFakeDate
                  ? format(transferDate, "MMM d, yyyy")
                  : "-"}
              </span>
            );
          }
        }
      ]
      :
      [
        {
          label: "Actions",
          render: () => {
            const href = '/home/follow-up';
            return (
              <div className="flex items-center gap-2">
                <EditButton href={href} />
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
                onClick={() => {
                  navigator.clipboard.writeText(row.patientId);
                  toast.success("Copied to clipboard!");
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
    <DataTable<Patient>
      data={staticPatients}
      columns={columns}
    />
  );
};

export default Patients;
