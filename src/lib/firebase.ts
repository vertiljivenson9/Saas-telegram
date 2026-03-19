import { initializeApp, FirebaseApp } from "firebase/app"
import { 
  getAuth, 
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth"
import { 
  getFirestore, 
  Firestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp
} from "firebase/firestore"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIAbGS5saZiSxDW7eajGVO-ba-jGf2vgA",
  authDomain: "saastelegram-459f9.firebaseapp.com",
  projectId: "saastelegram-459f9",
  storageBucket: "saastelegram-459f9.firebasestorage.app",
  messagingSenderId: "233577063334",
  appId: "1:233577063334:web:040375149b867eef0d6567",
  measurementId: "G-PCKSYH9JJ3"
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig)
export const auth: Auth = getAuth(app)
export const db: Firestore = getFirestore(app)

// Google Auth Provider
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: "select_account"
})

// Types
export interface User {
  uid: string
  email: string | null
  name: string | null
  photoURL: string | null
  telegram?: {
    token: string | null
    chat_id: string | null
    connected: boolean
  }
  createdAt: Date
}

export interface Post {
  id: string
  userId: string
  imageUrl: string | null
  caption: string | null
  title: string
  status: "pending" | "published" | "failed"
  views: number
  likes: number
  telegramMsgId?: string
  createdAt: Date
  updatedAt: Date
}

// Auth Functions
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user
    
    // Create or update user document in Firestore
    const userRef = doc(db, "users", user.uid)
    const userSnap = await getDoc(userRef)
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        telegram: {
          token: null,
          chat_id: null,
          connected: false
        },
        createdAt: serverTimestamp()
      })
    }
    
    return { success: true, user }
  } catch (error: any) {
    console.error("Google sign-in error:", error)
    return { success: false, error: error.message }
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: result.user }
  } catch (error: any) {
    console.error("Email sign-in error:", error)
    return { success: false, error: error.message }
  }
}

export async function signUpWithEmail(email: string, password: string, name: string) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const user = result.user
    
    // Create user document in Firestore
    const userRef = doc(db, "users", user.uid)
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      name: name,
      photoURL: null,
      telegram: {
        token: null,
        chat_id: null,
        connected: false
      },
      createdAt: serverTimestamp()
    })
    
    return { success: true, user }
  } catch (error: any) {
    console.error("Email sign-up error:", error)
    return { success: false, error: error.message }
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth)
    return { success: true }
  } catch (error: any) {
    console.error("Sign-out error:", error)
    return { success: false, error: error.message }
  }
}

// User Functions
export async function getUser(uid: string): Promise<User | null> {
  try {
    const userRef = doc(db, "users", uid)
    const userSnap = await getDoc(userRef)
    
    if (userSnap.exists()) {
      const data = userSnap.data()
      return {
        uid: data.uid,
        email: data.email,
        name: data.name,
        photoURL: data.photoURL,
        telegram: data.telegram,
        createdAt: data.createdAt?.toDate() || new Date()
      }
    }
    return null
  } catch (error) {
    console.error("Error getting user:", error)
    return null
  }
}

// Post Functions
export async function createPost(userId: string, title: string, caption: string | null, imageUrl: string | null) {
  try {
    const postsRef = collection(db, "posts")
    const docRef = await addDoc(postsRef, {
      userId,
      title,
      caption,
      imageUrl,
      status: "pending",
      views: 0,
      likes: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    
    return { success: true, postId: docRef.id }
  } catch (error: any) {
    console.error("Error creating post:", error)
    return { success: false, error: error.message }
  }
}

export async function getUserPosts(userId: string): Promise<Post[]> {
  try {
    const postsRef = collection(db, "posts")
    const q = query(postsRef, where("userId", "==", userId), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    
    const posts: Post[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      posts.push({
        id: doc.id,
        userId: data.userId,
        title: data.title,
        caption: data.caption,
        imageUrl: data.imageUrl,
        status: data.status,
        views: data.views || 0,
        likes: data.likes || 0,
        telegramMsgId: data.telegramMsgId,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      })
    })
    
    return posts
  } catch (error) {
    console.error("Error getting posts:", error)
    return []
  }
}

export async function updatePostStatus(postId: string, status: string, telegramMsgId?: string) {
  try {
    const postRef = doc(db, "posts", postId)
    await updateDoc(postRef, {
      status,
      ...(telegramMsgId && { telegramMsgId }),
      updatedAt: serverTimestamp()
    })
    return { success: true }
  } catch (error: any) {
    console.error("Error updating post:", error)
    return { success: false, error: error.message }
  }
}

export async function deletePost(postId: string) {
  try {
    const postRef = doc(db, "posts", postId)
    await deleteDoc(postRef)
    return { success: true }
  } catch (error: any) {
    console.error("Error deleting post:", error)
    return { success: false, error: error.message }
  }
}

// Telegram Config Functions
export async function updateTelegramConfig(userId: string, token: string, chatId: string) {
  try {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, {
      telegram: {
        token,
        chat_id: chatId,
        connected: true
      }
    })
    return { success: true }
  } catch (error: any) {
    console.error("Error updating Telegram config:", error)
    return { success: false, error: error.message }
  }
}

export async function disconnectTelegram(userId: string) {
  try {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, {
      telegram: {
        token: null,
        chat_id: null,
        connected: false
      }
    })
    return { success: true }
  } catch (error: any) {
    console.error("Error disconnecting Telegram:", error)
    return { success: false, error: error.message }
  }
}

export { onAuthStateChanged }
export type { FirebaseUser }
