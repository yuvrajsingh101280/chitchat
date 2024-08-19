import React, { useContext, useEffect } from "react";
import styles from "./ProfileUpdate.module.css";
import assets from "../../assets/assets";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import upload from "../../lib/Upload";
import { AppContext } from "../../context/AppContext";
const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [image, setimage] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const { setUserData } = useContext(AppContext);
  const profileUpdate = async (event) => {
    event.preventDefault();

    try {
      if (!prevImage && !image) {
        toast.error("Upload profile picture");
      }
      const docRef = doc(db, "users", uid);
      if (image) {
        const imgUrl = await upload(image);
        setPrevImage(imgUrl);
        await updateDoc(docRef, {
          avatar: imgUrl,
          bio: bio,
          name: name,
        });
      } else {
        await updateDoc(docRef, {
          bio: bio,
          name: name,
        });
      }

      const snap = await getDoc(docRef);
      setUserData(snap.data());
      navigate("/chat");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);

        const docRef = doc(db, "users", user.uid);
        const docSnap = getDoc(docRef);
        const userData = (await docSnap).data();
        if (userData.name) {
          setName(userData.name);
        }
        if (userData.bio) {
          setBio(userData.bio);
        }
        if (userData.avatar) {
          setPrevImage(userData.avatar);
        }
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.profilecontainer}>
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input
              onChange={(e) => setimage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png ,.jpg ,.jpeg"
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt=""
            />
            upload Progile image
          </label>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Your Name"
            required
            value={name}
          />
          <textarea
            onChange={(e) => {
              setBio(e.target.value);
            }}
            name=""
            placeholder="Write Profile bio"
            id=""
            value={bio}
          ></textarea>
          <button type="submit">Save</button>
        </form>
        <img
          className={styles.profilepic}
          src={
            image
              ? URL.createObjectURL(image)
              : prevImage
              ? prevImage
              : assets.logo
          }
          alt=""
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
