import api from "@/providers/axios";

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export const fetchDataList = async <T>(
  page: number,
  pageSize: number,
  search: string = "",
  endpoint: string,
  sortBy?: string | number,
  sortOrder?: "asc" | "desc",
  filters: Record<string, any> = {}
): Promise<PaginatedResponse<T>> => {
  const res = await api.get(endpoint, {
    params: {
      page, pageSize, search, sortBy, sortOrder, ...Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v != null && v !== "")
      ),
    },
  });
  return res.data.data;
};

