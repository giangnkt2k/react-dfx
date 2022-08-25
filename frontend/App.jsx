import React from "react"
import { useEffect } from "react"
/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core"
import { defaultProviders } from "@connect2ic/core/providers"
import "@connect2ic/core/style.css"
import { Connect2ICProvider } from "@connect2ic/react"
/*
 * Import canister definitions like this:
 */
import * as dip20 from "../.dfx/local/canisters/dip20";
import * as dip721 from "../.dfx/local/canisters/dip721";
import * as marketplace_auction from "../.dfx/local/canisters/marketplace_auction";
// import * as stake from "../.dfx/local/canisters/stake";
// react-router components
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"

// @mui material components
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

// Material Kit 2 React themes
import theme from "assets/theme"
import Presentation from "layouts/pages/presentation"
import Test from "./test"

// Material Kit 2 React routes
import routes from "routes"
//store 
import store from "./redux/store"
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addCanister } from '../frontend/redux/canisterSlice'
/*
 * Some examples to get you started
 */
function App() {
  const { pathname } = useLocation()
  const dispatch = useDispatch();
  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    // dispatch(
    //   addCanister({
    //     canister: value,
    //   })
    // );
  }, [pathname])

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse)
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        )
      }

      return null
    })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Test />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="*" element={<Navigate to="/presentation" />} />
      </Routes>
    </ThemeProvider>
  )
}
const client = createClient({
  canisters: {
    dip20,
    dip721,
    marketplace_auction,
    // stake
  },
  providers: defaultProviders,
  globalProviderConfig: {
    /*
     * Disables dev mode in production
     * Should be enabled when using local canisters
     */
    dev: import.meta.env.DEV,
  },
})

console.log('dip20', dip20)


export default () => (
  <Connect2ICProvider client={client}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </Connect2ICProvider>
)
