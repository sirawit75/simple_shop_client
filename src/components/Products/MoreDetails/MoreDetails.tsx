import React, { useEffect, useRef, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { RxCross1, RxCrossCircled } from "react-icons/rx";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  getProduct,
  manageCart,
  Products,
} from "../../../redux/slices/product";

type Props = {
  setToggleMoredetails: React.Dispatch<React.SetStateAction<boolean>>;
};

const MoreDetails = ({ setToggleMoredetails }: Props) => {
  const { username } = useAppSelector((state) => state.user);
  const [item, setItem] = useState<Products | null>(null);
  const [loading, setLoading] = useState(false);
  const { ID } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const [warning, setWarning] = useState<boolean>(false);
  const handleAddToCart = async () => {
    if (!username) setWarning(true);
    else {
      setLoading(true);
      await dispatch(
        manageCart({ product_id: ID!, qty: Number(qty.current?.value) })
      );
      const input = document.getElementById("qty") as HTMLInputElement;
      input.value = "1";
      setLoading(false);
    }
  };
  useEffect(() => {
    dispatch(getProduct(ID!)).then((data) => setItem(data.payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const qty = useRef<HTMLInputElement | null>(null);
  return (
    <div className="absolute  w-full">
      <div
        className="w-full h-screen fixed bg-black/20 z-30"
        onClick={() => setToggleMoredetails(false)}
      ></div>
      <div className="bg-white fixed lg:w-[1050px]  w-full top-[15%] h-[75%] z-40 lg:left-[10%] rounded-md shadow-md pb-10 md:pb-0">
        <div className="flex flex-row-reverse h-full ">
          <div className="px-8 pt-4 flex flex-col gap-6 md:gap-10 overflow-y-scroll md:overflow-auto overflow-x-scroll w-full">
            <div className="flex flex-col gap-5">
              <div className="flex w-full justify-between">
                <p className="font-semibold md:text-4xl text-3xl">
                  {item?.name}
                </p>
                <RxCrossCircled
                  size={23}
                  className="mt-2 md:hidden cursor-pointer"
                  onClick={() => setToggleMoredetails(false)}
                />
              </div>
              <p className="font-sans  font-semibold text-sm pt-1  bg-green-200 text-gray-500 rounded-full w-fit p-2">
                ฿{item?.price.toLocaleString("en-US")}
              </p>
            </div>
            <img
              src={item?.image_url}
              alt="/"
              className="w-full h-[250px] object-cover rounded-tr-md rounded-br-md md:hidden"
            />
            <p className="text-gray-600 md:text-sm text-xs">{item?.details}</p>
            <div className="flex flex-col gap-2">
              <p className="pl-1 underline text-sm md:text-base">Quantity</p>
              <div className="flex items-center justify-between md:block">
                <input
                  type="number"
                  ref={qty}
                  defaultValue={1}
                  id="qty"
                  className="border-2 rounded-md w-[100px] p-1 font-sans "
                />
                <div
                  className={
                    loading
                      ? "md:mt-6  cursor-default  bg-gray-500 w-fit p-1 px-4 text-xs md:text-base  rounded-full text-zinc-50 flex items-center justify-center gap-4"
                      : "md:mt-6 hover:underline hover:bg-rose-600 bg-rose-500 w-fit p-1 px-4 text-xs md:text-base cursor-pointer rounded-full text-zinc-50 flex items-center justify-center gap-4"
                  }
                >
                  <BsCart3 color="white" size={24} />
                  <p onClick={handleAddToCart}>Add to cart</p>
                </div>
              </div>
              <div className="h-[50px]">
                {warning && (
                  <p className="text-sm text-rose-500 font-semibold md:mt-2 mb-4">
                    **please log in
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="h-full w-[950px] hidden md:block">
            <img
              src={item?.image_url}
              alt="/"
              className="w-full h-full object-cover rounded-tr-md rounded-br-md"
            />
            <div className="absolute right-4 top-4 cursor-pointer p-1">
              <RxCross1
                size={22}
                className=""
                onClick={() => setToggleMoredetails(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreDetails;
