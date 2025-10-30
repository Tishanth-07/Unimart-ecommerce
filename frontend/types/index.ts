export interface Product {
  _id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  discount?: number;
  discountedPrice?: number;
  category: string;
  images: string[];
  stock: number;
  popularity: number;
  averageRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  product?: Product; // optional, used if you want to store full product data
}

export interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  totalAmount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface FilterState {
  priceRange: [number, number];
  categories: string[];
  popularity: string[];
}

export interface SortOption {
  label: string;
  value: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

