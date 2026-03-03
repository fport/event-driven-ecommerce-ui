import Link from "next/link";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import type { NotificationRecord } from "@/types";

const TYPE_COLORS: Record<string, string> = {
  "order.created": "bg-blue-100 text-blue-800",
  "order.updated": "bg-purple-100 text-purple-800",
  "order.confirmed": "bg-green-100 text-green-800",
  "order.shipped": "bg-indigo-100 text-indigo-800",
  "order.cancelled": "bg-red-100 text-red-800",
};

interface NotificationItemProps {
  notification: NotificationRecord;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const colorClass = TYPE_COLORS[notification.type] || "bg-gray-100 text-gray-800";

  return (
    <div className="flex items-start justify-between rounded-md border p-4">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={colorClass}>
            {notification.type}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {notification.customerName}
          </span>
        </div>
        <p className="text-sm">{notification.message}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{format(new Date(notification.sentAt), "PPp")}</span>
          <Link
            href={`/orders/${notification.orderId}`}
            className="flex items-center gap-1 text-primary hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            View Order
          </Link>
        </div>
      </div>
    </div>
  );
}
