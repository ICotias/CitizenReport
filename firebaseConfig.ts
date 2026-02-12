import { getApps, getApp, initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    appId: "citizenreport-9dabe",
    measurementId: "G-73WZZHZE9Z",
    messagingSenderId: "79729364318",
    projectId: "citizenreport-9dabe",
    apiKey: "AIzaSyBAvoDLwIQIXDlyO8yZn2HInJZTkveqOVc",
    authDomain: "citizenreport-9dabe.firebaseapp.com",
    storageBucket: "citizenreport-9dabe.firebasestorage.app",
    databaseURL: "https://citizenreport-9dabe-default-rtdb.firebaseio.com",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
