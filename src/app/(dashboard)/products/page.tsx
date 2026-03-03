"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/products/product-card";
import { StockAdjustDialog } from "@/components/products/stock-adjust-dialog";
import { DeleteProductDialog } from "@/components/products/delete-product-dialog";
import { useProducts, useAdjustStock, useDeleteProduct } from "@/hooks/use-products";
import type { Product } from "@/types";

export default function ProductsPage() {
  const { data: products, isLoading } = useProducts();
  const adjustStock = useAdjustStock();
  const deleteProduct = useDeleteProduct();

  const [stockDialogProduct, setStockDialogProduct] =
    useState<Product | null>(null);
  const [deleteDialogProduct, setDeleteDialogProduct] =
    useState<Product | null>(null);

  const handleAdjustStock = async (productId: string, stockChange: number) => {
    try {
      await adjustStock.mutateAsync({ id: productId, stockChange });
      toast.success("Stock adjusted successfully");
      setStockDialogProduct(null);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to adjust stock"
      );
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct.mutateAsync(productId);
      toast.success("Product deleted successfully");
      setDeleteDialogProduct(null);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete product"
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory
          </p>
        </div>
        <Link href="/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Product
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      ) : !products || products.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          No products yet. Create your first product to get started.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdjustStock={setStockDialogProduct}
              onDelete={setDeleteDialogProduct}
            />
          ))}
        </div>
      )}

      <StockAdjustDialog
        product={stockDialogProduct}
        open={!!stockDialogProduct}
        onOpenChange={(open) => !open && setStockDialogProduct(null)}
        onSubmit={handleAdjustStock}
        isSubmitting={adjustStock.isPending}
      />

      <DeleteProductDialog
        product={deleteDialogProduct}
        open={!!deleteDialogProduct}
        onOpenChange={(open) => !open && setDeleteDialogProduct(null)}
        onConfirm={handleDelete}
        isDeleting={deleteProduct.isPending}
      />
    </div>
  );
}
