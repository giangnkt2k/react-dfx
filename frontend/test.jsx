import React from "react"
import DauHeader from "components/Molecules/layouts/Header"

function Test() {
  return (
    <div>
      <DauHeader
        changeColorOnScroll={{
          height: 1,
          color: "transparent",
          shadow: "none",
        }}
        isLogin={false}
      />
      <div style={{ height: 20000 }}></div>
    </div>
  )
}

export default Test
