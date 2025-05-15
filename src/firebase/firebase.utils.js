import { initializeApp } from "firebase/app";
import { doc, getDoc, setDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBb-tNwbJxzkhXUUB0tTJAfoftz0pFyOH0",
  authDomain: "shopmore-38f7f.firebaseapp.com",
  projectId: "shopmore-38f7f",
  storageBucket: "shopmore-38f7f.firebasestorage.app",
  messagingSenderId: "53287929429",
  appId: "1:53287929429:web:283fc34444345539af36dc",
  measurementId: "G-G8M9SKP5QW",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, "users", userAuth.uid);

  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = serverTimestamp();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user profile", error);
    }
  }

  return userRef;
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);
