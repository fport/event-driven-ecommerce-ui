"use client";

import {
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { SearchStats } from "@/types";

interface StatsCardsProps {
  stats: SearchStats | undefined;
  isLoading: boolean;
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalOrders =
    stats?.status_counts?.buckets?.reduce((sum, b) => sum + b.doc_count, 0) ??
    0;
  const totalRevenue = stats?.total_revenue?.value ?? 0;
  const avgOrderValue = stats?.avg_order_value?.value ?? 0;
  const activeOrders =
    stats?.status_counts?.buckets
      ?.filter((b) => !["delivered", "cancelled"].includes(b.key))
      .reduce((sum, b) => sum + b.doc_count, 0) ?? 0;

  const cards = [
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      icon: ShoppingCart,
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
    },
    {
      title: "Avg. Order Value",
      value: `$${avgOrderValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      icon: TrendingUp,
    },
    {
      title: "Active Orders",
      value: activeOrders.toLocaleString(),
      icon: Activity,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
