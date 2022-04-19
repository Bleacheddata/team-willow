import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function NaviBar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Card Openings
        </Typography>
        <div className={classes.navlinks}>
          <Link to="/dashboard" className={classes.link}>
            Home
          </Link>
          <Link to="/cardopening" className={classes.link}>
            Open Cards
          </Link>
          <Link to="/login" className={classes.link}>
            Login
          </Link>
          <Link to="/register" className={classes.link}>
            Register
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default NaviBar;
