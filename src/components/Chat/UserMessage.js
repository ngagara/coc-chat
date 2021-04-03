import './Chat.css';

function UserMessage({ text, time }) {

  return (
    <div className="chat__message-container chat__message-container_user">
     <div className="chat__message chat__message_user">
       <p className="chat__message-text chat__message-text_user">{text}</p>
     </div>
     <p className="chat__message-time">{time}</p>
    </div>
  );
}

export default UserMessage;