import { Route, Routes, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login/Login";
import Chat from "./pages/Chat/Chat.jsx";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import { auth } from "./config/firebase";
import { AppContext } from "./context/AppContext.jsx";
const App = () => {
  const navigate = useNavigate();
  const { loadUserData } = useContext(AppContext);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate("/chat");
        loadUserData(user.uid);
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<ProfileUpdate />} />
      </Routes>
    </>
  );
};

export default App;
