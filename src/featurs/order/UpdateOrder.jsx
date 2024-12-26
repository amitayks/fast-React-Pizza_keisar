import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
import { useState } from "react";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  const [withPriority, setWithPriority] = useState(order.priority);
  const [address, setAddress] = useState(order.address);
  const [phone, setPhone] = useState(order.phone);

  return (
    <div className='px-4 py-6 opacity-40 hover:opacity-100 duration-300 '>
      <fetcher.Form method='PATCH'>
        <p className='mb-8 text-xl font-semibold'>Update Order Info</p>

        <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='text-center sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              className='input w-full'
              type='text'
              name='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='text-center sm:basis-40'>Phone</label>
          <div className='grow'>
            <input
              className='input w-full'
              type='text'
              name='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className=' mb-5  flex items-center justify-center w-full'>
          <Button
            type={withPriority ? "small" : "smallGray"}
            onClick={(e) => {
              e.preventDefault();
              setWithPriority((el) => !el);
            }}
          >
            {withPriority ? "Remove Priority" : "Add Priority"}
          </Button>

          <input hidden value={withPriority} name='priority'></input>
          <input hidden value={order} name='order'></input>
        </div>

        <span className='grid place-items-center'>
          <Button type='primary'>Submmit Changes</Button>
        </span>
      </fetcher.Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request, params }) {
  const formData = await request.formData();

  const obj = Object.fromEntries(formData);

  const priority = obj.priority === "true" ? true : false;

  const data = {
    priority,
    address: obj.address,
  };
  await updateOrder(params.orderId, data);
  return null;
}

export default UpdateOrder;
