import React from "react";
import './talentsignup.scss';
import {Button,Checkbox,FormControlLabel,CircularProgress } from '@mui/material';
import axios from "axios";
import { toast } from 'react-toastify';


class TalentSignup extends React.Component{
   constructor(props){
	    super(props);
        this.state={
            firstName:'',
            lastName:'',
            email:'',
            userName:'',
            password:'',
            termCondition:false,
            errors:{},
            submitLoading:false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }   

    isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    handleSubmit(){
        const {firstName,lastName,email,userName,password,termCondition} = this.state
        let errors = {};
        
        ['firstName','lastName','email','userName','password'].forEach((name) => {
            let value = ""
            switch(name){
                case 'firstName':
                        value = firstName;
                    break;
                case 'lastName':
                        value = lastName;
                    break;
                case 'userName':
                        value = userName;
                    break;
                case 'email':
                        value = email;
                    break;
                case 'password':
                        value = password;
                    break;
            }
            
            if (!value) {
                errors[name] = 'Should not be empty';
            }else if(name == "email" && !value.match(/\S+@\S+\.\S+/)){
                errors[name] = 'Email is not valid'
            }else if(name == "password" && value.length < 8){
                errors[name] = 'Password should at least 8 character'
            }
            else if(name == "password" && value.match(/^(?=.*[A-Za-z0-9])[A-Za-z0-9 _]*$/)){
                errors[name] = 'Password should one numeric, one character, one special character.'
            }
        });
        
        this.setState({errors})

        if(this.isEmpty(errors)){
            if(!termCondition){
                errors["formError"] = "Please accept terms and conditions"
                return;
            }
            this.setState({submitLoading:true})
            let params ={
                "first_name": firstName,
                "last_name": lastName,
                "username": userName,
                "email": email,
                "password": password,
            }
            axios.post(`http://wren.in:3200/api/sign-up/fan`,params).then((response)=>{
                console.log(response)
                this.setState({submitLoading:false})
                toast.info('Signup success.')
                // this.props.history.push('/dashboard')
            }).catch((error)=>{
                errors["formError"] = error.response.error
                this.setState({submitLoading:false})
            })
            this.setState({errors})
        }

    }
    
	render() {
        const {firstName,lastName,email,userName,password,termCondition,errors,submitLoading} = this.state

		return(
            <div id="TalentSignup">
                <div className="form-main">
                    <div className="form-header">Create your fan account</div>
                    <div className="form-input-section">
                        <p className="form-lable">First name *</p>
                        <input
                            type="text"
                            className="form-input"  
                            placeholder="First name"
                            value={firstName}
                            onChange={(e)=>this.setState({firstName:e.target.value})}
                        />
                        {errors.firstName !== undefined &&
                            <div className="error-msg">{errors.firstName}</div>
                        }
                    </div>
                    <div className="form-input-section">
                        <p className="form-lable">Last name *</p>
                        <input
                            type="text"
                            className="form-input"  
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e)=>this.setState({lastName:e.target.value})}
                        />
                        {errors.lastName !== undefined &&
                            <div className="error-msg">{errors.lastName}</div>
                        }
                    </div>
                    <div className="form-input-section">
                        <p className="form-lable">Username *</p>
                        <input
                            type="text"
                            className="form-input"  
                            placeholder="Username"
                            value={userName}
                            onChange={(e)=>this.setState({userName:e.target.value})}
                        />
                        {errors.userName !== undefined &&
                            <div className="error-msg">{errors.userName}</div>
                        }
                    </div>
                    <div className="form-input-section">
                        <p className="form-lable">Email *</p>
                        <input
                            type="text"
                            className="form-input"  
                            placeholder="Email"
                            value={email}
                            onChange={(e)=>this.setState({email:e.target.value})}
                        />
                        {errors.email !== undefined &&
                            <div className="error-msg">{errors.email}</div>
                        }
                    </div>
                    <div className="form-input-section">
                        <p className="form-lable">Password *</p>
                        <input
                            type="text"
                            className="form-input"  
                            placeholder="Password"
                            value={password}
                            onChange={(e)=>this.setState({password:e.target.value})}
                        />
                        {errors.password !== undefined &&
                            <div className="error-msg">{errors.password}</div>
                        }
                    </div>
                    <div className="form-input-section">
                        <FormControlLabel
                            label={<div>I agree the <span >Terms and Conditions.</span></div>}
                            className="checkbox-input"
                            control={
                                <Checkbox
                                    checked={termCondition}
                                    onChange={()=>this.setState({termCondition:!termCondition})}
                                />
                            }
                        />
                    </div>

                    {errors.formError !== undefined &&
                        <div className="error-msg">{errors.formError}</div>
                    }

                    <div className="form-input-section">
                        {submitLoading ?
                            <Button  
                                variant="contained" 
                                className="form-input-submit"
                            >
                                <CircularProgress 
                                    color="inherit" 
                                    size={20}
                                />
                            </Button>
                        :
                            <Button 
                                variant="contained" 
                                className="form-input-submit"
                                onClick={this.handleSubmit}
                            >
                                Submit
                            </Button>
                        }
                    </div>
                </div>
            </div>
		)
	}
}

export default TalentSignup;