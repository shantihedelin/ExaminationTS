import type { CategoriesContainerProps, Wonton, Dip, Drink } from "../types";
import { addToOrder } from "../redux/foodtruckSlice";
import { useDispatch } from "react-redux";

export default function CategoriesContainer({
  title,
  products,
}: CategoriesContainerProps) {
  const dispatch = useDispatch();

  const handleAddToOrder = (item: Wonton | Dip | Drink) => {
    dispatch(addToOrder(item));
  };

  return (
    <section className="">
      <h3 className="bg-blue-400">{title}</h3>
      <div className="bg-orange-400">
        {products.map((product) => (
          <button
            key={product.id}
            className="bg-pink-400 p-2 m-4 hover:cursor-pointer"
            onClick={() => handleAddToOrder(product)}
          >
            <li className="list-none">
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>{product.price}:-</p>
            </li>
          </button>
        ))}
      </div>
    </section>
  );
}
