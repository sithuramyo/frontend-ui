// import { useApiQuery } from "../api/useApiQuery";

// export interface BasicInfo {
//     ageOfFirstDrugUsed: number;
//     typeOfFirstDrugUsed: string;
//     patientNo: string;
// }

// export interface HivTestingHistories {
//     patientNo: string;
//     type: string;
//     sex: string;
//     age: number;
//     testDate: Date;
//     testOne: string;
//     testTwo: string;
//     testThree: string;
//     finalResult: string;
//     postTestCounselling: string;
//     artReferral: string;
//     recordDate: Date;
//     antiRetroviralTherapyHistory?: AntiRetroviralTherapyHistory[];
// }

// export interface AntiRetroviralTherapyHistory {
//     artRegimen: string;
//     treatmentStartDate: Date;
// }

// export interface SubstanceTest {
//     testResult: string;
//     testDate: string;
// }

// export interface Dosage{
//     dosageOne: number,
//     dosageOneMg: number,
//     dosageOneDate: Date,
//     dosageTwo: number,
//     dosageTwoMg: number,
//     dosageTwoDate: Date,
//     dosageThree: number,
//     dosageThreeMg: number,
//     dosageThreeDate: Date
// }
// export interface HepatitisBTest extends SubstanceTest{
//     dosages: Dosage[];
// }

// export interface UrineTestingHistories {
//     morphine: SubstanceTest[];
//     amphetamine: SubstanceTest[];
//     cannabis: SubstanceTest[];
//     diazepam: SubstanceTest[];
//     methadone: SubstanceTest[];
// }


// export const useBasicInfoOptions = (patientId: string) =>
//     useApiQuery<BasicInfo>(
//         {
//             endpoint: `/patientsummary/get-basic-info?patientId=${patientId}`
//         },
//         {
//             enabled: !!patientId,
//             select: (res) => (res),
//             queryKey: ["basicinfo", patientId]
//         }
//     );

// export const useHivTestingHistoriesOptions = (patientNo: string) =>
//     useApiQuery<HivTestingHistories[]>(
//         {
//             endpoint: `/patientsummary/get-hiv-test-histories?patientNo=${patientNo}`
//         },
//         {
//             enabled: !!patientNo,
//             select: (res) => (res),
//             queryKey: ["hivtesthistories", patientNo]
//         }
//     );

// export const useUrineTestingHistoriesOptions = (patientNo: string) =>
//     useApiQuery<UrineTestingHistories>(
//         {
//             endpoint: `/patientsummary/get-urine-test-histories?patientNo=${patientNo}`
//         },
//         {
//             enabled: !!patientNo,
//             select: (res) => (res),
//             queryKey: ["urinetesthistories", patientNo]
//         }
//     )

// export const useHepatitisBTestingHistoriesOptions = (patientNo: string) =>
//     useApiQuery<HepatitisBTest[]>(
//         {
//             endpoint: `/patientsummary/get-b-test-histories?patientNo=${patientNo}`
//         },
//         {
//             enabled: !!patientNo,
//             select: (res) => (res),
//             queryKey: ["btesthistories", patientNo]
//         }
//     )

// export const useHepatitisCTestingHistoriesOptions = (patientNo: string) =>
//     useApiQuery<SubstanceTest[]>(
//         {
//             endpoint: `/patientsummary/get-c-test-histories?patientNo=${patientNo}`
//         },
//         {
//             enabled: !!patientNo,
//             select: (res) => (res),
//             queryKey: ["ctesthistories", patientNo]
//         }
//     )