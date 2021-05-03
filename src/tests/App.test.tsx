import { render, screen } from "@testing-library/react";
import App from "../components/App";
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: () => {},
        removeListener: () => {}
    };
};

test("Header renders with title", () => {
    render(
        <AppProvider i18n={en}>
            <App />
        </AppProvider>    

    );
    const title = screen.getByText("Shoppies!");
    expect(title).toBeInTheDocument;
});
