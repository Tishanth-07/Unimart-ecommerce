export interface Product {
  _id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  discount: number;
  discountedPrice: number;
  category: string;
  images: string[];
  stock: number;
  popularity: number;
  averageRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: {
    product: Product;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  product: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface FilterOptions {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  popularity: string[];
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}
