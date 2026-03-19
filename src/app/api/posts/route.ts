import { NextRequest, NextResponse } from "next/server"
import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  updateDoc,
  query, 
  where, 
  orderBy,
  serverTimestamp,
  getDoc,
  setDoc
} from "firebase/firestore"
import { db as firestore } from "@/lib/firebase"

// GET /api/posts - Get all posts for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    
    if (!userId) {
      return NextResponse.json({ posts: [] })
    }

    const postsRef = collection(firestore, "posts")
    const q = query(postsRef, where("userId", "==", userId), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    
    const posts: any[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      posts.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString()
      })
    })

    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, title, caption, imageUrl } = body

    if (!userId || !title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const postsRef = collection(firestore, "posts")
    const docRef = await addDoc(postsRef, {
      userId,
      title,
      caption: caption || null,
      imageUrl: imageUrl || null,
      status: "pending",
      views: 0,
      likes: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })

    return NextResponse.json({ 
      success: true,
      post: {
        id: docRef.id,
        userId,
        title,
        caption,
        imageUrl,
        status: "pending"
      }
    })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}

// DELETE /api/posts - Delete a post
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get("postId")

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
    }

    const postRef = doc(firestore, "posts", postId)
    await deleteDoc(postRef)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}

// PATCH /api/posts - Update a post
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { postId, ...updates } = body

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
    }

    const postRef = doc(firestore, "posts", postId)
    await updateDoc(postRef, {
      ...updates,
      updatedAt: serverTimestamp()
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}
