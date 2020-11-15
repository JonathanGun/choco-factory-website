import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import ViewModuleIcon from "@material-ui/icons/ViewModule";
import CreateIcon from "@material-ui/icons/Create";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  menuItem: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const theme = useTheme();

  const drawerList = [
    {
      text: "Choco Stock",
      icon: <ViewModuleIcon />,
    },
    {
      text: "Ingredient Stock",
      icon: <CreateIcon />,
    },
    {
      text: "Requests",
      icon: <LocalShippingIcon />,
    },
  ];

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <Divider />
        {drawerList.map((item, index) => (
          <MenuItem
            button
            key={item.text}
            onClick={() => props.handleSidebarItemClick(index)}
            selected={props.activePage === index}
            className={classes.menuItem}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </MenuItem>
        ))}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={document.body}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={props.mobileOpen}
          onClose={props.handleSidebarToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
