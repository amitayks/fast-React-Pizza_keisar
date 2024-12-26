/* eslint-disable no-undef */
const { addMinutes, formatISO } = require("date-fns");

//------------------------------------//
const getId = function () {
  const id = Math.random().toString(36).substring(2, 8).toUpperCase();
  return { id };
};

//------------------------------------//
const getOrderPrice = function (order) {
  const orderPrice = order.cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const priorityPrice = order.priority ? Math.floor(orderPrice * 0.2) : 0;

  return { orderPrice, priorityPrice };
};

//------------------------------------//
const getEstimatedDelivery = function (order) {
  const totalItems = order.cart.reduce((sum, item) => sum + item.quantity, 0);

  const estimatedDelivery = formatISO(
    addMinutes(new Date(), totalItems * 2 + 30)
  );
  //   const estimatedDelivery = 10;
  return { estimatedDelivery };
};

//------------------------------------//
const updateOrderStatus = (order) => {
  const now = new Date();
  const deliveryDate = new Date(order.estimatedDelivery);
  const timeLeft = deliveryDate - now;

  if (timeLeft <= 0) return "at your table";
  if (timeLeft <= 300000) return "about to delivered"; // 5 minutes
  return "backing";
};

//------------------------------------//
module.exports = {
  getId,
  getOrderPrice,
  getEstimatedDelivery,
  updateOrderStatus,
};

/*
// another way of generating uniqe id //
function generateId() {
    const getRandomLetter = () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const randomNumber = Math.floor(100 + Math.random() * 900);
    const randomLetters =
      getRandomLetter() + getRandomLetter() + getRandomLetter();
    const id = `${getRandomLetter()}${getRandomLetter()}${randomNumber}${randomLetters}`;
    return id;
  } */
