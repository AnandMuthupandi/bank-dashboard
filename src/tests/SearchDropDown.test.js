import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchDropDown from "../components/common/SearchDropDown";
import { useApiContext } from "../contexts/apicontext";

// Mock useApiContext
jest.mock("../contexts/apicontext", () => ({
  useApiContext: jest.fn(),
}));

describe("SearchDropDown Component", () => {
  const apiDispatchMock = jest.fn();
  const clientData = [
    { id: "1", firstname: "John" },
    { id: "2", firstname: "Alice" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component", () => {
    useApiContext.mockReturnValue({
      apiState: {
        clients: {
          ID: "123",
          data: clientData,
        },
      },
      apiDispatch: apiDispatchMock,
    });

    const { getByLabelText } = render(<SearchDropDown />);
    const select = getByLabelText("Client First Name");

    expect(select).toBeInTheDocument();
  });

  it("handles client selection and dispatches action", () => {
    useApiContext.mockReturnValue({
      apiState: {
        clients: {
          ID: "123",
          data: clientData,
        },
      },
      apiDispatch: apiDispatchMock,
    });

    const { getByLabelText } = render(<SearchDropDown />);
    const select = getByLabelText("Client First Name");

    expect(select).toBeInTheDocument();

    fireEvent.mouseDown(select);

    const option = screen.getByText("John");

    // Check if the component updates its state
    fireEvent.click(option);
    expect(select).toHaveTextContent("John");

    // Check if the dispatch function is called with the correct action
    expect(apiDispatchMock).toHaveBeenCalledWith({
      type: "SELECTED_CLIENT_NAME",
      data: {
        name: "John",
        id: "1",
      },
    });
  });

  it("handles reset button click", () => {
    useApiContext.mockReturnValue({
      apiState: {
        clients: {
          ID: "123",
          data: clientData,
        },
      },
      apiDispatch: apiDispatchMock,
    });

    const { getByLabelText } = render(<SearchDropDown />);
    const select = getByLabelText("Client First Name");

    fireEvent.mouseDown(select);
    const option = screen.getByText("John");
    fireEvent.click(option);
    const clearIcon = screen.getByTestId("ClearIcon");
    expect(clearIcon).toBeInTheDocument();
  });
  it("data to be empty upon clicking reset", () => {
    const { getByLabelText } = render(<SearchDropDown />);
    const select = getByLabelText("Client First Name");

    fireEvent.mouseDown(select);

    const option = screen.getByText("John");
    fireEvent.click(option);
    
    const clearIcon = screen.getByTestId("ClearIcon");
    fireEvent.click(clearIcon);
    expect(select.value).toBe(undefined);
  });
});
