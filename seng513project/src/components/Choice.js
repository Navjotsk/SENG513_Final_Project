function Choice({ handleSetLocation }) {
    return(
        <div className="container">
            <div className="center">
                <h1 className="title-text">CHOOSE YOUR TOPIC:</h1>
                <div className="button-container">
                    <div className="fat-button" onClick={() => handleSetLocation('game')}>FOOD</div>
                    <div className="fat-button" onClick={() => handleSetLocation('game')}>SPORT</div>
                    <div className="fat-button" onClick={() => handleSetLocation('game')}>SCHOOL</div>
                    <div className="fat-button" onClick={() => handleSetLocation('game')}>ANIME</div>
                    <div className="fat-button" onClick={() => handleSetLocation('game')}>GAMES</div>
                    <div className="fat-button" onClick={() => handleSetLocation('game')}>FANTASY</div>
                </div>
            </div>
        </div>
    )
}

export default Choice;