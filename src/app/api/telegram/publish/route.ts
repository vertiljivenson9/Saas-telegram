import { NextRequest, NextResponse } from "next/server"
import { doc, updateDoc, serverTimestamp } from "firebase/firestore"
import { db as firestore } from "@/lib/firebase"

// POST /api/telegram/publish - Publish a post to Telegram
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, postId, imageUrl, title, caption, botToken, chatId } = body

    if (!userId || !postId || !botToken || !chatId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Build caption
    const fullCaption = title + (caption ? `\n\n${caption}` : "")

    try {
      let result

      if (imageUrl) {
        // Send photo with caption
        const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`
        const response = await fetch(telegramApiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            photo: imageUrl,
            caption: fullCaption,
            parse_mode: "HTML",
          }),
        })
        result = await response.json()
      } else {
        // Send text message only
        const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
        const response = await fetch(telegramApiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: fullCaption,
            parse_mode: "HTML",
          }),
        })
        result = await response.json()
      }

      if (!result.ok) {
        console.error("Telegram API error:", result)
        // Update post status to failed
        try {
          const postRef = doc(firestore, "posts", postId)
          await updateDoc(postRef, {
            status: "failed",
            updatedAt: serverTimestamp()
          })
        } catch (e) {
          console.error("Failed to update post status:", e)
        }
        
        return NextResponse.json({ 
          error: result.description || "Failed to publish to Telegram" 
        }, { status: 400 })
      }

      // Update post status to published
      try {
        const postRef = doc(firestore, "posts", postId)
        await updateDoc(postRef, {
          status: "published",
          telegramMsgId: result.result?.message_id?.toString(),
          updatedAt: serverTimestamp()
        })
      } catch (e) {
        console.error("Failed to update post status:", e)
      }

      return NextResponse.json({ 
        success: true, 
        telegramResult: result.result 
      })
    } catch (telegramError) {
      console.error("Telegram API error:", telegramError)
      return NextResponse.json({ 
        error: "Failed to connect to Telegram" 
      }, { status: 500 })
    }
  } catch (error) {
    console.error("Error publishing to Telegram:", error)
    return NextResponse.json({ error: "Failed to publish" }, { status: 500 })
  }
}
