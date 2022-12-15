import {useState} from 'react';

//Function for login/register/forgot password
function Login({ handleSetLocation, handleLoginInfo, handleProfileInfo}) {

    //Show login or register page based on which tab is clicked
    const [isShown, setIsShown] = useState(false);
    const loginCard = event => {
        setIsShown(false);
    };
    const registerCard = event => {
        setIsShown(true);
    };

    //How to set error Message 
    const [message, setMessage] = useState('');

    //Setters for login and profile result
    const [loginResult, setLoginResult] = useState([]);
    const [profileResult, setProfileResult] = useState([]);

    //If Login form is submitted
    const handleSubmit = event => {

        //If email or password is blank give error
        if(document.getElementById("email").value === "" || document.getElementById("password").value === "") {
            setMessage("Please enter your Email and Password");
        }
        //Once login is filled out
        else {
            //Set email and password based on entry
            let databody = {
                "email": document.getElementById("email").value,
                "password": document.getElementById("password").value,
            }

            //Post databody to database
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(databody),
            };

            //Fetch from login and set the response to postId
            fetch('http://localhost:5000/login', requestOptions)
                .then(response => response.json())
                .then((result) => {setLoginResult(result);})

            //If email or password is not in database give error
            if(loginResult === "you have to register first") {
                setMessage("Incorrect Email and/or Password");
            } 
            else {
                
                //Change to the profile page and send login details
                handleSetLocation('userPage');
                handleLoginInfo(loginResult);

                //Change Navbar to the logged in version
                window.parent.document.getElementById('loginBar').style.display = "none";
                window.parent.document.getElementById('logoutBar').style.display = "block";
                window.parent.document.getElementById('profileBar').style.display = "block";

                //Post databody to database
                const requestOptions2 = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(loginResult),
                };

                //Fetch from login and set the response to postId
                fetch('http://localhost:5000/profile', requestOptions2)
                    .then(response => response.json())
                    .then((result) => {setProfileResult(result);})

                handleProfileInfo(profileResult);
            }
        }

        //Prevent page from refreshing on submit if it isn't valid
        event.preventDefault();
    };

    //How to set error Message
    const [registerMessage, setRMessage] = useState('');

    //If register form is submitted
    const handleRegister = event => {

        //If email or password is blank give error
        if(document.getElementById("rName").value === "" || document.getElementById("rEmail").value === "" || document.getElementById("rPass").value === "" || document.getElementById("rRePass").value === "") {
            setRMessage("Please fill out all of the fields");
        }
        //If Passwords don't Match
        else if(document.getElementById("rPass").value !== document.getElementById("rRePass").value) {
            setRMessage("Please make sure the password fields match");
        }
        //Once user registers
        else {
            let databody2 = {
                "username": document.getElementById("rName").value,
                "email": document.getElementById("rEmail").value,
                "password": document.getElementById("rPass").value,
            }

            //Post databody to database
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(databody2),
            };

            //Fetch from register and set the response to postId
            fetch('http://localhost:5000/register', requestOptions)
                .then(response => response.json())
                .then(data => this.setState({ postData: data.id }));

            window.location.reload();
        }

        //Prevent page from refreshing on submit if it isn't valid
        event.preventDefault();
    };

    //If forgot password button is clicked
    const forgotClicked = event => {

        //Hide login page and show forgot password page
        document.getElementById("signIn").style = 'display: none';
        document.getElementById("forgotPassword").style = 'display: flex';
    };

    //How to set error Message
    const [forgotMessage, setFMessage] = useState('');

    //If forgot password form is submitted
    const handleForgot = event => {

        //If email is blank give error
        if(document.getElementById("forgotEmail").value === "") {
            setFMessage("Please enter your email");
            event.preventDefault();
        }
        //Other wise send email and load back login page
        else{
            /*Send code to email goes here*/
            document.getElementById("forgotPassword").style = 'display: none';
            document.getElementById("signIn").style = 'display: flex';
        }
    };

    //Pages
    return (
        <div className="wrapper">

            {/* Login/Register Page */}
            <div className="card" id="signIn"> 

                {/* Login/Register Page tabs */}
                <button className="tabButton" onClick={loginCard} style={isShown ? {backgroundColor:"#FFFFFF", color:"#41BBD9"} : {backgroundColor:"#41BBD9", color:"#FFFFFF"}}>LOGIN</button>
                <button className="tabButton" onClick={registerCard} style={isShown ? {backgroundColor:"#41BBD9", color:"#FFFFFF"} : {backgroundColor:"#FFFFFF", color:"#41BBD9"}}>REGISTER</button>
                
                {/* If Login tab is clicked */}
                {!isShown && (
                    <div className="innerCard">
                        <form className="loginForms" onSubmit={handleSubmit}>
                            <label>
                                EMAIL:
                                <br />
                                <input type="text" id="email" className="inputLogin"></input>
                            </label>
                            <br />
                            <label>
                                PASSWORD:
                                <br />
                                <input type="password" id="password" className="inputLogin"/>
                            </label>
                            <br></br>
                            <label className="loginError">{message}</label>
                            <br></br>
                            <input type="submit" value="LOGIN" className="loginButton"/>
                            <button onClick={forgotClicked} className="forgetButton">Forgot Password?</button>
                        </form>
                    </div>
                )}

                {/* If Register tab is clicked */}
                {isShown && (
                    <div className="innerCard">
                        <form className="loginForms" onSubmit={handleRegister}>
                            <label>
                                NAME:
                                <br />
                                <input type="text" id="rName" className="inputLogin"/>
                            </label>
                            <br />
                            <label>
                                EMAIL:
                                <br />
                                <input type="text" id="rEmail" className="inputLogin"/>
                            </label>
                            <br />
                            <label>
                                PASSWORD:
                                <br />
                                <input type="text" id="rPass" className="inputLogin"/>
                            </label>
                            <br />
                            <label>
                                RE-ENTER PASSWORD:
                                <br />
                                <input type="text" id="rRePass" className="inputLogin"/>
                            </label>
                            <br />
                            <label className="loginError">{registerMessage}</label>
                            <br />
                            <input type="submit" value="REGISTER" className="loginButton"/>
                        </form>
                    </div>
                )}
            </div>

            {/* Forgot Password Page */}
            <div className="card" id="forgotPassword"> 
                <h1 className="forgotHeader">FORGOT PASSWORD</h1>
                <label className="forgotDescription">We will send you an email with instructions on how to reset your password.</label>
                <div className="innerCard">
                    <form className="loginForms" onSubmit={handleForgot}>
                        <label>
                            EMAIL:
                            <br />
                            <input type="text" id="forgotEmail" className="inputLogin"></input>
                        </label>
                        <br />
                        <label className="loginError">{forgotMessage}</label>
                        <br />
                        <input type="submit" value="Email Me" className="loginButton"/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
