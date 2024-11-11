"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import { useEffect, useState } from "react";
import { fetchProductsByType } from "./redux/foodtruckSlice";
import CategoriesContainer from "./components/Categories-container";
import CartModal from "./components/CartModal";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const wontons = useSelector((state: RootState) => state.products.wontons);
  const dips = useSelector((state: RootState) => state.products.dips);
  const drinks = useSelector((state: RootState) => state.products.drinks);
  const productStatus = useSelector(
    (state: RootState) => state.products.status
  );
  const [isCartOpen, setisCartOpen] = useState<Boolean>(false);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProductsByType("wonton"));
      dispatch(fetchProductsByType("dip"));
      dispatch(fetchProductsByType("drink"));
    }
  }, [productStatus, dispatch]);

  const handleToggleCart = (): void => {
    console.log("clicked on cart");
    setisCartOpen(!isCartOpen);
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <h2 className="text-[#F4F3F1F0] drop-shadow-2xl">MENY</h2>
        <button onClick={handleToggleCart}>
          <h2>Cart</h2>
        </button>
      </div>
      <CategoriesContainer title="" products={wontons} />
      <CategoriesContainer title="Dipsås" products={dips} />
      <CategoriesContainer title="Dricka" products={drinks} />
      {isCartOpen && <CartModal onClose={handleToggleCart} />}
    </div>
  );
}
