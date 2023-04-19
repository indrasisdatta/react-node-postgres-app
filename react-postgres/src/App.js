import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
// import { makeStyles } from '@mui/styles';
import "./App.css";
import UsersList from "./components/Users/usersList";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { createContext, useContext, useMemo, useState } from "react";
import { Brightness4Outlined, Brightness7Outlined } from "@mui/icons-material";

import LightThemeObj from "./Theme/lightMode";
import DarkThemeObj from "./Theme/darkMode";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Login from "./components/Authenticate/login";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import { userLogout } from "./redux/actions/actionCreators";
import ProtectedRoute from "./components/Authenticate/ProtectedRoute";
import { getThemeLS, setThemeLS } from "./utils/util";
import UsersAdd from "./components/Users/usersAdd";

const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const BaseContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(10),
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
  marginBottom: theme.spacing(10),
  // display: "flex",
  // alignItems: "center"
}));

function App() {
  const authUser = useSelector((state) => state.auth.authUser);
  console.log("authUser", authUser);
  const dispatch = useDispatch();

  const [userTheme, setUserTheme] = useState(getThemeLS());

  const logoutHandler = () => {
    // console.log('User logout')
    dispatch(userLogout());
  };

  const handleThemeChange = () => {
    const thm = theme.palette.mode === "dark" ? "light" : "dark";
    setUserTheme(thm);
    setThemeLS(thm);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: userTheme,
          ...(userTheme === "light" ? LightThemeObj : DarkThemeObj),
        },
      }),
    [userTheme]
  );

  // console.log('Theme', theme);
  // const colorMode = useContext(ColorModeContext);
  // const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <Typography variant="h6">
              <NavLink className="menu-link" to="/">
                React PostgreSQL
              </NavLink>
            </Typography>
            <IconButton sx={{ display: "flex" }} onClick={handleThemeChange}>
              {theme.palette.mode === "dark" ? (
                <Brightness7Outlined />
              ) : (
                <Brightness4Outlined />
              )}
            </IconButton>
            {!authUser.token && (
              <Button variant="outlined">
                <NavLink to="/login" className="menu-link">
                  Login
                </NavLink>
              </Button>
            )}
            {!!authUser.token && (
              <Button variant="contained" onClick={logoutHandler}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <BaseContainer>
          <Routes>
            <Route path="/" element={<Home />} exact></Route>

            <Route path="login" element={<Login />}></Route>

            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<UsersList />} exact />
              <Route path="users/add" element={<UsersAdd />} />
            </Route>
          </Routes>
        </BaseContainer>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
