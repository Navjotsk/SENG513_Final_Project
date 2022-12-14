function ChatBox({ handleSetInput, handleSendMessage, messages, handleSetChatOpen }) {

  return (
    <div className="chatBox" > 
      <div className='display-box' onClick={() => handleSetChatOpen(false)}>
        {messages.map((object, i) => {
              return (
                object.me ? (
                  <div key={"message"+i} className='my-message'>{object.text}</div>
                ) : (
                  <div key={"message"+i}className='other-message'>{object.text}</div>
                )
              )
            })}
      </div>
    
      <div className="messageBox">
        <input id="text-field" onChange={(event) => {handleSetInput(event.target.value);}} />
        <button id="send-button" onClick={handleSendMessage}>S</button>
      </div>
    </div>
  );
}

export default ChatBox;
