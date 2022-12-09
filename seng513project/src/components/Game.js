function Game() {
    let temp = ["Today I went to my favorite Taco Stand called the ",
                " ",
                ". Unlike most food stands, they cook and prepare the food in a ",
                " while you ",
                ". The best thing on the menu is the ",
                " ",
                ". Instead of ground beef they fill the taco with ",
                ", cheese, and top it off with a salsa made from ",
                ". If that doesn't make your mouth water, then it' just like ",
                " always says: ",
                "!"]
                
    let type = ["adjective", "noun", "vehicle", "verb", "colour", "noun", "food", "food", "person", "saying"]

    return(
        <div className="container">
            <div className="game-container">
                <h1 className="story-title">TACOS? TACOS!</h1>
                <div className="text-container">
                    <form action="">
                        {type.map((value, index) => {
                            return <span>{temp[index]}<input type="text" placeholder={value}/></span>
                        })}
                        <span>{temp[temp.length-1]}</span>
                    </form>
                </div>
                <div className="small-button">FINISH</div>
            </div>
        </div>
    )
}

export default Game;