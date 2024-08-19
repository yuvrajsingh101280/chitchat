import React, { useContext, useState } from "react";
import styles from "./LeftSideBar.module.css";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore"; // Update from getDoc to getDocs
import { db } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const { userData, chatData } = useContext(AppContext);
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
          let userExit = false;
          chatData.map((user) => {
            if (user.rId === querySnap.docs[0].data().id) {
              userExit = true;
            }
          });
          if (!userExit) {
            setUser(querySnap.docs[0].data());
          }
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

  const addChat = async () => {
    const messagesRef = collection(db, "messages");
    const chatRef = collection(db, "chats");

    try {
      const newMessageRef = doc(messagesRef);
      await setDoc(newMessageRef, {
        createAt: serverTimestamp(),
        messages: [],
      });
      await updateDoc(doc(chatRef, user.id), {
        chatData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: userData.id,
          updateAt: Date.now(),
          messageSeen: true,
        }),
      });

      await updateDoc(doc(chatRef, userData.id), {
        chatData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: user.id,
          updateAt: Date.now(),
          messageSeen: true,
        }),
      });
    } catch (error) {
      toast.error(error.message);
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
            <div
              onClick={addChat}
              className={`${styles.friends} ${styles.adduser}`}
            >
              <img src={user.avatar} alt="" />
              <div>
                <p>{user.name}</p>
                <span>{user.bio}</span>
              </div>
            </div>
          ) : (
            chatData.map((item, index) => (
              <div key={index} className={styles.friends}>
                <img src={item.userData.avatar} alt="" />
                <div>
                  <p>{item.userData.name}</p>
                  <span>{item.lastMessage}</span>
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
