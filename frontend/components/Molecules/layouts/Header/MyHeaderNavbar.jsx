/* eslint-disable no-param-reassign */
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

import { Fragment, useState, useEffect } from "react"
import React from "react"
// react-router components
import { Link } from "react-router-dom"

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types"

// @mui material components
import Container from "@mui/material/Container"
import Icon from "@mui/material/Icon"
import Popper from "@mui/material/Popper"
import Grow from "@mui/material/Grow"
import Grid from "@mui/material/Grid"
import Divider from "@mui/material/Divider"
import MuiLink from "@mui/material/Link"

// Material Kit 2 React components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import MKButton from "components/MKButton"
import MKAvatar from "components/MKAvatar"

// Material Kit 2 React base styles
import breakpoints from "assets/theme/base/breakpoints"

// Images
import logoDau from "assets/images/logo-dau.png"

function MyHeaderNavbar({
  transparent,
  light,
  actions,
  subActions,
  sticky,
  relative,
  center,
}) {
  const renderNavbarItem = actions.map(({ type, color, route, label, isBtn }) =>
    type === "internal" ? (
      <MKBox
        mx={1}
        p={1}
        display="flex"
        alignItems="center"
        color={light ? "white" : "dark"}
        opacity={light ? 1 : 0.6}
        sx={{ cursor: "pointer", userSelect: "none" }}
      >
        {isBtn ? (
          <MKButton
            component={Link}
            to={route}
            variant={
              color === "white" || color === "default"
                ? "contained"
                : "gradient"
            }
            color={color ? color : "info"}
            size="small"
          >
            {label}
          </MKButton>
        ) : (
          <MKTypography
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            color={light ? "white" : "dark"}
            sx={{ fontWeight: "100%", ml: 1, mr: 0.25 }}
          >
            {label}
          </MKTypography>
        )}
      </MKBox>
    ) : (
      <MKBox
        mx={1}
        p={1}
        display="flex"
        alignItems="center"
        color={light ? "white" : "dark"}
        opacity={light ? 1 : 0.6}
        sx={{ cursor: "pointer", userSelect: "none" }}
      >
        {isBtn ? (
          <MKButton
            component="a"
            href={route}
            target="_blank"
            rel="noreferrer"
            variant={
              color === "white" || color === "default"
                ? "contained"
                : "gradient"
            }
            color={color ? color : "info"}
            size="small"
          >
            {label}
          </MKButton>
        ) : (
          <MKTypography
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            color={light ? "white" : "dark"}
            sx={{ fontWeight: "100%", ml: 1, mr: 0.25 }}
          >
            {label}
          </MKTypography>
        )}
      </MKBox>
    ),
  )
  const renderNavbarSubItem = subActions.map(({ label, color }) => (
    <MKBox
      mx={1}
      pr={1}
      pl={1}
      display="flex"
      alignItems="center"
      color={light ? "white" : "dark"}
      opacity={light ? 1 : 0.6}
      sx={{ cursor: "pointer", userSelect: "none" }}
    >
      <MKTypography
        variant="button"
        fontWeight="regular"
        textTransform="capitalize"
        color={color ? color : light ? "white" : "dark"}
        sx={{ fontWeight: "100%", ml: 1, mr: 0.25 }}
      >
        {label}
      </MKTypography>
    </MKBox>
  ))

  return (
    <Container sx={sticky ? { position: "sticky", top: 0, zIndex: 10 } : null}>
      <MKBox
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={relative ? 0 : 2}
        mx={relative ? 0 : 3}
        width={relative ? "100%" : "calc(100% - 48px)"}
        borderRadius="xl"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        position={relative ? "relative" : "absolute"}
        left={0}
        zIndex={3}
        sx={({
          palette: { transparent: transparentColor, white },
          functions: { rgba },
        }) => ({
          backgroundColor: transparent
            ? transparentColor.main
            : rgba(white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <MKBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <MKBox component={Link} to="/" lineHeight={1} pr={{ xs: 0, lg: 1 }}>
            <MKAvatar src={logoDau} alt="logo-dau" size="xl" />
          </MKBox>
          <MKBox component={Link} to="/" lineHeight={1} pr={{ xs: 0, lg: 1 }}>
            <MKTypography
              variant="h2"
              color="text"
              fontWeight="bold"
              textTransform="uppercase"
            >
              DeAuction
            </MKTypography>
          </MKBox>
          <MKBox
            color="inherit"
            display={{ xs: "none", lg: "flex" }}
            ml="auto"
            mr={center ? "auto" : 0}
          >
            {renderNavbarItem}
          </MKBox>
        </MKBox>
      </MKBox>
      <MKBox>
        <MKBox
          color="inherit"
          display={{ xs: "none", lg: "flex" }}
          ml="auto"
          mr={center ? "auto" : 0}
        >
          {renderNavbarSubItem}
        </MKBox>
      </MKBox>
    </Container>
  )
}

// Setting default values for the props of DefaultNavbar
MyHeaderNavbar.defaultProps = {
  brand: "Material Kit 2",
  transparent: false,
  light: false,
  actions: [],
  sticky: false,
  relative: false,
  center: false,
}

// Typechecking props for the DefaultNavbar
MyHeaderNavbar.propTypes = {
  brand: PropTypes.string,
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
        "default",
        "white",
      ]),
      label: PropTypes.string.isRequired,
      isBtn: PropTypes.bool.isRequired,
    }),
  ),
  subActions: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
        "default",
        "white",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ),
  sticky: PropTypes.bool,
  relative: PropTypes.bool,
  center: PropTypes.bool,
}

export default MyHeaderNavbar
