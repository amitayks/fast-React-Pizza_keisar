import { useSelector } from "react-redux";

function UserName() {
  const username = useSelector((state) => state.user.username);

  if (!username) return null;
  return (
    <p className='text-sm font-semibold hidden md:block'>welcome {username}</p>
  );
}

export default UserName;
