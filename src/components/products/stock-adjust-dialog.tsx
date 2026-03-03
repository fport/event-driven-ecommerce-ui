"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  stockAdjustSchema,
  type StockAdjustFormValues,
} from "@/lib/validators";
import type { Product } from "@/types";

interface StockAdjustDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (productId: string, stockChange: number) => Promise<void>;
  isSubmitting: boolean;
}

export function StockAdjustDialog({
  product,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: StockAdjustDialogProps) {
  const form = useForm<StockAdjustFormValues>({
    resolver: zodResolver(stockAdjustSchema),
    defaultValues: { stockChange: 0 },
  });

  const handleSubmit = async (values: StockAdjustFormValues) => {
    if (!product) return;
    await onSubmit(product.id, values.stockChange);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust Stock</DialogTitle>
          <DialogDescription>
            {product
              ? `Adjust stock for ${product.name}. Current stock: ${product.stock} units. Use negative numbers to decrease.`
              : ""}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="stockChange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Change</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g. 10 or -5"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Adjust Stock
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
