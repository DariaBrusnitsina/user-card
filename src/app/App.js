import React from "react";
import { Route, Switch } from "react-router-dom";
import Card from "./card";
import Edit from "./edit";
import "./App.css"

function App() {
    return (
    <div>
        <Switch>
            <Route path="user-card/" exact component={Card}/>
            <Route path="user-card/edit" component={Edit}/>
        </Switch>
    </div>
    );
}

export default App;
