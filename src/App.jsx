import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./featurs/menu/Menu";
import Cart from "./featurs/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./featurs/order/CreateOrder";
import Order, { loader as orderLoader } from "./featurs/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { action as UpdateOrderAction } from "./featurs/order/UpdateOrder";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        errorElement: <Error />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: UpdateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
