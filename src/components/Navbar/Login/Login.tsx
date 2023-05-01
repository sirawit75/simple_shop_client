import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { RxCrossCircled } from "react-icons/rx";
import { useAppDispatch } from "../../../hooks/redux";
import { login, setUser } from "../../../redux/slices/user";

type Props = {
  setComponent: React.Dispatch<
    React.SetStateAction<{
      register: boolean;
      login: boolean;
    }>
  >;
  component: {
    register: boolean;
    login: boolean;
  };

  submitDbg?: jest.Mock<any, any>;
};

const Login = ({ setComponent, component, submitDbg }: Props) => {
  const dispatch = useAppDispatch();
  const [toCenter, setToCenter] = useState(false);
  useEffect(() => {
    setToCenter(!toCenter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute">
      <div
        className="fixed h-screen w-full bg-black/20"
        onClick={() => {
          setComponent({ ...component, login: !component.login });
        }}
      ></div>
      <div
        className={
          toCenter
            ? "fixed top-[15%] w-[100%] transition-all duration-500 h-[470px] md:w-[50%] md:left-[25%] bg-white  border-2  rounded-lg shadow-lg"
            : "fixed top-[100%] w-[100%] transition-all duration-500 h-[470px] md:w-[50%] md:left-[25%] bg-white  border-2  rounded-lg shadow-lg"
        }
      >
        <div className="p-4 px-9">
          <div className="flex justify-between">
            <div>
              <h1 className="font-bold text-3xl my-1">Login 📝</h1>
              <p className="font-semibold">Have a good day :D</p>
            </div>
            <div
              onClick={() => {
                setComponent({ ...component, login: !component.login });
              }}
              className="cursor-pointer mt-1"
            >
              <RxCrossCircled className="" size={22} />
            </div>
          </div>
          <Formik
            initialValues={{
              password: "",
              username: "",
            }}
            validate={(values) => {
              const errors: {
                username?: string;
                password?: string;
              } = {};
              if (
                values.username.length &&
                !/^[a-z0-9_]+$/.test(values.username)
              ) {
                errors.username =
                  "username must contain only lowercase letters, digits, or underscore";
              } else if (values.username.length < 3 && values.username.length) {
                errors.username = "username must be at least 3 characters";
              } else if (
                values.username.length > 12 &&
                values.username.length
              ) {
                errors.username = "username must less than 12 characters";
              } else if (values.password.length < 6 && values.password.length) {
                errors.password = "password must be at least 6 characters";
              }
              return errors;
            }}
            onSubmit={async (values, { setErrors }) => {
              if (submitDbg) {
                submitDbg(values);
                return;
              }
              const result = await dispatch(
                login({
                  username: values.username,
                  password: values.password,
                })
              );
              if (result.payload?.response?.data?.message)
                setErrors({ username: result.payload.response.data.message });
              else if (result.payload) {
                dispatch(setUser(result.payload));
                setComponent({ ...component, login: !component.login });
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col mt-8 gap-6"
              >
                <input
                  required
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  placeholder="Username"
                  className="border-b-4  p-1 rounded-sm"
                />
                <input
                  required
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
                  className="border-b-4 p-1 rounded-sm w-full"
                />
                {((errors.username && touched.username) ||
                  (errors.password && touched.password)) && (
                  <div
                    className="text-xs font-semibold text-red-500"
                    data-testid="error-div"
                  >
                    {errors.username && touched.username && (
                      <p data-testid="error-username">*{errors.username}</p>
                    )}
                    {errors.password && touched.password && (
                      <p data-testid="error-password">*{errors.password}</p>
                    )}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={
                    !isSubmitting
                      ? "bg-rose-500 shadow-md hover:bg-rose-600 hover:underline text-zinc-50 font-semibold w-[120px] p-2 mx-auto rounded-md"
                      : "bg-gray-500 shadow-md  text-zinc-50 font-semibold w-[120px] p-2 mx-auto rounded-md cursor-default"
                  }
                >
                  Log in
                </button>
                <div className="text-sm text-center">
                  Don't have an account?{" "}
                  <span
                    className="cursor-pointer underline text-sky-400"
                    onClick={() => {
                      setComponent({
                        login: !component.login,
                        register: !component.register,
                      });
                    }}
                  >
                    Register
                  </span>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
