import React, { FunctionComponent, useEffect, useCallback } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import MoreIcon from "@material-ui/icons/MoreVert";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { logout } from "../API/API";
import { NavigationBarProp } from "../types";

export const NavigationBar: FunctionComponent<NavigationBarProp> = ({
  loggedIn,
  name,
  handleLogout
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  console.log(loggedIn)
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl
  ] = React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // const handleLogout = () => {
  //   logout()
  //     .then(response => {
  //       if (response.logout) 
  //       // handleMenuClose();
  //     })
  // };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Button href="Login" color="inherit">
        Login
      </Button>
      {/* <Button href="Logout" color="inherit">
        Logout
      </Button> */}
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>My account</MenuItem>
    </Menu>
  );

  function Space() {
    return (
      <Typography className={classes.title} variant="h6" noWrap>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Typography>
    );
  }
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link href="/NearbyEvents" color="inherit">
              Nearby Events
            </Link>
          </Typography>
          <Space />
          <Typography className={classes.title} variant="h6" noWrap>
            <Link href="/RecommendedEvents" color="inherit">
              Recommended Events
            </Link>
          </Typography>
          <Space />
          <Typography className={classes.title} variant="h6" noWrap>
            <Link href="/FavoriteEvents" color="inherit">
              Favorite Events
            </Link>
          </Typography>
          <Space />
          {/* <Typography className={classes.title} variant="h6" align="right" noWrap>
            <Link href="Login" color="inherit">
              LOGIN 
            </Link>
          </Typography>
          <Space/>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link href="Logout" color="inherit">
              LOGOUT 
            </Link>
          </Typography> */}
          {!loggedIn ? (
            <Button href="Login" color="inherit">
              Login
            </Button>
          ) : (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          )}
          <AccountCircle />
          <Space />
          <Space />
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            {/* <AccountCircle /> */}
          </IconButton>
          {loggedIn && (
            <Typography className={classes.title} variant="h6" noWrap>
              Welcome {name}！
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      {/* {renderMenu} */}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    title: {
      display: "none",
      fontSize: "1.0rem",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    }
  })
);

const LogInfo = styled.div`
  float: right;
`;
