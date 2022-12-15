// component for the chatbox
function ChatBox({ handleSetInput, handleSendMessage, messages, handleSetChatOpen }) {

  return (
    <div className="chatBox" > 
      <div className='display-box' onClick={() => handleSetChatOpen(false)}>
        {/* display the messages in the chatbox */}
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
      
      {/* display the input textfield and the send button */}
      <div className="messageBox">
        <input id="text-field" onChange={(event) => {handleSetInput(event.target.value);}} />
        <button id="send-button" onClick={handleSendMessage}>S</button>
      </div>
    </div>
  );
}

export default ChatBox;
