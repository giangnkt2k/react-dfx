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

// Custom Material Kit 2
import MyNavbarDropdown from "./MyNavbarDropdown"

// Material Kit 2 React base styles
import breakpoints from "assets/theme/base/breakpoints"

// Images
import logoDau from "assets/images/logo-dau.png"

// Connect Wallet
import { ConnectDialog } from "@connect2ic/react"

function MyHeaderNavbar({
  transparent,
  light,
  actions,
  subActions,
  sticky,
  relative,
  center,
  isLogin,
  routes,
}) {
  const [dropdown, setDropdown] = useState("")
  const [dropdownEl, setDropdownEl] = useState("")

  const renderNavbarItem = actions.map(
    ({ type, color, route, label, isBtn, connectBtn }, index) => {
      const linkComponent = {
        component: <></>,
        href: route,
        target: "_blank",
        rel: "noreferrer",
      }
      const routeComponent = {
        component: Link,
        to: route,
      }
      const isInternal = type === "internal"
      return isInternal ? (
        <MKBox
          key={label + index}
          mx={1}
          p={1}
          display="flex"
          alignItems="center"
          {...(isInternal && routeComponent)}
          {...(!isInternal && linkComponent)}
          color={light ? "white" : "dark"}
          opacity={light ? 1 : 0.6}
          sx={{ cursor: "pointer", userSelect: "none" }}
        >
          {isBtn ? (
            <MKButton
              key={label + index + "child"}
              variant={
                color === "white" || color === "default"
                  ? "contained"
                  : "gradient"
              }
              color={color ? color : "info"}
              size="small"
              onClick={(event) => {
                event.preventDefault()
                connectBtn ? onConnectPlug() : null
              }}
            >
              {label}
            </MKButton>
          ) : (
            <MKTypography
              key={label + index + "child"}
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
          key={label + index}
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
              key={label + index + "child"}
              variant={
                color === "white" || color === "default"
                  ? "contained"
                  : "gradient"
              }
              color={color ? color : "info"}
              size="small"
              onClick={ async (event) => {
                event.preventDefault()
                connectBtn ? await onConnectPlug() : null
              }}
            >
              {label}
            </MKButton>
          ) : (
            <MKTypography
              key={label + index + "child"}
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
      )
    },
  )
  const renderNavbarSubItem = subActions.map(({ label, color }) => (
    <MKBox
      key={label}
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
        key={label + "child"}
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
  const renderNavbarUser = routes.map(({ name, collapse }) => {
    return (
      <MyNavbarDropdown
        key={name}
        collapse={Boolean(collapse)}
        onMouseEnter={({ currentTarget }) => {
          if (collapse) {
            setDropdown(currentTarget)
            setDropdownEl(currentTarget)
          }
        }}
        onMouseLeave={() => collapse && setDropdown(null)}
        light={light}
      />
    )
  })
  // Render the routes on the dropdown menu
  const renderRoutes = routes.map(
    ({ name, collapse, columns, rowsPerColumn }) => {
      // Render the dropdown menu that should be display as columns
      const calculateColumns = collapse.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / rowsPerColumn)
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []
        }
        resultArray[chunkIndex].push(item)
        return resultArray
      }, [])
      let template = (
        <Grid key={name} container spacing={3} py={1} px={1.5}>
          {calculateColumns.map((cols, key) => {
            const gridKey = `grid-${key}`
            const dividerKey = `divider-${key}`

            return (
              <Grid
                key={gridKey}
                item
                xs={12 / columns}
                sx={{ position: "relative" }}
              >
                {cols.map((col, index) => (
                  <Fragment key={col.name}>
                    <MKTypography
                      display="block"
                      variant="button"
                      fontWeight="bold"
                      textTransform="capitalize"
                      py={1}
                      px={0.5}
                      mt={index !== 0 ? 2 : 0}
                    >
                      {col.name}
                    </MKTypography>
                    {col.collapse.map((item) => (
                      <MKTypography
                        key={item.name}
                        component={item.route ? Link : MuiLink}
                        to={item.route ? item.route : ""}
                        href={item.href ? item.href : (e) => e.preventDefault()}
                        target={item.href ? "_blank" : ""}
                        rel={item.href ? "noreferrer" : "noreferrer"}
                        minWidth="11.25rem"
                        display="block"
                        variant="button"
                        color="text"
                        textTransform="capitalize"
                        fontWeight="regular"
                        py={0.625}
                        px={2}
                        sx={({
                          palette: { grey, dark },
                          borders: { borderRadius },
                        }) => ({
                          borderRadius: borderRadius.md,
                          cursor: "pointer",
                          transition: "all 300ms linear",

                          "&:hover": {
                            backgroundColor: grey[200],
                            color: dark.main,
                          },
                        })}
                      >
                        {item.name}
                      </MKTypography>
                    ))}
                  </Fragment>
                ))}
                {key !== 0 && (
                  <Divider
                    key={dividerKey}
                    orientation="vertical"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "-4px",
                      transform: "translateY(-45%)",
                      height: "90%",
                    }}
                  />
                )}
              </Grid>
            )
          })}
        </Grid>
      )

      // Render the dropdown menu that should be display as list items

      return template
    },
  )
  // Routes dropdown menu
  const dropdownMenu = (
    <Popper
      anchorEl={dropdown}
      popperRef={null}
      open={Boolean(dropdown)}
      placement="top-start"
      transition
      style={{ zIndex: 10 }}
      modifiers={[
        {
          name: "arrow",
          enabled: true,
        },
      ]}
      onMouseEnter={() => setDropdown(dropdownEl)}
      onMouseLeave={() => setDropdown(null)}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          sx={{
            transformOrigin: "left top",
            background: ({ palette: { white } }) => white.main,
          }}
        >
          <MKBox borderRadius="lg">
            <MKBox shadow="lg" borderRadius="lg" p={2} mt={2}>
              {renderRoutes}
            </MKBox>
          </MKBox>
        </Grow>
      )}
    </Popper>      
  )

  const onConnectPlug = async () => {
    try {
      const publicKey = await window.ic.plug.requestConnect()
      console.log(`The connected user's public key is:`, publicKey)
    } catch (e) {
      console.log(e)
    }
  }
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
          <MKBox
            component={Link}
            to="/presentation"
            lineHeight={1}
            pr={{ xs: 0, lg: 1 }}
          >
            <MKAvatar src={logoDau} alt="logo-dau" size="xl" />
          </MKBox>
          <MKBox
            component={Link}
            to="/presentation"
            lineHeight={1}
            pr={{ xs: 0, lg: 1 }}
          >
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
          {isLogin ? renderNavbarUser : null}
        </MKBox>
      </MKBox>
      <MKBox color="inherit" display="flex" ml="auto" mr={center ? "auto" : 0}>
        {renderNavbarSubItem}
      </MKBox>
      {dropdownMenu}
      <ConnectDialog />
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
