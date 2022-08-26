import React from "react"

// Import Component Mui
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"

// Import Icon
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"

import MyListRoot from "./MyListRoot"
import { verify } from "@dfinity/agent"
/*
  item = {
    id: v4(),
    file: File
  }
*/
function MKList({
  items,
  handleOnClick,
  handleDelete,
  handleAdd,
  handleClickBtn,
  ...rest
}) {
  return (
    <>
      <List>
        <ListItem sx={{ mb: 1 }} onClick={handleClickBtn}>
          <ListItemText
            sx={{ textAlign: "center", border: "1px solid #f0f2f5" }}
            primary={
              <IconButton>
                <AddIcon />
              </IconButton>
            }
          />
        </ListItem>
      </List>
      <MyListRoot {...rest}>
        {items.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  handleDelete(item.id)
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={item.file.name}
              onClick={() => {
                handleOnClick({
                  img: URL.createObjectURL(item.file),
                  name: item.file.name,
                })
              }}
            />
          </ListItem>
        ))}
      </MyListRoot>
    </>
  )
}

export default MKList
