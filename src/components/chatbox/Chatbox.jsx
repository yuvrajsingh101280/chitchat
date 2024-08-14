import React from "react";
import styles from "./Chatbox.module.css";
import assets from "../../assets/assets";
const Chatbox = () => {
  return (
    <div className={styles.chatbox}>
      <div className={styles.chatuser}>
        <img src={assets.profile_img} alt="" />
        <p>
          Madan Lal <img className="dot" src={assets.green_dot} alt="" />
        </p>
        <img src={assets.help_icon} alt="" className={styles.help} />
      </div>

      <div className={styles.chatmsg}>
        <div className={styles.smsg}>
          <p className={styles.msg}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30 pm</p>
          </div>
        </div>
        <div className={styles.smsg}>
          <a href={assets.pic1} download>
            <img className={styles.msgimage} src={assets.pic1} alt="" />
          </a>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30 pm</p>
          </div>
        </div>
        <div className={styles.rmsg}>
          <p className={styles.msg}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30 pm</p>
          </div>
        </div>
      </div>

      <div className={styles.chatinput}>
        <input type="text" placeholder="Send a message" />
        <input
          type="file"
          id="media"
          accept="image/png , image/jpeg,video/mp4, video/avi, video/mkv"
          hidden
        />
        <label htmlFor="media">
          <img src={assets.galler_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" />
      </div>
    </div>
  );
};

export default Chatbox;
