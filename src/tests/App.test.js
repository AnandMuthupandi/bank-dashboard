// Import necessary dependencies and the component to be tested
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App"; // Adjust the import path as needed

// Describe the test suite
describe("App Component", () => {
  it("renders without crashing", () => {
    // Render the component within a MemoryRouter (or BrowserRouter for production)
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // Add assertions to verify that specific content is rendered
    // For example, if you have a component with a specific text, you can do:
    

    // Example: expect the MainLayout component to be rendered
    expect(getByText("MainLayout")).toBeInTheDocument();
  });
});
