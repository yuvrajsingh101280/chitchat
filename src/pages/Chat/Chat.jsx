import React, { useContext, useState, useEffect } from "react";
import styles from "./Chat.module.css";
import LeftSideBar from "../../components/leftsidebar/LeftSideBar";
import Chatbox from "../../components/chatbox/Chatbox";
import RightSideBar from "../../components/rightsidebar/RightSideBar";
import { AppContext } from "../../context/AppContext";
const Chat = () => {
  const { chatData, userData } = useContext(AppContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (chatData && userData) {
      setLoading(false);
    }
  }, [chatData, userData]);

  return (
    <div className={styles.chat}>
      {loading ? (
        <p className={styles.loading}>Loading.........</p>
      ) : (
        <div className={styles.chatcontainer}>
          <LeftSideBar />
          <Chatbox />
          <RightSideBar />
        </div>
      )}
    </div>
  );
};

export default Chat;
