// src/App.jsx
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onSnapshot } from "firebase/firestore";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.slice";
import "./App.css";

import Header from "./components/layout/header/header";
import Homepage from "./pages/homepage/homepage.page";
import ShopPage from "./pages/shoppage/shoppage.page";
import SignInPage from "./pages/signInPage/signin-page";
import SignUpPage from "./pages/signUpPage/signup-page";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        try {
          const userRef = await createUserProfileDocument(userAuth);
          if (userRef) {
            const unsubscribeFromSnapshot = onSnapshot(userRef, (snapshot) => {
              const userData = { id: snapshot.id, ...snapshot.data() };

              dispatch(setCurrentUser(userData));
            });

            return () => unsubscribeFromSnapshot();
          }
        } catch (error) {
          console.error("Error creating user profile:", error.message);
        }
      } else {
        dispatch(setCurrentUser(null));
      }
    });

    return () => unsubscribeFromAuth();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/signin" element={currentUser ? <Navigate to="/" /> : <SignInPage />} />
        <Route path="/signup" element={currentUser ? <Navigate to="/" /> : <SignUpPage />} />
      </Routes>
    </>
  );
};

export default App;
