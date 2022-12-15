// component for closed chatbox
function ClosedChat({ handleSetChatOpen }) {
    return(
        <div className="closed-chat" onClick={() => handleSetChatOpen(true)}><span>CHAT</span></div>
    )
}

export default ClosedChat;