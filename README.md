# Check it out!

Deployed Project Link: https://shopify-frontend-yash-arora.netlify.app/

[Shopify Frontend Fall 2021 Internship Application](https://www.shopify.ca/careers/fall-2021-frontend-developer-internship-1549282c)

[Project details and requirements](https://docs.google.com/document/d/1SdR9rQpocsH5rPTOcxr9noqHRld5NJlylKO9Hf94U8U/edit#heading=h.31w9woubunro)

## What it does

### Basic functionality
- Search OMDB and display movie results (title and year)
- Add movies from search results to a nomination list
- Disable nomination button if movie has already been nominated
- View the list of nominated movies
- Remove movies from the nominations list
- Limit the user at 5 nominations
- Show a banner when the user has reached 5 nominations

### Extras!
#### Themes
- The dropdown menu at the top of the page allows you to change the theme across the entire application.
- This component is powered by the Shopify Polaris [Popover](https://polaris.shopify.com/components/overlays/popover) and [Actionlist](https://polaris.shopify.com/components/actions/action-list) React Components.
#### Saving
- Clicking the save button once you've nominated some movies saves them to the browser's local storage and displays a banner. You can come back and revisit your nominations at any time! 
- Changing the theme of the app will automatically update the local storage, so your theme is always saved!
#### Movie Info
- Clicking on a movie from the search results or nominations list brings up a modal with additional information, including the actor(s), director(s), plot, poster, and rating (shown as stars).
- The Movie Info view is powered by the Shopify Polaris [Modal](https://polaris.shopify.com/components/overlays/modal) React Component.
#### Testing
- All tests are written using Jest/Enzyme, and test the functionality of the application. See **Available Scripts** for more information about testing and coverage!
#### CI/CD
- This app is deployed via [Netlify](https://www.netlify.com/), and runs tests upon pushes to the [Github Repository](https://github.com/YashArora0606/Shopify-Frontend-Application-Fall-2021/) master branch. Builds must pass all tests before being automatically deployed to [production](https://shopify-frontend-yash-arora.netlify.app/).

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run cover`

Launches the test runner and generates an html view of the code coverage.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run pretty`

Cleans up all code using the prettier configurations.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
