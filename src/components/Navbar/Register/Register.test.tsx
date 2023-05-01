import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "./Register";
import Wrapper from "../../Wrapper/Wrapper";

describe("Typing at register form", () => {
  it("pass", async () => {
    const userInfo = {
      email: "john@email.com",
      username: "john",
      password: "doe123",
      confirmPassword: "doe123",
    };

    const handleSubmit = jest.fn();
    let ignoreParams: any;
    render(
      <Wrapper>
        <Register
          submitDbg={handleSubmit}
          setComponent={ignoreParams}
          component={ignoreParams}
        />
      </Wrapper>
    );
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Email"), userInfo.email);
    await user.type(screen.getByPlaceholderText("Username"), userInfo.username);
    await user.type(screen.getByPlaceholderText("Password"), userInfo.password);
    await user.type(
      screen.getByPlaceholderText("Confirm Password"),
      userInfo.confirmPassword
    );
    expect(screen.queryByTestId("error-div")).toBeNull();
    await user.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        ...userInfo,
      })
    );
  });
  it("failed(username)", async () => {
    let ignoreParams: any;
    render(
      <Wrapper>
        <Register setComponent={ignoreParams} component={ignoreParams} />
      </Wrapper>
    );
    const userInfo = {
      email: "john@email.com",
      username: "John",
      password: "doe123",
      confirmPassword: "doe123",
    };

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Email"), userInfo.email);
    await user.type(screen.getByPlaceholderText("Username"), userInfo.username);
    await user.type(screen.getByPlaceholderText("Password"), userInfo.password);
    await user.type(
      screen.getByPlaceholderText("Confirm Password"),
      userInfo.confirmPassword
    );
    expect(screen.getByTestId("error-div")).toBeInTheDocument();
    expect(screen.getByTestId("error-username")).toBeInTheDocument();
    await user.type(
      screen.getByPlaceholderText("Username"),
      "{backspace}{backspace}{backspace}{backspace}john"
    );
    expect(screen.queryByTestId("error-div")).toBeNull();
    expect(screen.queryByTestId("error-username")).toBeNull();
  });

  it("failed(password)", async () => {
    let ignoreParams: any;
    render(
      <Wrapper>
        <Register setComponent={ignoreParams} component={ignoreParams} />
      </Wrapper>
    );
    const userInfo = {
      email: "john@email.com",
      username: "john",
      password: "doe123",
      confirmPassword: "doe",
    };

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Email"), userInfo.email);
    await user.type(screen.getByPlaceholderText("Username"), userInfo.username);
    await user.type(screen.getByPlaceholderText("Password"), userInfo.password);
    await user.type(
      screen.getByPlaceholderText("Confirm Password"),
      userInfo.confirmPassword
    );
    expect(screen.getByTestId("error-div")).toBeInTheDocument();
    expect(screen.getByTestId("error-password")).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText("Confirm Password"), "123");

    expect(screen.queryByTestId("error-div")).toBeNull();
    expect(screen.queryByTestId("error-password")).toBeNull();
  });
});
