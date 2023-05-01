import React from "react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store/store";
import { Provider } from "react-redux";

type Props = { children: React.ReactNode };

const Wrapper = (props: Props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{props.children}</Provider>
    </BrowserRouter>
  );
};

export default Wrapper;
