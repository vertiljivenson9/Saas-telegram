import { NextRequest, NextResponse } from "next/server"
import { doc, getDoc } from "firebase/firestore"
import { db as firestore } from "@/lib/firebase"

// GET /api/telegram - Get Telegram config for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    
    if (!userId) {
      return NextResponse.json({ config: null })
    }

    const userRef = doc(firestore, "users", userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      const data = userSnap.data()
      return NextResponse.json({ 
        config: {
          botToken: data.telegram?.token || null,
          chatId: data.telegram?.chat_id || null,
          connected: data.telegram?.connected || false
        }
      })
    }

    return NextResponse.json({ config: null })
  } catch (error) {
    console.error("Error fetching Telegram config:", error)
    return NextResponse.json({ error: "Failed to fetch Telegram config" }, { status: 500 })
  }
}
