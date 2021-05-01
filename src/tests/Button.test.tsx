import React from "react";
import { render, screen } from "@testing-library/react";
import Button, { ButtonType } from "../components/shared/Button";
import { mount, shallow } from "enzyme";
import "./setupTests";

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
});
