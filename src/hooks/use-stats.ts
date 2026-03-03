"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { SearchStats } from "@/types";

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await api.get<SearchStats>("/api/search/stats");
      if (!res.success) throw new Error(res.error);
      return res.data!;
    },
  });
}
