import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalcartQUantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalQuantity = useSelector(getTotalcartQUantity);
  const totalPrice = useSelector(getTotalCartPrice);
  const { username } = useSelector((state) => state.user);

  if (!totalQuantity || !username) return null;

  return (
    <div className='bg-stone-800 text-stone-200 uppercase px-4 py-4 sm:px-6 text-sm md:text-base flex items-center justify-between'>
      <p className='font-semibold text-stone-300 space-x-4 sm:space-x-6'>
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to={"cart"}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
