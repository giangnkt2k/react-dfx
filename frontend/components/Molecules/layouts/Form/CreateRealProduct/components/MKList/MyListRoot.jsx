import React from "react"
// @mui material components
import List from "@mui/material/List"
import { styled } from "@mui/material/styles"

export default styled(List)(({ theme }) => {
  const { palette, functions } = theme

  const {
    grey,
    transparent,
    error: colorError,
    success: colorSuccess,
  } = palette
  const { pxToRem } = functions

  const noneScrollYStyle = () => ({})

  return {
    "& .MuiTypography-root": {
      fontSize: pxToRem(16),
      display: "block",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      cursor: "pointer",
      userSelect: "none",
    },
    "& .MuiListItem-root": {
      "&:hover": {
        backgroundColor: "#f0f2f5",
      },
    },
    overflowY: "scroll",
    height: `calc(100% - 42px)`,
    "&::-webkit-scrollbar": {
      width: 0,
    },
  }
})
