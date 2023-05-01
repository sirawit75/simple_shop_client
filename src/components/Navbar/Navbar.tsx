import React, { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import { TbRectangleVertical } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getUsername, logout } from "../../redux/slices/user";
import Signin from "./Login/Login";
import Register from "./Register/Register";

type Props = {};

const Navbar = (props: Props) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);
  useEffect(() => {
    dispatch(getUsername());
  }, [dispatch, location]);
  const [component, setComponent] = useState({
    register: false,
    login: false,
  });
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed h-[70px] bg-rose-500 w-full z-30">
      {component.register && (
        <Register setComponent={setComponent} component={component} />
      )}

      {component.login && (
        <Signin setComponent={setComponent} component={component} />
      )}
      <div className="flex justify-between md:px-12 px-6 text-zinc-100 h-full items-center">
        <a
          href="/"
          className="md:text-[35px] text-[25px] font-semibold hover:underline flex items-center justify-center"
        >
          <p>Sirawit</p>
          <TbRectangleVertical />
        </a>

        {/* small */}
        <div
          className="md:hidden fixed right-[20px] cursor-pointer flex gap-3"
          onClick={() => setOpen(!open)}
        >
          {username && <p className="text-xs pt-[5px]">{username}</p>}
          <IoIosMenu size={26} />
        </div>
        <div
          onClick={() => setOpen(false)}
          className={
            open
              ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70"
              : ""
          }
        ></div>
        <div
          className={
            open
              ? " sm:w-[60%] md:w-[45%] pl-8 pt-[100px] bg-rose-500  h-screen text-zinc-100 fixed   w-[75%] left-0 top-0 ease-in duration-500"
              : "fixed left-[-100%] h-screen top-0 pl-8 pt-[100px] ease-in duration-500"
          }
        >
          <div
            onClick={() => setOpen(!open)}
            className="absolute top-[40px]  right-[40px] cursor-pointer"
          >
            <RxCrossCircled className="" size={30} />
          </div>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-2">
              <p className="text-[50px] font-semibold">Eeieieie</p>
              <hr className="w-[80%] text-center" />
            </div>
            <a href="/" className="cursor-pointer hover:underline w-fit">
              HOME
            </a>
            {!username ? (
              <p
                className="cursor-pointer hover:underline w-fit"
                onClick={() => {
                  setOpen(!open);
                  setComponent({ ...component, login: !component.login });
                }}
              >
                LOG IN
              </p>
            ) : (
              <a
                href="/user/cart"
                className="cursor-pointer hover:underline w-fit"
                onClick={() => {
                  setOpen(!open);
                  // setComponent({ ...component, login: !component.login });
                }}
              >
                Cart
              </a>
            )}
            {!username ? (
              <p
                className="cursor-pointer hover:underline w-fit"
                onClick={() => {
                  setOpen(!open);
                  setComponent({ ...component, register: !component.register });
                }}
              >
                REGISTER
              </p>
            ) : (
              <p
                className="cursor-pointer hover:underline w-fit"
                onClick={() => {
                  setOpen(!open);
                  // setComponent({ ...component, register: !component.register });
                  dispatch(logout());
                }}
              >
                LOG OUT
              </p>
            )}
          </div>
        </div>
        {/* small */}

        {/* medium */}
        <div className="hidden md:flex text-[18px] w-[300px] justify-between gap-1">
          {username && <p className="text-xs pt-[6px] mr-4">{username}</p>}
          <a href="/" className="hover:underline">
            Home
          </a>
          {!username ? (
            <p
              className="hover:underline cursor-pointer"
              onClick={() => {
                setComponent({ ...component, login: !component.login });
              }}
            >
              Log in
            </p>
          ) : (
            <a href="/user/cart" className="hover:underline cursor-pointer">
              Cart
            </a>
          )}
          {!username ? (
            <p
              className="hover:underline cursor-pointer"
              onClick={() => {
                setComponent({ ...component, register: !component.register });
              }}
            >
              Register
            </p>
          ) : (
            <p
              className="hover:underline cursor-pointer"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Log out
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
