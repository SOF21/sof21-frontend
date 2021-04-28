# StudentOrkesterFestivalen's front end website.
This is the new front-end developed by SOF21 for SOF, written in React.
The page is heavily influenced by [Material Design](https://material.io/design/) with focus on animations to both give clear intentions of the webpage, as well as giving it some visual flair.

## Frameworks
* React
* [Redux](https://redux.js.org) - State management used in conjunction with react to keep track of the state and information in the application
* [Redux Thunk](https://github.com/reduxjs/redux-thunkhttps://github.com/reduxjs/redux-thunk) - Redux middleware to handle asynchronous requests
* [Redux Token Auth](https://github.com/kylecorbelli/redux-token-auth) - Used for handling login with tokens
* [RMWC](https://rmwc.io/) - Material Design React components
* [SASS](https://sass-lang.com/) - More programmer friendly CSS.
* [Pose](https://popmotion.io/pose/) - Fluid and easy to create animations.
* [React-intl](https://www.npmjs.com/package/react-intl) - Language localization. 

## Src file structure
#### Redux/Api
* [/actions](src/actions) contains all Redux actions that are used in the application
* [/reducers](src/reducers) contains all Redux reducers that are used in the application
* [/api](src/api) contains the functions that calls the back-end API.

#### Page components
* [/pages](src/pages) contains the different pageTypes and pagelayouts with their respective page texts
* [/components](src/components) contains all smaller react components that are used within the different pages.
* [/locale](src/locale) contains all text strings for the web-page in English and Swedish.

#### Stylesheets
* [/stylesheets](src/stylesheets) contains all SASS stylesheets

## Payment
The way purchases and payments work in the application is as follows ([more about the API calls](src/api)):
1. A user adds things to [their cart](src/components/shop/ShopPopup.js) from [the store page](src/pages/base_pages/Shop.js).
2. When a user presses the checkout button, the cart is pushed to the backend and they are redirected to the [checkout page](src/pages/base_pages/Checkout.js). 
This page, and the [Card form](src/components/shop/CheckoutForm.js) uses [stripes React components](https://stripe.com/docs/stripe-js/react) to handle payments.
3. When the payment information has been inputted, a request is sent to stripes API, which return a payment token.
4. The token is sent to the backend, which charges the card and adds the purchased items to the users account.

## .env file
In case the file disappears, it should contain:
SASS_PATH=./node_modules
REACT_APP_API_ENDPOINT="http://localhost:3000/api/v1/"
