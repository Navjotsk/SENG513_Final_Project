import {useState} from 'react';
import './login.css';

function Login() {
    const [isShown, setIsShown] = useState(false);
    const loginCard = event => {
        setIsShown(false);
    };

    const registerCard = event => {
        setIsShown(true);
    };

    return (
        <div className="wrapper">
            <div className="card"> 
                <button className="tabButton" onClick={loginCard} style={isShown ? {backgroundColor:"#FFFFFF", color:"#41BBD9"} : {backgroundColor:"#41BBD9", color:"#FFFFFF"}}>LOGIN</button>
                <button className="tabButton" onClick={registerCard} style={isShown ? {backgroundColor:"#41BBD9", color:"#FFFFFF"} : {backgroundColor:"#FFFFFF", color:"#41BBD9"}}>REGISTER</button>
                {!isShown && (
                    <div className="innerCard">
                        <form>
                            <label>
                                EMAIL:
                                <br />
                                <input type="text" name="name" className="inputLogin"/>
                            </label>
                            <br />
                            <label>
                                PASSWORD:
                                <br />
                                <input type="text" name="name" className="inputLogin"/>
                            </label>
                            <br />
                            <input type="submit" value="LOGIN" className="loginButton"/>
                            <input type="submit" value="Forgot Password?" className="forgetButton"/>
                        </form>
                    </div>
                )}

                {isShown && (
                    <div className="innerCard">
                        <form>
                            <label>
                                EMAIL:
                                <br />
                                <input type="text" name="name" className="inputLogin"/>
                            </label>
                            <br />
                            <label>
                                PASSWORD:
                                <br />
                                <input type="text" name="name" className="inputLogin"/>
                            </label>
                            <br />
                            <label>
                                RE-ENTER PASSWORD:
                                <br />
                                <input type="text" name="name" className="inputLogin"/>
                            </label>
                            <br />
                            <input type="submit" value="REGISTER" className="loginButton"/>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
