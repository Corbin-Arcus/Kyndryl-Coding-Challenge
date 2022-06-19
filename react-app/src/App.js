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
import { authenticate } from "./store/session";

function App() {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const [hours, setHours] = useState(0)

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
          <SplashPage hours={hours} setHours={setHours}/>
          <Calendar hours={hours} setHours={setHours} />
        </Route>
        <Route path='/employees/new' exact={true}>
            <CreateEmployeePage />
          </Route>
          <Route path='/schedules/new' exact={true}>
            <CreateSchedulePage />
          </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
