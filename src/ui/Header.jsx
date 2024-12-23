import { Link } from "react-router-dom";
import SearchOrder from "../featurs/order/SearchOrder";
import UserName from "../featurs/user/UserName";

function Header() {
  return (
    <header className='header'>
      <Link to={"/"} className='tracking-widest'>
        fast react pizza app co.
      </Link>
      <SearchOrder />

      <UserName />
    </header>
  );
}

export default Header;
