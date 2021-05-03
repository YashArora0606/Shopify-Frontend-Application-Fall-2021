import { render } from "@testing-library/react";
import Button, { ButtonType } from "../components/shared/Button";
import { shallow } from "enzyme";
import "./setupTests";
import { ThemeProvider } from "styled-components";
import { availableThemes } from "../resources/themes";


describe("Test Button component", () => {
    it("Clicking button calls dedicated callback", () => {
        // Setup
        const mockButtonCallback = jest.fn();
        const buttonProps = {
            onClick: mockButtonCallback,
            text: "Test Button",
            type: ButtonType.Primary,
            disabled: false,
        };

        // Act
        const wrapper = shallow(<Button {...buttonProps} />);
        const button = wrapper.find("button");
        button.simulate("click");

        // Assert
        expect(mockButtonCallback).toHaveBeenCalledTimes(1);
    });

    it("Button is only disabled if disabled property is applied", () => {

        const disabledButtonText = "Disabled Button";
        const enabledButtonText = "Enabled Button";

        // Setup
        const disabledButtonProps = {
            onClick: jest.fn(),
            text: disabledButtonText,
            type: ButtonType.Primary,
            disabled: true,
        };
        const enabledButtonProps = {
            onClick: jest.fn(),
            text: enabledButtonText,
            type: ButtonType.Primary,
            disabled: false,
        };

        // Act
        const { getByText } = render(      
            <ThemeProvider theme={availableThemes[0]}> 
                <Button {...disabledButtonProps} />
                <Button {...enabledButtonProps} />
            </ThemeProvider> 
        );

        const disabledButton = getByText(disabledButtonText);
        const enabledButton = getByText(enabledButtonText);

        // Assert
        expect(disabledButton).toBeDisabled();
        expect(enabledButton).not.toBeDisabled();

    });
    it("Button with icon shows icon", () => {

        // Setup
        const iconName = "times"
        const buttonProps = {
            onClick: jest.fn(),
            text: "Test Button",
            type: ButtonType.Primary,
            disabled: false,
            icon: iconName
        };


        // Act
        const { container } = render(      
            <ThemeProvider theme={availableThemes[0]}> 
                <Button {...buttonProps} />
            </ThemeProvider> 
        );
        const icon = container.querySelector(`[data-icon="${iconName}"]`)

        // Assert
        expect(icon).toBeInTheDocument();

    });
    it("Button with icon shows icon", () => {

        // Setup
        const defaultButtonProps = {
            onClick: jest.fn(),
            disabled: false,
        };
        const primaryButtonText = "Primary";
        const secondaryButtonText = "Secondary";
        const blankButtonText = "Blank";

        // Act
        const { getByText } = render(      
            <ThemeProvider theme={availableThemes[0]}> 
                <Button {...{...defaultButtonProps, type: ButtonType.Primary, text: primaryButtonText}} />
                <Button {...{...defaultButtonProps, type: ButtonType.Secondary, text: secondaryButtonText}} />
                <Button {...{...defaultButtonProps, type: ButtonType.Blank, text: blankButtonText}} />
            </ThemeProvider> 
        );

        // Assert
        expect(getByText(primaryButtonText)).toBeInTheDocument();
        expect(getByText(secondaryButtonText)).toBeInTheDocument();
        expect(getByText(blankButtonText)).toBeInTheDocument();
    });
});
