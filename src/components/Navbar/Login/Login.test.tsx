import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import Wrapper from "../../Wrapper/Wrapper";

describe("typing at login form", () => {
  it("pass", async () => {
    const userInfo = {
      username: "john123",
      password: "Doe123",
    };

    const handleSubmit = jest.fn();
    let ignoreParams: any;
    render(
      <Wrapper>
        <Login
          submitDbg={handleSubmit}
          setComponent={ignoreParams}
          component={ignoreParams}
        />
      </Wrapper>
    );
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Username"), userInfo.username);
    await user.type(screen.getByPlaceholderText("Password"), userInfo.password);

    await user.click(screen.getByRole("button", { name: /log in/i }));

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
        <Login setComponent={ignoreParams} component={ignoreParams} />
      </Wrapper>
    );
    const userInfo = {
      username: "John",
      password: "doe123",
    };

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Username"), userInfo.username);
    await user.type(screen.getByPlaceholderText("Password"), userInfo.password);
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
        <Login setComponent={ignoreParams} component={ignoreParams} />
      </Wrapper>
    );
    const userInfo = {
      username: "john",
      password: "doe",
    };

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Password"), userInfo.password);
    await user.type(screen.getByPlaceholderText("Username"), userInfo.username);

    expect(screen.getByTestId("error-div")).toBeInTheDocument();
    expect(screen.getByTestId("error-password")).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText("Password"), "123");

    expect(screen.queryByTestId("error-div")).toBeNull();
    expect(screen.queryByTestId("error-password")).toBeNull();
  });
});
