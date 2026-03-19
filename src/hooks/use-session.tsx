"use client"

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react"
import { 
  auth,
  onAuthStateChanged,
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  signOut as firebaseSignOut,
  getUser,
  User as FirebaseUser,
  User
} from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  firebaseUser: FirebaseUser | null
  isAuthenticated: boolean
  isDemo: boolean
  isLoading: boolean
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>
  loginWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  enterDemo: () => void
  exitDemo: () => void
  refreshUser: (uid: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [isDemo, setIsDemo] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(async (uid: string) => {
    const userData = await getUser(uid)
    setUser(userData)
  }, [])

  // Check session on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setFirebaseUser(fbUser)
        const userData = await getUser(fbUser.uid)
        setUser(userData)
        setIsDemo(false)
      } else {
        setFirebaseUser(null)
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const loginWithGoogleHandler = async () => {
    setIsLoading(true)
    const result = await signInWithGoogle()
    setIsLoading(false)
    return result
  }

  const loginWithEmailHandler = async (email: string, password: string) => {
    setIsLoading(true)
    const result = await signInWithEmail(email, password)
    setIsLoading(false)
    return result
  }

  const signUpHandler = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    const result = await signUpWithEmail(email, password, name)
    setIsLoading(false)
    return result
  }

  const logout = async () => {
    await firebaseSignOut()
    setUser(null)
    setFirebaseUser(null)
    setIsDemo(false)
  }

  const enterDemo = () => {
    setIsDemo(true)
    setUser({
      uid: "demo-user",
      email: "demo@autopost.com",
      name: "Demo User",
      photoURL: null,
      telegram: {
        token: null,
        chat_id: null,
        connected: false
      },
      createdAt: new Date()
    })
  }

  const exitDemo = () => {
    setIsDemo(false)
    setUser(null)
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        isAuthenticated,
        isDemo,
        isLoading,
        loginWithGoogle: loginWithGoogleHandler,
        loginWithEmail: loginWithEmailHandler,
        signUp: signUpHandler,
        logout,
        enterDemo,
        exitDemo,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
