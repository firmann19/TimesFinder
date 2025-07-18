import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("allows typing and submits the form", () => {
    const mockSearch = vi.fn();
    render(<SearchBar onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText(/cari artikel/i);
    fireEvent.change(input, { target: { value: "climate" } });
    fireEvent.submit(input);

    expect(mockSearch).toHaveBeenCalledWith("climate");
  });

  it("does not submit if input is less than 3 characters", () => {
    const mockSearch = vi.fn();
    render(<SearchBar onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText(/cari artikel/i);
    fireEvent.change(input, { target: { value: "hi" } });
    fireEvent.submit(input);

    expect(mockSearch).not.toHaveBeenCalled();
  });
});
