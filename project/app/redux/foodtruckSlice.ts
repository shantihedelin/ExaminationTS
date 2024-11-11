"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { OrderState } from "../types/index";
import type { Wonton, Dip, Drink, Order, ReceiptItem } from "../types/index";

const API_KEY = "yum-tBCC15CdlDcqTJ4b";

export const fetchProductsByType = createAsyncThunk(
  "products/fetchProductsByType",
  async (type: "wonton" | "dip" | "drink") => {
    const urlMap = {
      wonton:
        "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu?type=wonton",
      dip: "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu?type=dip",
      drink:
        "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu?type=drink",
    };

    try {
      const response = await fetch(urlMap[type], {
        method: "GET",
        headers: { "x-zocom": `${API_KEY}` },
      });

      if (!response.ok) {
        throw new Error("response was not ok");
      }

      const data = await response.json();
      console.log(data);
      return { type, data: data.items };
    } catch (error) {
      console.error("There was a problem fetching data:", error);
      throw error;
    }
  }
);

// // Funktion för att läsa beställningar från localStorage
// const loadOrders = () => {
//   try {
//     const storedOrders = localStorage.getItem("ordersHistory");
//     return storedOrders ? JSON.parse(storedOrders) : [];
//   } catch (e) {
//     console.error("Failed to load order from localStorage:", e);
//     return [];
//   }
// };

// // Funktion för att spara beställningar till localStorage
// const saveOrders = (history: History[]) => {
//   try {
//     const storedHistory = JSON.stringify(history);
//     localStorage.setItem("ordersHistory", storedHistory);
//   } catch (e) {
//     console.error("Failed to save order to localStorage:", e);
//   }
// };

const productsSlice = createSlice({
  name: "products",
  initialState: {
    wontons: [] as Wonton[],
    dips: [] as Dip[],
    drinks: [] as Drink[],
    order: [] as ReceiptItem[],
    status: "idle",
    error: null as string | null,
  },
  reducers: {
    addToOrder: (state, action: PayloadAction<Wonton | Dip | Drink>) => {
      const existingItem = state.order.find(
        (item) =>
          item.id === action.payload.id && item.type === action.payload.type
      );
      console.log("Adding to order:", action.payload);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.order.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.order.find((product) => product.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.order.find((product) => product.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity === 0) {
          state.order = state.order.filter(
            (product) => product.id !== action.payload
          );
        }
      }
    },
    removeFromOrder: (state, action: PayloadAction<number>) => {
      state.order = state.order.filter(
        (product) => product.id !== action.payload
      );
    },
    placeOrder: (state) => {
      if (state.order.length > 0) {
        const newOrder: Order = {
          id: String(new Date().getTime()), // unikt ID för ordern
          items: [...state.order],
          orderValue: state.order.reduce(
            (total, item) => total + item.price,
            0
          ),
          eta: 20,
          timestamp: new Date().toISOString(),
          state: OrderState.Done,
        };

        state.order = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByType.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { type, data } = action.payload;
        if (type === "wonton") {
          state.wontons = data;
        } else if (type === "dip") {
          state.dips = data;
        } else if (type === "drink") {
          state.drinks = data;
        }
      })
      .addCase(fetchProductsByType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const {
  addToOrder,
  removeFromOrder,
  placeOrder,
  incrementQuantity,
  decrementQuantity,
} = productsSlice.actions;

export default productsSlice.reducer;
