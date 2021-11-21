import React from "react";
import {Tabs,Tab,TabPanel} from '@mui/material';
import './signup.scss';
import FanSignup from "../../Components/FanSignup";
import TalentSignup from "../../Components/TalentSignup";


class Signup extends React.Component{
   constructor(props){
	    super(props);
        this.state={
            signupType:0,
        }
        this.renderSignupComponents=this.renderSignupComponents.bind(this)
    }   

    renderSignupComponents(){
        const {signupType} = this.state
        switch (signupType) {
            case 0:
                return (
                    <FanSignup 
                        history={this.props.history}
                    />
                )
            break;

            case 1:
                return(
                    <TalentSignup
                        history={this.props.history}
                    />
                )
            break;
        
            default:
                return (
                    <FanSignup 
                        history={this.props.history}
                    />
                )
            break;
        }
    }

    
	render() {
        const {signupType} = this.state
		return(
            <div id="Signup">
                <div className="signup-main">
                    <Tabs value={signupType} onChange={(e,newValue)=>this.setState({signupType:newValue})} className="tabs" aria-label="icon tabs example">
                        <Tab  label="fan signup" className={signupType == 0 ? 'active-tab' : ' tab'}  />
                        <Tab  label="talent signup" className={signupType == 1 ? 'active-tab' : 'tab'} />
                    </Tabs>
                    {this.renderSignupComponents()}
                </div>
            </div>
		)
	}
}

export default Signup;