import React from "react";
import styles from "./Chat.module.css";
import LeftSideBar from "../../components/leftsidebar/LeftSideBar";
import Chatbox from "../../components/chatbox/Chatbox";
import RightSideBar from "../../components/rightsidebar/RightSideBar";
const Chat = () => {
  return (
    <div className={styles.chat}>
      <div className={styles.chatcontainer}>
        <LeftSideBar />
        <Chatbox />
        <RightSideBar />
      </div>
    </div>
  );
};

export default Chat;
