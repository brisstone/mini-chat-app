import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import { store } from "../store/store";
import NavBar from "../components/NavBar";

describe("Navigation Components", () => {
  it("Comments should be Nav bar", () => {
    const name = "Okoli John";

    render(
      <Provider store={store}>
        <NavBar username={name} />
      </Provider>
    );

    const loggedInUser = screen.getByText(/Okoli John/i);
    expect(loggedInUser).toBeInTheDocument();
  });
});
