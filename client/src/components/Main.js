function Main({ handleSetLocation, isLoggedIn }) {
    
    return(
        <div className="container">
            <div className="center">
                <h1 className="title-text">PLAY MAD LIBS, WITH A FRIEND!</h1>
                <div className="button-container">
                    {isLoggedIn ? (
                            <div className="fat-button" onClick={() => handleSetLocation('choose')}>MATCH RANDOM</div>
                        ) : (
                            <div className="fat-button" onClick={() => handleSetLocation('choose')}>PLAY A GUEST</div>
                        )
                    }
                    {!isLoggedIn && <div className="fat-button" onClick={() => handleSetLocation('login')}>LOGIN NOW</div>}
                </div>
            </div>
        </div>
    )
}

export default Main;