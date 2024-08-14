import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
const firebaseConfig = {
    apiKey: "AIzaSyDxDCbIxIUvcE32O5uHdWYAv9nUQkO-k9w",
    authDomain: "chat-application-65329.firebaseapp.com",
    projectId: "chat-application-65329",
    storageBucket: "chat-application-65329.appspot.com",
    messagingSenderId: "824728713009",
    appId: "1:824728713009:web:2246eb3bccfc74f65fe210",
    measurementId: "G-XDQFWWEWNL"
};
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)
const signup = async (username, email, password) => {

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        // Whenever the user will signup these data will getstored in the database

        await setDoc(doc(db, "users", user.uid), {


            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: "",
            avatar: "",
            bio: "Hey, there is am using ChitChat",
            lastseen: Date.now()

        })

        await setDoc(doc(db, "chats", user.uid), {
            chatData: []


        })
    } catch (error) {
        console.log(error)
        toast.error(error.code)
    }


}


const login = async (email, password) => {


    try {
        await signInWithEmailAndPassword(auth, email, password)
        toast.success("logged in successfully")
    } catch (error) {
        console.log(error)
        toast.error(error.code)
    }

}


const logout = async () => {
    try {
        await signOut(auth);
        toast.success("Logged out successfully");
    } catch (error) {
        console.log(error);
        toast.error(error.code);  // Display error message
    }
};


export { signup, login, logout, db, auth, emailverification }




