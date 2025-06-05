import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "@/firebase/config";

export const fetchAvatarUrl = async (userMail) => {
  if (!userMail) return '/default-avatar.png';
  const safeEmail = userMail.split('@')[0];
  const storage = getStorage(app);
  const imgRef = ref(storage, `avatars/${safeEmail}.png`);
  try {
    return await getDownloadURL(imgRef);
  } catch {
    return '/default-avatar.png';
  }
}


