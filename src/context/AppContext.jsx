import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useReducer, useRef } from "react";
import { useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null); // Initialize chatData as null

  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = { ...userSnap.data(), id: uid }; // Ensure 'id' is added to userData
        setUserData(userData);

        // Navigate based on user data
        if (userData.avatar && userData.name) {
          navigate("/chat");
        } else {
          navigate("/profile");
        }

        // Update last seen periodically (every 60 seconds)
        setInterval(async () => {
          if (auth.currentUser) {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userDocRef, { lastseen: Date.now() });
          }
        }, 60000);
      } else {
        console.error("User does not exist!");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  useEffect(() => {
    if (userData) {
      const chatRef = doc(db, "chats", userData.id);

      // Listen to real-time updates on chats
      const unSub = onSnapshot(chatRef, async (res) => {
        const chatItems = res.data().chatData || [];

        const tempData = [];

        for (const item of chatItems) {
          const userRef = doc(db, "users", item.rId); // Correct collection name to 'users'
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            tempData.push({ ...item, userData });
          } else {
            console.error(`User with rId ${item.rId} does not exist.`);
          }
        }

        // Sort the chat data based on updated time
        setChatData(tempData.sort((a, b) => b.updateAt - a.updateAt));
      });

      return () => {
        unSub(); // Clean up the listener on unmount
      };
    }
  }, [userData]);

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
