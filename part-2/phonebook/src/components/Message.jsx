const Message = ({ message }) => {
  if (message === null) {
    return;
  }

  return (
    <div className="msg">
      <h2>{message}</h2>
    </div>
  );
};

export default Message;
