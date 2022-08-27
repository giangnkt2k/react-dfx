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
// @mui material components
import { styled } from "@mui/material/styles"

// Material Kit 2 React components
import MKTypography from "components/MKTypography"
import MKButton from "components/MKButton"
import MKBox from "components/MKBox"

//Import function
import rgba from "assets/theme/functions/rgba"

const MyThemeStep = styled(MKButton)(({ theme, ownerState }) => {
  const { borders, functions, typography, palette } = theme
  const { variant, paginationSize, active } = ownerState

  const { borderColor } = borders
  const { pxToRem } = functions
  const { fontWeightRegular, size: fontSize } = typography
  const { light } = palette

  // width, height, minWidth and minHeight values
  let sizeValue = pxToRem(36)

  if (paginationSize === "small") {
    sizeValue = pxToRem(30)
  } else if (paginationSize === "large") {
    sizeValue = pxToRem(46)
  }

  return {
    borderColor,
    margin: `0 ${pxToRem(2)}`,
    pointerEvents: active ? "none" : "auto",
    fontWeight: fontWeightRegular,
    fontSize: fontSize.sm,
    width: sizeValue,
    minWidth: sizeValue,
    height: sizeValue,
    minHeight: sizeValue,

    "&:hover, &:focus, &:active": {
      transform: "none",
      boxShadow:
        (variant !== "gradient" || variant !== "contained") &&
        "none !important",
      opacity: "1 !important",
    },

    "&:hover": {
      backgroundColor: light.main,
      borderColor,
    },
  }
})

const MyThemeProgress = styled(MKBox)(({ theme, ownerState }) => {
  const { functions } = theme
  const { paginationSize } = ownerState

  const { pxToRem } = functions

  // width, height, minWidth and minHeight values
  let sizeValue = pxToRem(18)

  if (paginationSize === "small") {
    sizeValue = pxToRem(15)
  } else if (paginationSize === "large") {
    sizeValue = pxToRem(23)
  }

  return {
    height: pxToRem(1),
    flex: "1 1 0px",
    position: "absolute",
    top: sizeValue,
    left: `calc(-50% + ${sizeValue})`,
    right: `calc(50% + ${sizeValue})`,
  }
})

const MyProgressStep = ({
  variant,
  color,
  size,
  status,
  children,
  placement,
  label,
  firstItem,
  ...rest
}) => {
  const paginationSize = size || null
  const backgroundColor = firstItem
    ? status === "new"
      ? "secondary"
      : status === "error"
      ? "error"
      : color
    : "transparent"

  const colorStep =
    status === "done"
      ? color
      : ["pending", "error"].includes(status)
      ? "light"
      : "secondary"

  if (placement === "left") {
    placementValue = "flex-start"
  } else if (placement === "center") {
    placementValue = "center"
  }

  return (
    <MKBox
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        width: "100%",
        marginBottom: "auto",
      }}
    >
      <MyThemeProgress
        {...rest}
        bgColor={backgroundColor}
        ownerState={{ paginationSize, variant }}
        mx={1}
      />
      <MyThemeStep
        {...rest}
        variant={status === "new" ? "outlined" : variant}
        color={colorStep}
        iconOnly
        circular
        ownerState={{ variant, status, paginationSize }}
      >
        {children}
      </MyThemeStep>
      <MKTypography variant="h6" py={1} align="center">
        {label}
      </MKTypography>
    </MKBox>
  )
}

// Setting default values for the props of MKPagination
MyProgressStep.defaultProps = {
  variant: "gradient",
  color: "info",
  size: "medium",
  status: "new",
  placement: "right",
}

// Typechecking props for the MKPagination
MyProgressStep.propTypes = {
  variant: PropTypes.oneOf(["gradient", "contained"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  status: PropTypes.oneOf(["new", "pending", "done"]),
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(["left", "right", "center"]),
}
export default MyProgressStep
