import { fetchDataList, type PaginatedResponse } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";

export const usePaginatedQuery = <T>(
    endpoint: string,
    queryKey: string[],
    page: number,
    pageSize: number,
    search: string = "",
    sortBy: string = "",
    sortOrder?: "asc" | "desc",
    filters: Record<string, any> = {}
) => {
    return useQuery<PaginatedResponse<T>>({
        queryKey: [...queryKey, page, pageSize, search, sortBy, sortOrder,filters],
        queryFn: () => fetchDataList<T>(page, pageSize, search, endpoint, sortBy, sortOrder,filters),
        placeholderData: (prev: any) => prev,
    });
};
