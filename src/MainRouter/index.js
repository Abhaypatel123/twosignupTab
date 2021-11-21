import { dividerClasses } from "@mui/material";
import React from "react";
import { Route,Switch } from "react-router";
import Dashboard from "../Pages/Dashboard";
import Signup from "../Pages/Signup";

class MainRouter extends React.Component{
   constructor(props){
	    super(props);
        this.state={

        }
    }   

    
	render() {
		return(
            <Switch>
                <Route exact path="/"  component={Signup} />
                <Route path="/dashboard"  component={Dashboard} />
            </Switch>
		)
	}
}

export default MainRouter;