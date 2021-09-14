import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import "./header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const account = useSelector((state) => {
    return state.account;
  });

  const handleSignout = () => {
    localStorage.removeItem("managerToken");
    window.location.reload();
  };
  return (
    <div>
      <AppBar
        className="menu"
        position="static"
        style={{ backgroundColor: "black", color: "orange" }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <LocalMoviesIcon fontSize="large" />
            </IconButton>
            <Typography className="title" variant="h4">
              GV Cinema Admin
            </Typography>
            <NavLink
              className="navlink"
              activeClassName="activelink"
              to="/"
              exact
            >
              DashBoard
            </NavLink>
            {account ? (
              <Fragment>
                <Typography className="activelink" component="h4" variant="h6">
                  Hi ,{account?.content?.taiKhoan.toUpperCase()}
                </Typography>
                <NavLink
                  activeClassName="activelink"
                  to="/adduser"
                  exact
                  component={Button}
                  color="primary"
                  variant="contained"
                  style={{marginRight:"15px"}}
                >
                  Add New User
                </NavLink>
                <NavLink
                  activeClassName="activelink"
                  to="/searchuser"
                  exact
                  component={Button}
                  color="primary"
                  variant="contained"
                >
                  Search User
                </NavLink>
                <Button
                  style={{ marginLeft: "15px" }}
                  onClick={handleSignout}
                  color="secondary"
                  size="medium"
                  variant="contained"
                >
                  Signout
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <NavLink
                  className="navlink"
                  activeClassName="activelink"
                  to="/signin"
                >
                  Signin
                </NavLink>
              </Fragment>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
export default React.memo(Header);
