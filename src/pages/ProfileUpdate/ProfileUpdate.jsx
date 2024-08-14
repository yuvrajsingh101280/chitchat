import React from "react";
import styles from "./ProfileUpdate.module.css";
import assets from "../../assets/assets";
import { useState } from "react";
const ProfileUpdate = () => {
  const [image, setimage] = useState(false);

  return (
    <div className={styles.profile}>
      <div className={styles.profilecontainer}>
        <form>
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
          <input type="text" placeholder="Your Name" required />
          <textarea name="" placeholder="Write Profile bio" id=""></textarea>
          <button type="submit">Save</button>
        </form>
        <img
          className={styles.profilepic}
          src={image ? URL.createObjectURL(image) : assets.logo}
          alt=""
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
