import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./config";

const storage = getStorage(app);

export const uploadAvatar = async (uid, file) => {
    console.log("Uploading avatar for user:", uid);
    if (!file) {
        console.error("No file provided for upload.");
        return null;
    } else {
        console.log("File to upload:", file.name);
    }

    // 取出 @ 前面的部分
    const username = uid.split('@')[0];
    console.log("Using username for file name:", username);

    const storageRef = ref(storage, `avatars/${username}.png`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log("File uploaded successfully, download URL:", downloadURL);

    return downloadURL;  // 建議回傳URL方便後續使用
};

export const Storage = getStorage(app);
