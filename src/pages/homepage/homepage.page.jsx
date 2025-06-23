import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Message from "../../components/ui/message/message";
import Directory from "../../components/directory/directory";

import "./homepage.style.scss";

function Homepage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setMessage({
        type: "success",
        message: `Welcome, ${currentUser.displayName || "User"}!`,
      });
    }
  }, [currentUser]);

  const closeMesage = () => {
    setMessage(null);
  };

  return (
    <>
      <div className="homepage">
        <Directory />

        {message && <Message type={message.type} message={message.message} onClose={closeMesage} />}
      </div>
    </>
  );
}

export default Homepage;
