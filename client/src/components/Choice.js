function Choice({ handleSetLocation, handleJoinGame }) {

    const handleJoin = (data) => {
        handleJoinGame(data);
        handleSetLocation('game');
    };

    return(
        <div className="container">
            <div className="center">
                <h1 className="title-text">CHOOSE YOUR TOPIC:</h1>
                <div className="button-container">
                    <div className="fat-button" onClick={() => handleJoin('food')}>FOOD</div>
                    <div className="fat-button" onClick={() => handleJoin('sport')}>SPORT</div>
                    <div className="fat-button" onClick={() => handleJoin('school')}>SCHOOL</div>
                    <div className="fat-button" onClick={() => handleJoin('anime')}>ANIME</div>
                    <div className="fat-button" onClick={() => handleJoin('games')}>GAMES</div>
                    <div className="fat-button" onClick={() => handleJoin('fantasy')}>FANTASY</div>
                </div>
            </div>
        </div>
    )
}

export default Choice;