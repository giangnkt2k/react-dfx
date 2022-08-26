import React from "react"

import CreateSeller from "pages/FormPages/CreateSeller"
import CreateRealProduct from "pages/FormPages/CreateRealProduct"

const routesHeader = {
  isLogin: [
    {
      type: "internal",
      route: "/seller/create",
      component: <CreateSeller />,
      label: "Become a seller",
      color: "info",
      isBtn: false,
      connectBtn: false,
    },
    {
      type: "internal",
      route: "/product-r/create",
      component: <CreateRealProduct />,
      label: "New request",
      color: "info",
      isBtn: false,
      connectBtn: false,
    },
  ],
  isLogout: [
    {
      type: "internal",
      route: "/seller/create",
      component: <CreateSeller />,
      label: "Become a seller",
      color: "info",
      isBtn: false,
      connectBtn: false,
    },
    {
      type: "internal",
      route: "/product-r/create",
      component: <CreateRealProduct />,
      label: "New request",
      color: "info",
      isBtn: false,
      connectBtn: false,
    },
    {
      type: "external",
      route: "/",
      component: <></>,
      label: "Connect to wallet",
      color: "info",
      isBtn: true,
      connectBtn: true,
    },
  ],
  subHeaders: [
    {
      label: "All products",
      color: "secondary",
    },
    {
      label: "Pending products",
      color: "secondary",
    },
  ],
}

export default routesHeader
