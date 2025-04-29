import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/articulos">
          <ListItemText primary="Artículos" />
        </ListItem>
        <ListItem button component={Link} to="/categorias">
          <ListItemText primary="Categorías" />
        </ListItem>
        <ListItem button component={Link} to="/usuarios">
          <ListItemText primary="Usuarios" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
