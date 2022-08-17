/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react"
// prop-types is a library for typechecking of props
import PropTypes from "prop-types"

// react-router-dom components
import { Link } from "react-router-dom"

// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"

// Material Kit 2 React components
import MKBox from "components/MKBox"
import MKAvatar from "components/MKAvatar"

// Image
import team1 from "assets/images/team-1.jpg"

function MyNavbarDropdown({
  name,
  icon,
  children,
  collapseStatus,
  light,
  href,
  route,
  collapse,
  ...rest
}) {
  const linkComponent = {
    component: "a",
    href,
    target: "_blank",
    rel: "noreferrer",
  }

  const routeComponent = {
    component: Link,
    to: route,
  }

  return (
    <>
      <MKBox
        {...rest}
        mx={1}
        p={1}
        display="flex"
        alignItems="baseline"
        color={light ? "white" : "dark"}
        opacity={light ? 1 : 0.6}
        sx={{ cursor: "pointer", userSelect: "none" }}
        {...(route && routeComponent)}
        {...(href && linkComponent)}
      >
        <MKBox ml={{ xs: "auto", lg: 0 }}>
          <Container>
            <Grid container justifyContent="center">
              <MKAvatar src={team1} alt="team 1" size="md" />
            </Grid>
          </Container>
        </MKBox>
      </MKBox>
    </>
  )
}

// Setting default values for the props of MyNavbarDropdown
MyNavbarDropdown.defaultProps = {
  children: false,
  collapseStatus: false,
  light: false,
  href: "",
  route: "",
}

// Typechecking props for the MyNavbarDropdown
MyNavbarDropdown.propTypes = {
  children: PropTypes.node,
  collapseStatus: PropTypes.bool,
  light: PropTypes.bool,
  href: PropTypes.string,
  route: PropTypes.string,
  collapse: PropTypes.bool.isRequired,
}

export default MyNavbarDropdown
