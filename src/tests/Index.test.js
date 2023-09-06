import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { ApiProvider } from "../contexts/apicontext";
import { BrowserRouter } from "react-router-dom";

test("renders App component", () => {
  // Render the component with necessary providers
  render(
    <ApiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApiProvider>
  );

  // You can write assertions based on your component's content
  const linkElement = screen.getByTestId('App');
  expect(linkElement).toBeInTheDocument();
});
