"use client";

import { useStats } from "@/hooks/use-stats";
import { useOrders } from "@/hooks/use-orders";
import { StatsCards } from "@/components/dashboard/stats-cards";
import {
  StatusPieChart,
  OrdersOverTimeChart,
} from "@/components/dashboard/charts";
import { RecentOrders } from "@/components/dashboard/recent-orders";

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: orders, isLoading: ordersLoading } = useOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your e-commerce operations
        </p>
      </div>

      <StatsCards stats={stats} isLoading={statsLoading} />

      <div className="grid gap-6 lg:grid-cols-2">
        <StatusPieChart stats={stats} isLoading={statsLoading} />
        <OrdersOverTimeChart stats={stats} isLoading={statsLoading} />
      </div>

      <RecentOrders orders={orders} isLoading={ordersLoading} />
    </div>
  );
}
