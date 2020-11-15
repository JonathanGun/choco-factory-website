import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import Content from "./Content.js";
import Sidebar from "./Sidebar.js";
import Header from "./Header.js";
import SignIn from "./SignIn.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default function App() {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activePage, setActivePage] = React.useState(0);
  const [isLoggedIn, setLogin] = React.useState(false);

  const handleSidebarToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarItemClick = (sidebarIndex) => {
    setActivePage(sidebarIndex);
  };

  const login = (username, password) => {
    fetch("http://localhost:9000/user/login/", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        if (res.return) {
          setLogin(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    setLogin(false);
  };

  if (isLoggedIn) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header handleSidebarToggle={handleSidebarToggle} logout={logout} />
        <Sidebar
          handleSidebarToggle={handleSidebarToggle}
          handleSidebarItemClick={handleSidebarItemClick}
          mobileOpen={mobileOpen}
          activePage={activePage}
        />
        <Content activePage={activePage} />
      </div>
    );
  } else {
    return <SignIn login={login} />;
  }
}
