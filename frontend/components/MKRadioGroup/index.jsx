import React, { useState } from "react"
import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
} from "@mui/material"

import { makeStyles } from "@mui/styles"

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import MKInput from "components/MKInput"

const useStyle = makeStyles((theme) => ({
  root: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  radioChecked: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    border: "1px solid #1A73E8",
    borderRadius: "50%",
  },
  radioUnchecked: {
    width: theme.spacing(0),
    height: theme.spacing(0),
    padding: theme.spacing(1),
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "50%",
  },
  radio: {
    color: "#1A73E8 !important",
  },
  label: {
    paddingRight: theme.spacing(2),
  },
  radioRoot: {
    padding: theme.spacing(0),
    "&:hover": {
      backgroundColor: "unset",
    },
  },
  radioGroupInput: {
    display: "flex",
    alignItems: "center",
  },
}))

export default function MKRadioGroup(props) {
  const classes = useStyle()
  const { name, radioItems, formik } = props

  const [input, setInput] = useState(
    radioItems.optional ? radioItems.optional.id : null,
  )

  const items = radioItems.items.map((item) => {
    return (item = {
      ...item,
      optional: false,
    })
  })

  const handleOnChangeInput = (event) => {
    setInput("0" + event.target.value)
    formik.setFieldValue(name, "0" + event.target.value, false)
  }

  items.push({ ...radioItems.optional, optional: true })
  return (
    <FormControl classes={{ root: classes.root }}>
      <RadioGroup
        row
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
      >
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.optional ? input : item.id}
            control={
              <Radio
                icon={
                  <FiberManualRecordIcon className={classes.radioUnchecked} />
                }
                checkedIcon={
                  <FiberManualRecordIcon className={classes.radioChecked} />
                }
                classes={{
                  checked: classes.radio,
                  root: classes.radioRoot,
                }}
              />
            }
            classes={{
              checked: classes.radio,
              root: classes.radioRoot + " " + classes.radioGroupInput,
              label: classes.label,
            }}
            label={
              item.optional ? (
                <MKInput
                  values={input}
                  onChange={(e) => {
                    handleOnChangeInput(e)
                  }}
                  classes={{ root: classes.inputRoot }}
                  inputProps={{
                    style: { textAlign: "right" },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" disableTypography>
                        {item.title}
                      </InputAdornment>
                    ),
                  }}
                  helperText={formik.touched[name] && formik.errors[name]}
                  radioGroup
                />
              ) : (
                item.title
              )
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
