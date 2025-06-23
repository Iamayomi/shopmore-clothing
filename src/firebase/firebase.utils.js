import { initializeApp } from "firebase/app";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwuMJdXS1NawJGOrmAhj9A0q427KtkIDQ",
  authDomain: "shopmore-clothings.firebaseapp.com",
  projectId: "shopmore-clothings",
  storageBucket: "shopmore-clothings.firebasestorage.app",
  messagingSenderId: "40512861684",
  appId: "1:40512861684:web:e536970814092f1e6635a1",
  measurementId: "G-ZWVJP7TF8L",
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, "users", userAuth.uid);

  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date().toISOString();

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
