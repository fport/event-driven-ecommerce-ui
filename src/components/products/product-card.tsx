"use client";

import { Package, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onAdjustStock: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function getStockBadge(stock: number) {
  if (stock === 0) return <Badge variant="destructive">Out of Stock</Badge>;
  if (stock <= 10)
    return (
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
        Low Stock
      </Badge>
    );
  return (
    <Badge variant="secondary" className="bg-green-100 text-green-800">
      In Stock
    </Badge>
  );
}

export function ProductCard({
  product,
  onAdjustStock,
  onDelete,
}: ProductCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
            <Package className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <CardTitle className="text-base">{product.name}</CardTitle>
            <p className="font-mono text-xs text-muted-foreground">
              {product.id}
            </p>
          </div>
        </div>
        {getStockBadge(product.stock)}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">
              Stock: {product.stock} units
            </p>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onAdjustStock(product)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(product)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
