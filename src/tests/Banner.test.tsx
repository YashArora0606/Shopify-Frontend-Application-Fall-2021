import { render } from "@testing-library/react";
import "./setupTests";
import { ThemeProvider } from "styled-components";
import { availableThemes } from "../resources/themes";
import Banner from "../components/shared/Banner";

describe("Test Banner component", () => {
    it("Banner renders desired text", () => {
        // Setup
        const bannerText = "Banner Text";
        const { getByText } = render(
            <ThemeProvider theme={availableThemes[0]}>
                <Banner text={bannerText}></Banner>
            </ThemeProvider>
        );

        // Assert
        expect(getByText(bannerText)).toBeInTheDocument();
    });
});
