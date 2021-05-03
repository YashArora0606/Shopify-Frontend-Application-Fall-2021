import { render, screen } from "@testing-library/react";
import App from "../components/App";
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({adapter: new Adapter()});

// This is a known requirement for using Polaris components
window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: () => {},
            removeListener: () => {},
        };
    };

describe("Test application functionality", () => {
    it("Header renders with desired title", () => {
        const desiredText = "Welcome to the Shoppies!";
        const wrapper = mount(
            <AppProvider i18n={en}>
                <App />
            </AppProvider>
        );
        const title = wrapper.find(".header");
        expect(title.text()).toBe(desiredText);
    });
    // it("Header renders with sfasfsafasg", () => {
    //     const wrapper = mount(
    //         <AppProvider i18n={en}>
    //             <App />
    //         </AppProvider>
    //     );
    //     const search = wrapper.find('.search-bar').first();

    //     // wrapper.update();
    //     const a = wrapper.find('.Polaris-ActionList');
    //     console.log(a.debug())
    // });
});
    


