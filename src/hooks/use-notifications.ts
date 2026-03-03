"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { NotificationRecord } from "@/types";

export function useNotifications(limit = 50) {
  return useQuery({
    queryKey: ["notifications", limit],
    queryFn: async () => {
      const res = await api.get<NotificationRecord[]>(
        `/api/notifications?limit=${limit}`
      );
      if (!res.success) throw new Error(res.error);
      return res.data!;
    },
  });
}

export function useOrderNotifications(orderId: string) {
  return useQuery({
    queryKey: ["notifications", "order", orderId],
    queryFn: async () => {
      const res = await api.get<NotificationRecord[]>(
        `/api/notifications/${orderId}`
      );
      if (!res.success) throw new Error(res.error);
      return res.data!;
    },
    enabled: !!orderId,
  });
}
