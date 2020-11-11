import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import CreateCliente from "./pages/CreateCliente";
import ClienteLogin from "./pages/ClienteLogin";
import Mensagens from "./pages/Mensagens";

function Routes() {
   return (
    <BrowserRouter>
        <Switch>
            <Route path="/login" exact component={ClienteLogin} />
            <Route path="/cadastro" component={CreateCliente} />
            <Route path="/mensagens" component={Mensagens} />
            <Redirect from="/" to="/login"/>
        </Switch>
    </BrowserRouter>
   );
}

export default Routes;