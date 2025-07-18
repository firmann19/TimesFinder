/// <reference types="vitest" />

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import "@testing-library/jest-dom";
import Home from "./Home";

const openMock = vi.fn();
beforeAll(() => {
  vi.spyOn(window, "open").mockImplementation(openMock);
});

vi.mock("react-infinite-scroll-component", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

vi.mock("../services/useSearchArticles", () => {
  return {
    useSearchArticles: () => {
      return {
        articles: [
          {
            web_url: "https://nytimes.com/test-article",
            headline: { main: "Mock Article Title" },
            byline: { original: "By Jane Doe" },
            pub_date: "2023-01-01T00:00:00Z",
            snippet: "This is a mock snippet.",
          },
        ],
        loading: false,
        error: "",
        search: vi.fn(),
        fetchMore: vi.fn(),
        hasMore: false,
      };
    },
  };
});

describe("Home Page", () => {
  beforeEach(() => {
    openMock.mockClear();
  });

  it("should render search input and allow typing", () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(/cari artikel/i);
    fireEvent.change(input, { target: { value: "climate" } });
    expect(input).toHaveValue("climate");
  });

  it("should display list of articles", async () => {
    render(<Home />);

    screen.debug();

    const title = await screen.findByText(/mock article title/i);
    expect(title).toBeInTheDocument();

    const author = await screen.findByText(/By Jane Doe/i);
    expect(author).toBeInTheDocument();

    const snippet = await screen.findByText(/This is a mock snippet/i);
    expect(snippet).toBeInTheDocument();
  });

  it("should open article in new tab when clicked", async () => {
    render(<Home />);
    const article = await screen.findByText(/mock article title/i);

    fireEvent.click(article);
    expect(openMock).toHaveBeenCalledWith(
      "https://nytimes.com/test-article",
      "_blank"
    );
  });
});
