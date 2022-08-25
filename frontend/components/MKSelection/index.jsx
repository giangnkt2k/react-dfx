import * as React from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import MySelectionRoot from "components/MKSelection/MySelectionRoot"
import Select from "@mui/material/Select"

function MKSelection({ label, name, formik, items }) {
  return (
    <MySelectionRoot sx={{ width: "100%" }}>
      <InputLabel id={`${label}-select`}>{label}</InputLabel>
      <Select
        labelId={`${label}-select`}
        id={`${label}-select`}
        value={formik.values[name]}
        label={label}
        onChange={formik.handleChange}
      >
        {items.map((item) => (
          <MenuItem value={item.id} key={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
    </MySelectionRoot>
  )
}

export default MKSelection
