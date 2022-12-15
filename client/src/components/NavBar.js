// component for the navigation bar
function Navbar({ handleSetLocation, handleSetLoggedIn, isLoggedIn }) {

    // handle when logout button is clicked
    const handleLogout = event => {
        handleSetLocation('login');
        handleSetLoggedIn(false);
    };

    // handle when the profile button is clicked
    const handleProfile = event => {
        handleSetLocation('userPage');
    };

    return(
        <div className="bar" style={{left: '0'}}>
            <div className="block">
                <p className="large-text" onClick={() => handleSetLocation('main')}>MADGAME</p>
            </div>
            {isLoggedIn ? (
                <div>
                    <div className="block" id="profileBar" style={{right: '0'}}>
                        <p className="large-text" onClick={handleProfile}>PROFILE</p>
                    </div>
                    <div className="block" id="logoutBar" style={{right: '200px'}}>
                        <p className="large-text" onClick={handleLogout}>LOGOUT</p>
                    </div>  
                </div>) : (
                    <div className="block" id="loginBar" style={{right: '0'}}>
                        <p className="large-text" onClick={() => handleSetLocation('login')}>LOGIN</p>
                    </div>
                )}
        </div>
    )
}

export default Navbar;