function Game({ handleTypeGame, isReady, isFinish, handleFinishGame, handleFinishMain, isOtherFinish, madLib }) {
    let title = madLib.type;
    let story = madLib.story_sentence;
    let fill = madLib.fill_word;
    
    return(
        <div className="container">
            <div className="game-container">
                <h1 className="story-title">{title}</h1>
                <div className="text-container">
                    {isReady ? (
                    <form action="">
                        {fill.map((value, index) => {
                            return <span id={"story"+index} key={"string"+index}>{story[index]}<input id={index} type="text" placeholder={value} onChange={(e) => handleTypeGame({id: index, content: e.target.value})}/></span>
                        })}
                        <span key="stringlast">{story[story.length-1]}</span>
                    </form>
                    ) : (
                        <p>Waiting for 2nd player...</p>
                    )}
                </div>
                {!isReady ? (
                    <div className="small-button">WAITING...</div>
                ) : (isFinish && isOtherFinish) ? (
                    <div className="small-button" onClick={() => handleFinishMain()}>RETURN TO MAIN</div>
                ) : isFinish ? (
                    <div className="small-button">WAITING...</div>
                ) : (
                    <div className="small-button" onClick={() => handleFinishGame()}>FINISH</div>
                )}
            </div>
        </div>
    )
}

export default Game;