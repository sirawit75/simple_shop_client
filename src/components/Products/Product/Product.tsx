import React from "react";

import { useAppDispatch } from "../../../hooks/redux";
import { setID } from "../../../redux/slices/product";

type Props = {
  ID: number;
  name: string;
  details: string;
  price: number;
  image_url: string;
  setToggleMoredetails: React.Dispatch<React.SetStateAction<boolean>>;
};

const Product = ({
  ID,
  name,
  details,
  price,
  image_url,
  setToggleMoredetails,
}: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => {
        dispatch(setID(ID));
        setToggleMoredetails(true);
      }}
      className=" flex flex-col gap-1  rounded-lg border-2 border-gray-200 shadow-lg hover:underline cursor-pointer"
    >
      <div className="p-2 flex flex-col gap-3">
        <img
          src={image_url}
          alt="/"
          className="w-full h-[230px] object-cover"
        />
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-3xl">{name}</p>
          <p className="font-sans  font-semibold text-xs pt-1  bg-green-200 text-gray-500 rounded-full w-fit p-1">
            ฿{price?.toLocaleString("en-US")}
          </p>
        </div>
        <p className="text-gray-600 text-xs">{details?.substring(0, 120)}...</p>
      </div>
      <p className="bg-gray-200 text-sky-600 text-xs p-[5px] pl-4 mt-2">
        More details
      </p>
    </div>
  );
};

export default Product;
