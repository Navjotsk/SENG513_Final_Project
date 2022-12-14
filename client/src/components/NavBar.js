function Navbar({ handleSetLocation }) {

    const handleLogout = event => {
        handleSetLocation('login');
        window.parent.document.getElementById('loginBar').style.display = "block";
        window.parent.document.getElementById('logoutBar').style.display = "none";
        window.parent.document.getElementById('profileBar').style.display = "none";
    };

    const handleProfile = event => {
        handleSetLocation('userPage');
    };

    return(
        <div className="bar" style={{left: '0'}}>
            <div className="block">
                <p className="large-text" onClick={() => handleSetLocation('main')}>MADGAME</p>
            </div>
            <div className="block" id="profileBar" style={{right: '0', display:'none'}}>
                <p className="large-text" onClick={handleProfile}>PROFILE</p>
            </div>
            <div className="block" id="logoutBar" style={{right: '200px',display:'none'}}>
                <p className="large-text" onClick={handleLogout}>LOGOUT</p>
            </div>
            <div className="block" id="loginBar" style={{right: '0'}}>
                <p className="large-text" onClick={() => handleSetLocation('login')}>LOGIN</p>
            </div>
        </div>
    )
}

export default Navbar;