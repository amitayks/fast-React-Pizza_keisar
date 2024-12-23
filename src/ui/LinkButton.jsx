import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();

  const whereTo = to === "-1" ? navigate(to) : to;

  return (
    <Link
      to={whereTo}
      className='text-sm text-blue-500 hover:text-blue-600 hover:underline'
    >
      {children}
    </Link>
  );
}

export default LinkButton;
