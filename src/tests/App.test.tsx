import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../components/App";

test("Header renders with title", () => {
    render(<App />);
    const title = screen.getByText("Shoppies!");
    expect(title).toBeInTheDocument;
});
