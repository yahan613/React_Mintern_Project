import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

export const handleGoogleSignup = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const db = getFirestore(app);
        const userRef = doc(db, "users", result.user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
            await setDoc(userRef, {
                email: result.user.email,
            });
            return {
                email: result.user.email,
                uid: result.user.uid,
            };
        }
        else {
            alert("使用者已經註冊過，請直接登入！");
            return false;
        }
    } catch (error) {
        alert("Google 註冊失敗：" + error.message);
        return false;
    }
};

export const handleGoogleLogin = async () => {
    const db = getFirestore(app);
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const { uid, email } = result.user;

        // 查詢 Firestore 的 users collection 是否已有此 uid
        const userDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            alert("尚未註冊！");
            await signOut(auth); // 登出
            return false;
        }
        return {
            email: email,
            uid: uid,
        };
    } catch (error) {
        alert("Google 登入失敗：" + error.message);
        return false;
    }
}

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();