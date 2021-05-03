import { render } from "@testing-library/react";
import "./setupTests";
import { ThemeProvider } from "styled-components";
import { availableThemes } from "../resources/themes";
import Container from "../components/shared/Container";

describe("Test Container component", () => {
    it("Container is rendered correctly with children", () => {
        // Setup
        const childText = "Child Text";
        const { getByText } = render(
            <ThemeProvider theme={availableThemes[0]}>
                <Container>
                    <div>{childText}</div>
                </Container>
            </ThemeProvider>
        );

        // Assert
        expect(getByText(childText)).toBeInTheDocument();
    });
});
