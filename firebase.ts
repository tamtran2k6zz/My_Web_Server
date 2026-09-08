import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMayk2Gj6-UwslBOb-byGo8Pv_yHugWgE",
  authDomain: "login-kinh-te-mac.firebaseapp.com",
  projectId: "login-kinh-te-mac",
  storageBucket: "login-kinh-te-mac.firebasestorage.app",
  messagingSenderId: "118965171740",
  appId: "1:118965171740:web:1ccb35451b5bfbbbec11d9",
  measurementId: "G-DLWPC4Y8ER"
};

export let app: any;
export let auth: any;
export let googleProvider: any;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  // Suggest & prioritize ICTU domain and force account selection
  googleProvider.setCustomParameters({
    hd: 'ictu.edu.vn',
    prompt: 'select_account'
  });
} catch (error) {
  console.warn("Firebase config is invalid. Please update firebaseConfig in firebase.ts");
}

export const isValidIctuEmail = (email?: string | null): boolean => {
  if (!email) return false;
  return email.toLowerCase().trim().endsWith('@ictu.edu.vn');
};

export const loginWithGoogle = async (): Promise<{ user: any; error?: string }> => {
  if (!auth) {
    return {
      user: null,
      error: "Chưa cấu hình Firebase! Vui lòng cập nhật firebaseConfig trong file firebase.ts"
    };
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const email = (user.email || '').toLowerCase().trim();

    if (!isValidIctuEmail(email)) {
      await signOut(auth);
      return {
        user: null,
        error: `Tài khoản (${user.email || 'không xác định'}) không hợp lệ. Hệ thống chỉ cho phép tài khoản sinh viên/cán bộ có đuôi @ictu.edu.vn.`
      };
    }

    return { user };
  } catch (error: any) {
    console.error("Login failed", error);
    if (error.code === 'auth/popup-closed-by-user') {
      return { user: null };
    }
    if (error.code === 'auth/unauthorized-domain') {
      return {
        user: null,
        error: `Tên miền hiện tại (${window.location.hostname}) chưa được thêm vào Authorized Domains trong Firebase Console.`
      };
    }
    return {
      user: null,
      error: error.message || "Đăng nhập thất bại. Vui lòng thử lại."
    };
  }
};

export const logout = async () => {
  if (!auth) return;
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed", error);
  }
};
