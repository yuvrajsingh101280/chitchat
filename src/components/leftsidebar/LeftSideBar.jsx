import React, { useContext, useState } from "react";
import styles from "./LeftSideBar.module.css";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore"; // Update from getDoc to getDocs
import { db } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", input.toLowerCase())); // Corrected the typo here

        const querySnap = await getDocs(q); // Use getDocs to fetch multiple docs

        if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
          setUser(querySnap.docs[0].data());
        } else {
          setUser(null);
        }
      } else {
        setShowSearch(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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
              <p onClick={() => navigate("/profile")}>Edit Profile</p>

              <p>Logout</p>
            </div>
          </div>
        </div>

        <div className={styles.lssearch}>
          <img src={assets.search_icon} alt="" />
          <input
            onChange={inputHandler}
            type="text"
            placeholder="Search here"
          />
        </div>

        <div className={styles.lslist}>
          {showSearch && user ? (
            <div className={`${styles.friends} ${styles.adduser}`}>
              <img src={user.avatar} alt="" />
              <p>{user.name}</p>
            </div>
          ) : (
            Array(12)
              .fill("")
              .map((item, index) => (
                <div key={index} className={styles.friends}>
                  <img src={assets.profile_img} alt="" />
                  <div>
                    <p>Madan Lal</p>
                    <span>Hello , kesa haa</span>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
