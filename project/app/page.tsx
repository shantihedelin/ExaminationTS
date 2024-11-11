"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import { useEffect } from "react";
import { fetchProductsByType } from "./redux/foodtruckSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const wontons = useSelector((state: RootState) => state.products.wontons);
  const dips = useSelector((state: RootState) => state.products.dips);
  const drinks = useSelector((state: RootState) => state.products.drinks);
  const productStatus = useSelector(
    (state: RootState) => state.products.status
  );

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProductsByType("wonton"));
      dispatch(fetchProductsByType("dip"));
      dispatch(fetchProductsByType("drink"));
    }
  }, [productStatus, dispatch]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2>MENY</h2>
    </div>
  );
}
