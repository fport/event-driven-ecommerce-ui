export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderInput {
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
}

export interface UpdateOrderInput {
  customerName?: string;
  customerEmail?: string;
  status?: OrderStatus;
}

export interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
}

export interface NotificationRecord {
  orderId: string;
  customerName: string;
  customerEmail: string;
  type: string;
  message: string;
  sentAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SearchResult {
  total: number;
  hits: Order[];
}

export interface SearchParams {
  q?: string;
  status?: string;
  from?: number;
  size?: number;
}

export interface SearchStats {
  status_counts: {
    buckets: Array<{ key: string; doc_count: number }>;
  };
  total_revenue: {
    value: number;
  };
  avg_order_value: {
    value: number;
  };
  orders_over_time: {
    buckets: Array<{
      key_as_string: string;
      key: number;
      doc_count: number;
    }>;
  };
}
