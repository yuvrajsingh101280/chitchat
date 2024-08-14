import React from "react";
import styles from "./Login.module.css";
import assets from "../../assets/assets";
import { useState } from "react";
import { signup, login, emailverification } from "../../config/firebase";
import toast from "react-hot-toast";

const Login = () => {
  const [currState, setcurrState] = useState("sign up");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === "sign up") {
      signup(user.username, user.email, user.password);

      // setUser({ ...user, username: "", email: "", password: "" });
    } else {
      login(user.email, user.password);
    }
  };
  return (
    <div className={styles.login}>
      <img src={assets.logo} alt="" className={styles.logo} />

      <form onSubmit={onSubmitHandler} action="" className={styles.loginform}>
        <h2>{currState}</h2>
        {currState == "sign up" ? (
          <input
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            value={user.username}
            type="text"
            placeholder="username"
            required
            className={styles.forminput}
          />
        ) : null}

        <input
          type="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          value={user.email}
          placeholder="Enter Email Address"
          className={styles.forminput}
          required
        />
        <input
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          placeholder="Enter Password"
          className={styles.forminput}
          required
        />
        <button type="submit">{currState}</button>

        {currState == "sign up" ? (
          <div className={styles.loginterm}>
            <input type="checkbox" required />
            <p>Agree to the term of use & privacy policy</p>
          </div>
        ) : null}
        <div className={styles.loginforgot}>
          {currState == "sign up" ? (
            <p className={styles.logintoggle}>
              Already have an account{" "}
              <span onClick={() => setcurrState("Login")}> Login here</span>
            </p>
          ) : (
            <p className={styles.logintoggle}>
              Create an account
              <span onClick={() => setcurrState("sign up")}> click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
