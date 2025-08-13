"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { Product, CartItem } from "@/types";
import toast from "react-hot-toast";

interface AppState {
  cart: CartItem[];
  cartCount: number;
  isLoading: boolean;
}

type AppAction =
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: string; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOAD_CART"; payload: CartItem[] };

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.product._id === product._id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += quantity;
        return {
          ...state,
          cart: updatedCart,
          cartCount: updatedCart.reduce(
            (count, item) => count + item.quantity,
            0
          ),
        };
      } else {
        const newCart = [...state.cart, { product, quantity }];
        return {
          ...state,
          cart: newCart,
          cartCount: newCart.reduce((count, item) => count + item.quantity, 0),
        };
      }
    }

    case "REMOVE_FROM_CART": {
      const updatedCart = state.cart.filter(
        (item) => item.product._id !== action.payload
      );
      return {
        ...state,
        cart: updatedCart,
        cartCount: updatedCart.reduce(
          (count, item) => count + item.quantity,
          0
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return appReducer(state, {
          type: "REMOVE_FROM_CART",
          payload: productId,
        });
      }

      const updatedCart = state.cart.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      );
      return {
        ...state,
        cart: updatedCart,
        cartCount: updatedCart.reduce(
          (count, item) => count + item.quantity,
          0
        ),
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
        cartCount: 0,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "LOAD_CART":
      return {
        ...state,
        cart: action.payload,
        cartCount: action.payload.reduce(
          (count, item) => count + item.quantity,
          0
        ),
      };

    default:
      return state;
  }
};

const initialState: AppState = {
  cart: [],
  cartCount: 0,
  isLoading: false,
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("unimart_cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: parsedCart });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("unimart_cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (product: Product, quantity = 1) => {
    if (product.stock < quantity) {
      toast.error("Not enough stock available");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    toast.success("Item removed from cart");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const item = state.cart.find((item) => item.product._id === productId);
    if (item && item.product.stock < quantity) {
      toast.error("Not enough stock available");
      return;
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast.success("Cart cleared");
  };

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => {
      const price = item.product.discountedPrice || item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartItemCount = () => {
    return state.cartCount;
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
