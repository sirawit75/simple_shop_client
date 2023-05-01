import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  deleteCart,
  getCarts,
  Products,
  setCart,
} from "../../redux/slices/product";

type Props = {};

export interface ICart {
  ID: number;
  product_id: number;
  qty: number;
  product: Products;
}

const Cart = (props: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCarts()).then((data) => dispatch(setCart(data.payload.carts)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { cart, total } = useAppSelector((state) => state.product.cart);
  return (
    <div className="absolute top-[13%] md:top-[20%] md:w-[90%] md:left-[5%] w-full">
      <div className="flex p-1 md:flex-row flex-col">
        <div className="flex flex-col md:w-4/6 gap-4 md:border-r-2 md:border-gray-300 md:p-8 p-4">
          <p className="font-semibold text-2xl">Shopping cart</p>
          <div className="flex text-end font-semibold border-t items-center justify-between text-xs md:text-sm border-b py-6 border-t-gray-300 border-b-gray-300">
            <p className="w-[20px]"></p>
            <p className="lg:w-[140px] w-[50px] md:w-[80px] hidden md:block"></p>
            <p className="md:w-[120px] text-center w-[50px]">Product</p>
            <p className="md:w-[120px] text-center w-[50px]">Price</p>
            <p className="md:w-[120px] text-center w-[50px]">Quantity</p>
            <p className="md:w-[120px] text-center w-[50px]">Subtotal</p>
          </div>
          {cart?.map((item) => (
            <div
              key={item.ID}
              className="flex items-center text-center justify-between pb-4  text-xs md:text-sm border-b border-t-gray-300 border-b-gray-300"
            >
              <button
                className="w-[20px] h-[30px] font-bold "
                onClick={() => {
                  // eslint-disable-next-line no-restricted-globals
                  const result = confirm("Confirm delete");
                  if (result) dispatch(deleteCart(item.ID));
                }}
              >
                <RxCross2 size={20} />
              </button>
              <img
                src={item.product.image_url}
                alt="/"
                className="lg:w-[140px] md:w-[80px] w-[50px] h-[50px] lg:h-[200px] object-cover  hidden md:block"
              />
              <p className="md:w-[120px] font-semibold break-words w-[50px]">
                {item.product.name}
              </p>
              <p className="md:w-[120px] text-gray-600 w-[50px] font-sans">
                ฿{item.product.price.toLocaleString("en-US")}
              </p>
              <p className="md:w-[120px] text-gray-600 w-[50px] font-sans">
                {item.qty}
              </p>
              <p className="md:w-[120px] font-semibold w-[50px] font-sans">
                {(item.qty * item.product.price).toLocaleString("en-US")}
              </p>
            </div>
          ))}
        </div>
        <div className="md:w-2/6 flex flex-col  gap-4 p-8">
          <p className="font-semibold text-2xl">Cart totals</p>
          <div className="flex text-end font-semibold border-t items-center justify-between text-sm border-b py-6 border-t-gray-300 border-b-gray-300">
            <p>Total</p>
            <p className="font-sans">฿{total.toLocaleString("en-US")}</p>
          </div>
          <button className="text-sm cursor-default font-semibold rounded-lg  bg-gray-500 text-white p-2">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
