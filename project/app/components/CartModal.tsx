import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { incrementQuantity, decrementQuantity } from "../redux/foodtruckSlice";
import type { CartModalProps } from "../types";

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  const items = useSelector((state: RootState) => state.products.order);
  const dispatch = useDispatch();

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
      <button onClick={onClose}>Close</button>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.name} - {item.price}kr x {item.quantity}
              <button onClick={() => handleIncrement(item.id)}>More</button>
              <button onClick={() => handleDecrement(item.id)}>Remove</button>
            </li>
          ))}
        </ul>

        <div>
          <div>
            <div>
              <h3>Totalt</h3>
              <p>inkl 20% moms</p>
            </div>
            <p>120 SEK</p>
          </div>
          <button>TAKE MY MONEY!</button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
