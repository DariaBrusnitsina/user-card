import React from "react";
import { Route, Switch } from "react-router-dom";
import Card from "./card";
import Edit from "./edit";
import "./App.css"

function App() {
    return (
    <div>
        <Switch>
            <Route path="/edit" component={Edit}/>
            <Route path="/" component={Card}/>
        </Switch>
    </div>
    );
}

export default App;
