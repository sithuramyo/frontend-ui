import { useApiQuery } from "../api/useApiQuery";

interface AuthCentre {
    code: string;
    name: string;
}

interface StateRegion {
    id: number;
    name: string;
}

interface Township extends StateRegion { }
export interface NrcPrefix {
    nameMm: string;
    nameEn: string;
}

export const useAuthCentre = () =>
    useApiQuery<AuthCentre>(
        {
            endpoint: '/auth/centre'
        },
        {
            select: (res) => (res),
            queryKey: ["AUTHCENTRE"]
        }
    )


export const useStateOptions = () =>
    useApiQuery<StateRegion[]>(
        {
            endpoint: '/common/regions'
        },
        {
            select: (res) => (res),
            queryKey: ["STATES"]
        }
    );

export const useTownshipOptions = (stateId: number) =>
    useApiQuery<Township[]>(
        {
            endpoint: `/common/townships?stateId=${stateId}`
        },
        {
            enabled: !!stateId,
            select: (res) => (res),
            queryKey: ["TOWNSHIPS", stateId]
        }
    );

export const useNrcPrefixOptions = (stateId: number) =>
    useApiQuery<NrcPrefix[]>(
        {
            endpoint: `/common/nrc-prefix?stateId=${stateId}`
        },
        {
            enabled: !!stateId,
            select: (res) => (res),
            queryKey: ["NRCPREFIXS", stateId]
        }
    );