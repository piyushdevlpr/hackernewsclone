import React, { Component } from 'react';
import './App.css'
class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            login : false,
            cred: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.click = this.click.bind(this);
    }
    handleChange(event){
        event.preventDefault() ;
        //this.setState({username: event.target.value})
        //e.preventDefault() ;
        this.setState({
          [event.target.name]: event.target.value
        })
    }
    click(event){
        if(this.state.username === localStorage.getItem("username") && this.state.password === localStorage.getItem("password")){
            this.setState({cred: true});
            this.props.history.push('/home/');
        }else{
            event.preventDefault() ;
            console.log("wrong");
            this.setState({login: true, cred:false});
            //this.setState({cred: false});
            console.log(this.state)
            return this.loginorsignup();
            
        }
    }
    click2(){
        localStorage.setItem("username",this.state.username) ;
        localStorage.setItem("password",this.state.password) ;
        this.props.history.push('/home/');
        //localStorage.setItem("password",this.state.password) ;
    }
    getlogin(){
        return(
        <div>
          
        <form onSubmit={this.click}className=' mt-4'>
        <div>
            <input className='form-control' type='text' placeholder='USERNAME' name='username' value={this.state.username}  onChange={this.handleChange}></input><br/>
            <input className='form-control' type='password' placeholder='PASSWORD' name='password' value={this.state.password} onChange={this.handleChange}></input><br/>
            <button className={'btn btn-default addallborder cred'+this.state.cred}>LOGIN</button>
            {/* <span> OR </span> */}
            {/* <button className='btn btn-default addallborder' onClick={()=>this.getsignup()}>SIGN UP</button> */}
        </div>
        </form>
        </div>
        )
    };
    getsignup(){
        return(
        <div>
          
        <form onSubmit={()=>this.click2()}className=' mt-4'>
        <div>
            <input className='form-control' required = {true} type='text' placeholder='USERNAME' name='username' value={this.state.username}  onChange={this.handleChange}></input><br/>
            <input className='form-control' required = {true} type='password' placeholder='PASSWORD' name='password' value={this.state.password} onChange={this.handleChange}></input><br/>
            <button className='btn btn-default addallborder'>SIGN UP</button>
            {/* <span> OR </span> */}
            {/* <button className='btn btn-default addallborder' onClick={()=>this.getlogin()}>LOGIN</button> */}
        </div>
        </form>
        </div>
        );
    }
    logintrue(){
        this.setState({login : true}) ;
        //event.preventDefault();
        //event.target.classList.add('lohgintrue') ;
    }
    loginfalse(){
        this.setState({login : false});
    }
    loginorsignup(){
        if(this.state.login === true){
            return this.getlogin() ;
        }else{
            return this.getsignup();
        }
    }
    render(){
      return (
          <div className ='container mt-3'>
            <button className={'col-sm-6 btn btn-default addallborder login'+this.state.login } onClick={()=>this.logintrue()}>LOGIN</button><button className={'col-sm-6 btn btn-default addallborder login'+!this.state.login} onClick={()=>this.loginfalse()}>SIGNUP</button>
            {this.loginorsignup()}
          </div>
      ) ;
        }
}
export default Login ;