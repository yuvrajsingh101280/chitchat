import React from "react";
import styles from "./LeftSideBar.module.css";
import assets from "../../assets/assets";
const LeftSideBar = () => {
  return (
    <div className={styles.ls}>
      <div className={styles.lstop}>
        <div className={styles.lsnav}>
          <div>
            <img src={assets.logo} className={styles.logo} alt="" />
            <h2>Chit Chat</h2>
          </div>
          <div className={styles.menu}>
            <img src={assets.menu_icon} alt="" />
            <div className={styles.submenu}>
              <p>Edit Profile</p>

              <p>Logout</p>
            </div>
          </div>
        </div>

        <div className={styles.lssearch}>
          <img src={assets.search_icon} alt="" />
          <input type="text" placeholder="Search here" />
        </div>

        <div className={styles.lslist}>
          {Array(12)
            .fill("")
            .map((item, index) => (
              <div key={index} className={styles.friends}>
                <img src={assets.profile_img} alt="" />
                <div>
                  <p>Madan Lal</p>
                  <span>Hello , kesa haa</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
