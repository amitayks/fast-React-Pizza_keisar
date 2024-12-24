import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
import { useEffect, useState } from "react";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  const [withPriority, setWithPriority] = useState(order.priority);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (fetcher.data) {
      setAddress(fetcher.data.address);
    }
  }, [fetcher.data, setAddress]);

  return (
    <div className='px-4 py-6 opacity-60 hover:opacity-100'>
      <fetcher.Form method='PATCH'>
        <p className='mb-8 text-xl font-semibold'>Update Order Info</p>

        <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-34'>Address</label>

          <div className='grow'>
            <input
              className='input w-full'
              defaultValue={""}
              type='text'
              name='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {!order.priority && (
            <Button
              type={withPriority ? "small" : "smallGray"}
              onClick={(e) => {
                e.preventDefault();
                setWithPriority((el) => !el);
              }}
            >
              {withPriority ? "Remove Priority" : "Add Priority"}
            </Button>
          )}
          <input hidden value={withPriority} name='priority'></input>
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
  return { address: "" };
}

export default UpdateOrder;

{
  /* <fetcher.Form
  method='PATCH'
  className='text-center bg-stone-200 p-5 rounded-lg px-4 py-6'
>
  <p className='bg-stone-300 p-2 w-60 items-center mx-auto rounded-lg mb-5'>
    Update Order Info
  </p>

  <div className='mb-12 flex items-center gap-5'>
    <input
      className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
      type='checkbox'
      name='priority'
      id='priority'
      value={withPriority}
      onChange={(e) => setWithPriority(e.target.checked)}
    />
    <label htmlFor='priority' className='font-medium'>
      Want to give your order priority?
    </label>
  </div>

  <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
    <label className='sm:basis-40'>Address</label>
    <div className='grow'>
      <input className='input w-full' type='text' name='address' />
    </div>
  </div>

  <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
    <label className='sm:basis-40'>Phone number</label>
    <div className='grow'>
      <input className='input w-full' type='tel' name='phone' />
    </div>
  </div>

  <Button type='primary'>Submmit Changes</Button>
</fetcher.Form>; */
}
