import { useSelector } from "react-redux";
import CreateUser from "./../featurs/user/CreateUser";
import Button from "./Button";

function Home() {
  const { username } = useSelector((state) => state.user);

  return (
    <div className='text-center my-10 px-4'>
      <h1 className='text-xl font-semibold mb-4 md:text-3xl'>
        The best pizza.
        <br />
        <span className='text-yellow-400'>
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {!username ? (
        <CreateUser />
      ) : (
        <Button to={"/menu"} type={"primary"}>
          continu ordering {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
