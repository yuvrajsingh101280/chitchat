import React from "react";
import styles from "./RightSideBar.module.css";
import assets from "../../assets/assets";
import { logout } from "../../config/firebase";
const RightSideBar = () => {
  
  return (
    <div className={styles.rs}>
      <div className={styles.rsprofile}>
        <img src={assets.profile_img} alt="" />
        <h3>
          Madan Lal <img src={assets.green_dot} className="dot" alt="" />
        </h3>
        <p>Hey, There I am Madan Lal using ChitChat</p>
      </div>
      <hr />

      <div className={styles.rsmedia}>
        <p>Media</p>

        <div>
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>
      </div>
      <button onClick={() => logout()}>LogOut</button>
    </div>
  );
};

export default RightSideBar;
