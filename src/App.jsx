import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onSnapshot } from "firebase/firestore";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import "./App.css";

import Homepage from "./pages/homepage/homepage.page";
import ShopPage from "./pages/shoppage/shoppage.page";
import Header from "./components/layout/header/header";
import SignInPage from "./pages/signInPage/signin-page";
import SignUpPage from "./pages/signUpPage/signup-page";
import { setCurrentUser } from "./redux/user/user.slice";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot(userRef, (snapshot) => {
          setCurrentUser({
            currentUser: { id: snapshot.id, ...snapshot.data() },
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/signin" element={currentUser ? <Navigate to="/" replace /> : <SignInPage />} />
        <Route path="/signup" element={currentUser ? <Navigate to="/" replace /> : <SignUpPage />} />
      </Routes>
    </>
  );
};

export default App;
