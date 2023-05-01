import React, { useEffect, useRef, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getProducts, setProducts } from "../../redux/slices/product";
import MoreDetails from "./MoreDetails/MoreDetails";
import Product from "./Product/Product";

type Props = {};

const Products = (props: Props) => {
  const [toggleMoredetails, setToggleMoredetails] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts()).then((data) => {
      dispatch(setProducts(data.payload));
    });
  }, [dispatch]);
  const { products: renderProducts, hasMore } = useAppSelector(
    (state) => state.product
  );
  const isHandlingOnBottom = useRef(false);

  const onScroll = async () => {
    if (isHandlingOnBottom.current) {
      return;
    }

    isHandlingOnBottom.current = true;

    // console.log("Scrolled to bottom!");

    if (hasMore) {
      const id = renderProducts[renderProducts.length - 1].ID.toString();
      const data = await dispatch(getProducts(id));
      dispatch(setProducts(data.payload));
    }

    setTimeout(() => {
      isHandlingOnBottom.current = false;
    }, 1000);
  };

  useBottomScrollListener(onScroll, { offset: 100 });
  // useBottomScrollListener(async () => {
  //   const div = window.document.getElementById("bottom");
  //   console.log(div);
  //   if (hasMore && div) {
  //     const id = renderProducts[renderProducts.length - 1].ID.toString();
  //     const data = await dispatch(getProducts(id));
  //     dispatch(setProducts(data.payload));
  //   }
  // });
  return (
    <div className="">
      {toggleMoredetails && (
        <MoreDetails setToggleMoredetails={setToggleMoredetails} />
      )}
      <div className="absolute lg:top-[20%] top-[15%] w-[80%] left-[10%] pb-10 ">
        <div className="grid  md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-6">
          {renderProducts &&
            renderProducts?.map(
              (item: any) =>
                Object.keys(item).length > 0 && (
                  <Product
                    {...item}
                    key={item.ID}
                    setToggleMoredetails={setToggleMoredetails}
                  />
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default Products;
