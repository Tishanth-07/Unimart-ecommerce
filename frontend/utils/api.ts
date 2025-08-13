import axios from "axios";
import { Product, Order, Review, Contact } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Products API
export const productsAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    popularity?: string;
  }) => {
    const response = await api.get("/products", { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get("/products/categories");
    return response.data;
  },
};

// Orders API
export const ordersAPI = {
  create: async (orderData: {
    items: { product: string; quantity: number; price: number }[];
    customerDetails: {
      name: string;
      email: string;
      phone: string;
      address: string;
    };
    totalAmount: number;
    paymentMethod: string;
  }) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

// Reviews API
export const reviewsAPI = {
  getByProductId: async (productId: string) => {
    const response = await api.get(`/reviews/product/${productId}`);
    return response.data;
  },

  create: async (reviewData: {
    productId: string;
    customerName: string;
    rating: number;
    comment: string;
    images?: File[];
  }) => {
    const formData = new FormData();
    formData.append("productId", reviewData.productId);
    formData.append("customerName", reviewData.customerName);
    formData.append("rating", reviewData.rating.toString());
    formData.append("comment", reviewData.comment);

    if (reviewData.images) {
      reviewData.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const response = await api.post("/reviews", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

// Contact API
export const contactAPI = {
  create: async (contactData: {
    name: string;
    email: string;
    message: string;
  }) => {
    const response = await api.post("/contact", contactData);
    return response.data;
  },
};

export default api;
