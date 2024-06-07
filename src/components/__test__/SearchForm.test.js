// src/components/__tests__/SearchForm.test.js

import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SearchForm from "../SearchForm";

// Mock the search service
jest.mock("../../services/searchService", () => jest.fn());

describe("SearchForm component", () => {
  test("renders correctly", () => {
    render(<SearchForm />);
    
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("latitude")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("longitude")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  test("updates searchFields state on input change", () => {
    render(<SearchForm />);
    const nameInput = screen.getByPlaceholderText("Name");

    fireEvent.change(nameInput, { target: { value: "New York" } });

    expect(nameInput).toHaveValue("New York");
  });

  test("shows error message for invalid latitude", async () => {
    render(<SearchForm />);
    const latitudeInput = screen.getByPlaceholderText("latitude");

    fireEvent.change(latitudeInput, { target: { value: "invalid" } });
    fireEvent.submit(latitudeInput);

    await waitFor(() => {
      expect(screen.getByText("Please enter a valid latitude between -90 and 90 degrees.")).toBeInTheDocument();
    });
  });

  test("calls search service and sets results on form submission", async () => {
    const setResults = jest.fn();
    render(<SearchForm setResults={setResults} />);
    const latitudeInput = screen.getByPlaceholderText("latitude");
    const longitudeInput = screen.getByPlaceholderText("longitude");
    const searchButton = screen.getByText("Search");

    fireEvent.change(latitudeInput, { target: { value: "40.7128" } });
    fireEvent.change(longitudeInput, { target: { value: "-74.0060" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(setResults).toHaveBeenCalled();
    });
  });
});
