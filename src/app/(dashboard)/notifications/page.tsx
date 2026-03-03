"use client";

import { useState } from "react";
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { NotificationItem } from "@/components/notifications/notification-item";
import {
  useNotifications,
  useOrderNotifications,
} from "@/hooks/use-notifications";

export default function NotificationsPage() {
  const [orderIdFilter, setOrderIdFilter] = useState("");
  const allNotifications = useNotifications();
  const filteredNotifications = useOrderNotifications(orderIdFilter);

  const isFiltering = orderIdFilter.length > 0;
  const { data, isLoading } = isFiltering
    ? filteredNotifications
    : allNotifications;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">
          Track all order-related notifications
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Filter by Order ID..."
          value={orderIdFilter}
          onChange={(e) => setOrderIdFilter(e.target.value)}
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : !data || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Bell className="mb-4 h-12 w-12" />
          <p>
            {isFiltering
              ? "No notifications found for this order"
              : "No notifications yet"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((notification, i) => (
            <NotificationItem key={i} notification={notification} />
          ))}
        </div>
      )}
    </div>
  );
}
