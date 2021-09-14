import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import { fetchMe } from "./api/accountList";
import "./App.css";
import { AuthRoute, PrivateRoute } from "./HOC/Route/Route";
import theme from "./Theme/theme";
import AddUser from "./Views/AddUser/AddUser";
import Dashboard from "./Views/Dashboard/DashBoard";
import EditUser from "./Views/EditUser/EditUser";
import SearchUser from "./Views/SearchUser/SearchUser";
import Signin from "./Views/Signin/Signin";

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const managerToken = localStorage.getItem("managerToken");
    if (managerToken) {
      dispatch(fetchMe(managerToken));
    }
  });

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Switch>
            <AuthRoute component={Signin} path="/signin" exact redirectPath="/" />
            <PrivateRoute component={AddUser} path="/adduser" exact redirectPath="/signin"/>
            <PrivateRoute component={EditUser} path="/edituser" exact redirectPath="/signin"/>
            <PrivateRoute component={SearchUser} path="/searchuser" exact redirectPath="/signin" />
            <PrivateRoute component={Dashboard} path="/" exact redirectPath="/signin" />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
