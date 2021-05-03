import { render } from "@testing-library/react";
import { mount } from "enzyme";
import "./setupTests";
import { ThemeProvider } from "styled-components";
import { availableThemes } from "../resources/themes";
import Label from "../components/shared/Label";
import { ButtonType } from "../components/shared/Button";

describe("Test Label component", () => {
    it("Label renders title, and year", () => {
        // Setup
        const sampleMovie = {
            Title: "Sample Movie",
            Poster: "www.yasharora.com",
            Type: "movie",
            Year: "2021",
            imdbID: "12345",
        };
        const labelProps = {
            onButtonClick: jest.fn(),
            onTextClick: jest.fn(),
            data: sampleMovie,
            icon: "times",
            buttonType: ButtonType.Primary,
            disableButton: false,
        };
        const { getByText } = render(
            <ThemeProvider theme={availableThemes[0]}>
                <Label {...labelProps}></Label>
            </ThemeProvider>
        );

        // Assert
        expect(getByText(sampleMovie.Title)).toBeInTheDocument();
        expect(getByText(sampleMovie.Year)).toBeInTheDocument();
    });
    it("Label button click calls dedicated callback", () => {
        // Setup
        const sampleMovie = {
            Title: "Sample Movie",
            Poster: "www.yasharora.com",
            Type: "movie",
            Year: "2021",
            imdbID: "12345",
        };
        const mockButtonClick = jest.fn();
        const labelProps = {
            onButtonClick: mockButtonClick,
            onTextClick: jest.fn(),
            data: sampleMovie,
            icon: "times",
            buttonType: ButtonType.Primary,
            disableButton: false,
        };
        const wrapper = mount(
            <ThemeProvider theme={availableThemes[0]}>
                <Label {...labelProps}></Label>
            </ThemeProvider>
        );
        const button = wrapper.find("button").at(0);

        // Act
        button.simulate("click");

        // Assert
        expect(mockButtonClick).toHaveBeenCalledTimes(1);
    });
    it("Label text click calls dedicated callback", () => {
        // Setup
        const sampleMovie = {
            Title: "Sample Movie",
            Poster: "www.yasharora.com",
            Type: "movie",
            Year: "2021",
            imdbID: "12345",
        };
        const mockTextClick = jest.fn();
        const labelProps = {
            onButtonClick: jest.fn(),
            onTextClick: mockTextClick,
            data: sampleMovie,
            icon: "times",
            buttonType: ButtonType.Primary,
            disableButton: false,
        };
        const wrapper = mount(
            <ThemeProvider theme={availableThemes[0]}>
                <Label {...labelProps}></Label>
            </ThemeProvider>
        );
        const button = wrapper.find("button").at(1);

        // Act
        button.simulate("click");

        // Assert
        expect(mockTextClick).toHaveBeenCalledTimes(1);
    });
});
