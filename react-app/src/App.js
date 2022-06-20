import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SplashPage from './components/SplashPage'
import Calendar from "./components/Calendar";
import CreateEmployeePage from "./components/CreateEmployeePage";
import CreateSchedulePage from "./components/CreateSchedulePage";
import UpdateSchedulePage from "./components/UpdateSchedulePage";
import UpdateEmployeePage from "./components/UpdateEmployeePage";
import { authenticate } from "./store/session";

function App() {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true} >
          <SplashPage />
          <Calendar />
        </Route>
        <Route path='/employees/new' exact={true}>
            <CreateEmployeePage />
          </Route>
          <Route path='/schedules/new' exact={true}>
            <CreateSchedulePage />
          </Route>
          <Route path='/schedules/:id/edit'>
            <UpdateSchedulePage />
          </Route>
          <Route path='/employees/:id/edit'>
            <UpdateEmployeePage />
          </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
