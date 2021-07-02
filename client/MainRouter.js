import React from "react";
import { Switch, Route } from "react-router-dom";

import Register from "../client/auth/Signup";
import Landing from "../client/views/Landing";
import Login from "./auth/Signin";

import Cart from "./Shop/Cart";
import Detail from "./views/talents/detail";
import PrivateRoute from "../client/auth/PrivateRoute"

import MainLayout from "./views/MainLayout";
import Home from "./views/Home";
import Talents from "../client/views/talents/Talents";
import AddEditTalents from "../client/views/talents/AddEditTalents";
import Edit from "../client/views/talents/Edit";
import ProsesCheckOut from "./Shop/ProsesCheckOut"
import Order from "../client/Shop/Order"
import News from "../client/views/News"
import userDetail from "./views/users/detailUser";
import userUpdate from "./views/users/userUpdate";




const MainRouter = () => {
 
  return (
    <>
      <Switch>
        <Route exact path="/talent/" component={Landing} />
        <Route exact path="/talent/login/" component={Login} />
        <Route exact path="/talent/register/" component={Register} />
        <PrivateRoute exact path ="/talent/detail/:id/" component={Detail}/>
        <Route exact path="/talent/cart/" component={Cart} />
        <Route exact path="/talent/checkout/" component={ProsesCheckOut} />
        <Route exact path="/talent/order/" component={Order} />
        <Route exact path="/talent/news/" component={News} />
        <Route exact path="/talent/userdetail/" component={userDetail} />
        <Route exact path="/talent/userupdate/" component={userUpdate} />



        <MainLayout>
          <Route exact path="/talent/dashboard" component={Home} />
          <Route exact path="/talent/list" component={Talents} />
          <Route
            exact
            path="/talent/Add"
            component={AddEditTalents}
          />
          <Route exact path="/talent/edit/:id" component={Edit} />
        </MainLayout>
      </Switch>
    </>
  );
};

export default MainRouter;
