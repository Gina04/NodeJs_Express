const Notification = ({ message }) => {
    console.log("Notification message:", message); // Muestra el contenido exacto
    if (!message) {
      return null;
    }
  
    const className = message.type === "success" ? "success" : "error";
  
    return <div className={className}>{message.message}</div>;
  };
  
  export default Notification;
  
  