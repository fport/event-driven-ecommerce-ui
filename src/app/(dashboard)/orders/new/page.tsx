"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderForm } from "@/components/orders/order-form";
import { useCreateOrder } from "@/hooks/use-orders";
import { useProducts } from "@/hooks/use-products";
import type { CreateOrderFormValues } from "@/lib/validators";

export default function NewOrderPage() {
  const router = useRouter();
  const createOrder = useCreateOrder();
  const { data: products, isLoading: productsLoading } = useProducts();

  const handleSubmit = async (values: CreateOrderFormValues) => {
    try {
      const order = await createOrder.mutateAsync(values);
      toast.success("Order created successfully");
      router.push(`/orders/${order.id}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create order"
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/orders">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create Order</h1>
          <p className="text-muted-foreground">
            Create a new customer order
          </p>
        </div>
      </div>

      {productsLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <OrderForm
          products={products ?? []}
          onSubmit={handleSubmit}
          isSubmitting={createOrder.isPending}
        />
      )}
    </div>
  );
}
