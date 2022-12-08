function Main({ handleSetLocation }) {
    return(
        <div className="container">
            <div className="center">
                <h1 className="title-text">PLAY MAD LIBS, WITH A FRIEND!</h1>
                <div className="button-container">
                    <div className="fat-button" onClick={() => handleSetLocation('choose')}>PLAY A GUEST</div>
                    <div className="fat-button">LOGIN NOW</div>
                </div>
            </div>
        </div>
    )
}

export default Main;