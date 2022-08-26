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
// @mui material components
import FormControl from "@mui/material/FormControl"
import { styled } from "@mui/material/styles"

export default styled(FormControl)(({ theme }) => {
  const { palette, functions } = theme

  const {
    grey,
    transparent,
    error: colorError,
    success: colorSuccess,
  } = palette
  const { pxToRem } = functions

  // styles for the input with error={true}

  return {
    "& .MuiInputBase-root": {
      padding: `${pxToRem(12)} !important`,
    },
  }
})
