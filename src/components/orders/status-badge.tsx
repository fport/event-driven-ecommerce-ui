import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_COLORS } from "@/lib/constants";
import type { OrderStatus } from "@/types";

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant="secondary" className={ORDER_STATUS_COLORS[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
