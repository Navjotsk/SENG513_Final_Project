function Navbar({ handleSetLocation }) {
    return(
        <div className="bar" style={{left: '0'}}>
            <div className="block">
                <p className="large-text" onClick={() => handleSetLocation('main')}>GAMETITLE</p>
            </div>
            <div className="block" style={{right: '0'}}>
                <p className="large-text" onClick={() => handleSetLocation('login')}>LOGIN</p>
            </div>
        </div>
    )
}

export default Navbar;