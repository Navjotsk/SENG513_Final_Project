import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ChatBox({ handleSetInput, handleSendMessage, messages }) {
   
  return (
    <div className="App"> 
      <TextField id="text-field" label="Outlined" variant="outlined"  size="small" onChange={(event) => {
          handleSetInput(event.target.value);
        }}  />
            
      <Button variant="contained" onClick={handleSendMessage}>Send Message</Button>
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
  );
}

export default ChatBox;
