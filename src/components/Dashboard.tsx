'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/hooks/use-session'
import { 
  Home, 
  Upload, 
  FileText, 
  Settings, 
  Send, 
  ImagePlus, 
  Sparkles,
  CheckCircle2,
  Clock,
  TrendingUp,
  Zap,
  Menu,
  X,
  Eye,
  Plus,
  Heart,
  Loader2,
  AlertCircle,
  LogOut,
  User,
  Link2,
  Trash2,
  RefreshCw,
  LucideIcon
} from 'lucide-react'
import { AutoPostIcon } from '@/components/AutoPostLogo'
import { Post, getUserPosts, createPost, updatePostStatus, deletePost } from '@/lib/firebase'

// Demo data
const DEMO_POSTS: Post[] = [
  {
    id: 'demo-1',
    userId: 'demo-user',
    title: 'Welcome to AutoPost!',
    caption: 'This is a demo post. Sign in to create real posts.',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    status: 'published',
    views: 1247,
    likes: 89,
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 3600000)
  },
  {
    id: 'demo-2',
    userId: 'demo-user',
    title: 'Publish Everywhere',
    caption: 'One click to publish to all your social platforms.',
    imageUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
    status: 'published',
    views: 892,
    likes: 67,
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000)
  }
]

interface SidebarContentProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onClose?: () => void
  user: { name?: string | null; email?: string | null; photoURL?: string | null } | null
  isDemo: boolean
  onLogout?: () => void
}

const menuItems: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'upload', label: 'Upload', icon: Upload },
  { id: 'posts', label: 'Posts', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
]

function SidebarContent({ activeTab, onTabChange, onClose, user, isDemo, onLogout }: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center gap-2 border-b border-border">
        <AutoPostIcon size={28} />
        <span className="font-bold text-lg text-foreground">AutoPost</span>
        {isDemo && (
          <Badge variant="outline" className="ml-auto text-[10px] bg-orange-500/10 text-orange-400 border-orange-500/30">
            Demo
          </Badge>
        )}
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onTabChange(item.id)
              onClose?.()
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
              activeTab === item.id
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-accent/50">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-semibold overflow-hidden">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
            ) : (
              user?.name?.[0]?.toUpperCase() || <User className="w-4 h-4" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email || (isDemo ? 'Demo Mode' : '')}</p>
          </div>
          {onLogout && (
            <button 
              onClick={onLogout}
              className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[1,2,3,4].map(i => (
          <Card key={i} className="bg-card border-border">
            <CardContent className="p-4">
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-6 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

function EmptyState({ icon: Icon, title, description, action }: { icon: LucideIcon; title: string; description: string; action?: { label: string; onClick: () => void } }) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-8 text-center">
        <Icon className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
        <p className="text-foreground font-medium mb-1">{title}</p>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        {action && (
          <Button size="sm" className="gradient-primary h-8" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

function Dashboard() {
  const { user, isAuthenticated, isDemo, isLoading: authLoading, loginWithGoogle, logout, enterDemo } = useAuth()
  const [activeTab, setActiveTab] = useState('home')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isPublishing, setIsPublishing] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [publishedPost, setPublishedPost] = useState<Post | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Settings state
  const [telegramToken, setTelegramToken] = useState('')
  const [telegramChatId, setTelegramChatId] = useState('')
  const [isSavingSettings, setIsSavingSettings] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [telegramConnected, setTelegramConnected] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load posts when user changes
  const loadPosts = useCallback(async () => {
    if (!user) {
      if (isDemo) {
        setPosts(DEMO_POSTS)
      } else {
        setPosts([])
      }
      return
    }
    
    if (isDemo) {
      setPosts(DEMO_POSTS)
      return
    }

    setIsLoadingPosts(true)
    try {
      const userPosts = await getUserPosts(user.uid)
      setPosts(userPosts)
    } catch (err) {
      console.error('Error loading posts:', err)
      setPosts([])
    } finally {
      setIsLoadingPosts(false)
    }
  }, [user, isDemo])

  // Load Telegram config
  const loadTelegramConfig = useCallback(async () => {
    if (!user || isDemo) {
      setTelegramConnected(false)
      setTelegramToken('')
      setTelegramChatId('')
      return
    }

    try {
      const res = await fetch(`/api/telegram?userId=${user.uid}`)
      const data = await res.json()
      if (data.config) {
        setTelegramToken(data.config.botToken || '')
        setTelegramChatId(data.config.chatId || '')
        setTelegramConnected(data.config.connected || false)
      }
    } catch (err) {
      console.error('Error loading Telegram config:', err)
    }
  }, [user, isDemo])

  useEffect(() => {
    loadPosts()
    loadTelegramConfig()
  }, [loadPosts, loadTelegramConfig])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePublish = async () => {
    if (!title) return
    setError(null)
    setIsPublishing(true)

    try {
      let imageUrl: string | null = null

      // Upload image if exists
      if (imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile)
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        const uploadData = await uploadRes.json()
        
        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.error || 'Failed to upload image')
        }
        
        imageUrl = uploadData.imageUrl
      }

      // Create post
      const createRes = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.uid || 'demo-user',
          title,
          caption: description,
          imageUrl
        })
      })
      const createData = await createRes.json()

      if (!createRes.ok || !createData.success) {
        throw new Error(createData.error || 'Failed to create post')
      }

      const newPost: Post = {
        id: createData.post.id,
        userId: user?.uid || 'demo-user',
        title,
        caption: description,
        imageUrl: imageUrl || imagePreview,
        status: 'pending',
        views: 0,
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      // Publish to Telegram if connected
      if (telegramConnected && telegramToken && telegramChatId && !isDemo) {
        try {
          const publishRes = await fetch('/api/telegram/publish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: user?.uid,
              postId: newPost.id,
              imageUrl: newPost.imageUrl,
              title: newPost.title,
              caption: newPost.caption,
              botToken: telegramToken,
              chatId: telegramChatId
            })
          })
          const publishData = await publishRes.json()
          
          if (publishData.success) {
            newPost.status = 'published'
          }
        } catch (pubErr) {
          console.error('Telegram publish error:', pubErr)
          newPost.status = 'failed'
        }
      } else if (isDemo) {
        // Simulate publishing in demo mode
        newPost.status = 'published'
      }

      setPosts(prev => [newPost, ...prev])
      setPublishedPost(newPost)
      setShowSuccess(true)
      
      // Reset form
      setTitle('')
      setDescription('')
      setImagePreview(null)
      setImageFile(null)
      
    } catch (err: any) {
      console.error('Publish error:', err)
      setError(err.message || 'Failed to publish post')
    } finally {
      setIsPublishing(false)
    }
  }

  const handleDeletePost = async (postId: string) => {
    try {
      await fetch(`/api/posts?postId=${postId}`, { method: 'DELETE' })
      setPosts(prev => prev.filter(p => p.id !== postId))
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  const handleTestTelegram = async () => {
    if (!telegramToken || !telegramChatId) return
    
    setIsTestingConnection(true)
    try {
      const res = await fetch('/api/telegram/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botToken: telegramToken,
          chatId: telegramChatId
        })
      })
      const data = await res.json()
      
      if (data.success) {
        setTelegramConnected(true)
        // Save config
        await fetch('/api/telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user?.uid,
            botToken: telegramToken,
            chatId: telegramChatId
          })
        })
        setError(null)
      } else {
        setError(data.error || 'Failed to connect')
      }
    } catch (err: any) {
      setError(err.message || 'Connection failed')
    } finally {
      setIsTestingConnection(false)
    }
  }

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500/90 text-white text-[10px] border-0"><CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />Published</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500/90 text-white text-[10px] border-0"><Clock className="w-2.5 h-2.5 mr-0.5" />Pending</Badge>
      case 'failed':
        return <Badge className="bg-red-500/90 text-white text-[10px] border-0"><AlertCircle className="w-2.5 h-2.5 mr-0.5" />Failed</Badge>
      default:
        return null
    }
  }

  // Stats calculation
  const stats = {
    totalPosts: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    views: posts.reduce((a, p) => a + (p.views || 0), 0),
    engagement: posts.length > 0 ? Math.round((posts.reduce((a, p) => a + (p.likes || 0), 0) / Math.max(posts.reduce((a, p) => a + (p.views || 0), 0), 1)) * 100) : 0
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/95 backdrop-blur-sm flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <button className="p-2 -ml-2 rounded-lg hover:bg-accent md:hidden">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <SidebarContent 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onClose={() => setSidebarOpen(false)}
                user={user}
                isDemo={isDemo}
                onLogout={isAuthenticated ? logout : undefined}
              />
            </SheetContent>
          </Sheet>
          <AutoPostIcon size={24} />
          <span className="font-semibold text-foreground hidden sm:inline">AutoPost</span>
        </div>
        <div className="flex items-center gap-2">
          {isDemo && (
            <Badge variant="outline" className="text-[10px] bg-orange-500/10 text-orange-400 border-orange-500/30">
              Demo Mode
            </Badge>
          )}
          {telegramConnected && (
            <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-400 border-green-500/30">
              <Send className="w-3 h-3 mr-1" />
              Telegram
            </Badge>
          )}
          {!isAuthenticated && !isDemo && (
            <Button size="sm" className="gradient-primary h-8 text-xs" onClick={enterDemo}>
              Try Demo
            </Button>
          )}
        </div>
      </header>

      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:w-56 md:border-r md:border-border md:bg-sidebar md:flex md:flex-col md:pt-14">
        <SidebarContent 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          user={user}
          isDemo={isDemo}
          onLogout={isAuthenticated ? logout : undefined}
        />
      </div>

      {/* Main Content */}
      <main className="md:pl-56 pb-safe">
        <div className="p-4 sm:p-6 max-w-5xl mx-auto pb-20 md:pb-6">
          {/* Error Alert */}
          {error && (
            <Card className="bg-red-500/10 border-red-500/30 mb-4">
              <CardContent className="p-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <p className="text-sm text-red-400">{error}</p>
                <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-300">
                  <X className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          )}

          {/* Home Tab */}
          {activeTab === 'home' && (
            authLoading ? <LoadingSkeleton /> :
            <div className="space-y-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: 'Total Posts', value: stats.totalPosts || '--', icon: FileText },
                  { label: 'Published', value: stats.published || '--', icon: CheckCircle2 },
                  { label: 'Views', value: stats.views || '--', icon: Eye },
                  { label: 'Engagement', value: `${stats.engagement}%`, icon: TrendingUp },
                ].map((stat, i) => (
                  <Card key={i} className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                          <p className="text-xl font-semibold text-foreground mt-0.5">{stat.value}</p>
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <stat.icon className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-card border-border">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button 
                      onClick={() => setActiveTab('upload')}
                      className="p-3 rounded-lg bg-primary/5 border border-primary/20 hover:border-primary/40 transition-colors text-left"
                    >
                      <Upload className="w-5 h-5 text-primary mb-1.5" />
                      <p className="text-sm font-medium text-foreground">New Post</p>
                    </button>
                    <button 
                      onClick={() => setActiveTab('posts')}
                      className="p-3 rounded-lg bg-accent/30 border border-border hover:border-primary/40 transition-colors text-left"
                    >
                      <FileText className="w-5 h-5 text-muted-foreground mb-1.5" />
                      <p className="text-sm font-medium text-foreground">View Posts</p>
                    </button>
                    <button 
                      onClick={() => setActiveTab('settings')}
                      className="p-3 rounded-lg bg-accent/30 border border-border hover:border-primary/40 transition-colors text-left"
                    >
                      <Settings className="w-5 h-5 text-muted-foreground mb-1.5" />
                      <p className="text-sm font-medium text-foreground">Settings</p>
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card className="bg-card border-border">
                <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Recent Posts</CardTitle>
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setActiveTab('posts')}>
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  {posts.length === 0 ? (
                    <div className="text-center py-4">
                      <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                      <p className="text-sm text-muted-foreground">No posts yet</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {posts.slice(0, 3).map(post => (
                        <div key={post.id} className="flex items-center gap-3 p-2 rounded-lg bg-accent/30">
                          {post.imageUrl ? (
                            <img src={post.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{post.title}</p>
                            <p className="text-xs text-muted-foreground">{formatTimeAgo(post.createdAt)}</p>
                          </div>
                          {getStatusBadge(post.status)}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              <div className="lg:col-span-3">
                <Card className="bg-card border-border">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Upload className="w-4 h-4 text-primary" />
                      Create Post
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-4">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative aspect-video rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
                        imagePreview 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {imagePreview ? (
                        <div className="absolute inset-0 rounded-lg overflow-hidden">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <Badge className="bg-primary text-xs">Image ready</Badge>
                            <Button 
                              variant="secondary" 
                              size="sm"
                              className="h-7 text-xs"
                              onClick={(e) => { e.stopPropagation(); setImagePreview(null); setImageFile(null) }}
                            >
                              <X className="w-3 h-3 mr-1" /> Remove
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <ImagePlus className="w-8 h-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload image</p>
                          <p className="text-xs text-muted-foreground/60 mt-1">JPEG, PNG, GIF, WebP (max 10MB)</p>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-foreground mb-1.5 block">Title *</label>
                        <Input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter title..."
                          className="h-10 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-foreground mb-1.5 block">Description</label>
                        <Textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Write description..."
                          className="min-h-20 text-sm resize-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-foreground mb-2 block">Platforms</label>
                      <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground">
                          <Send className="w-3 h-3 inline mr-1" />
                          Telegram
                          {telegramConnected && <CheckCircle2 className="w-3 h-3 inline ml-1" />}
                        </button>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-accent text-muted-foreground" disabled>
                          Twitter
                          <span className="ml-1 text-[10px] opacity-50">Soon</span>
                        </button>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-accent text-muted-foreground" disabled>
                          Instagram
                          <span className="ml-1 text-[10px] opacity-50">Soon</span>
                        </button>
                      </div>
                      {!telegramConnected && !isDemo && (
                        <p className="text-[10px] text-muted-foreground mt-2">
                          <Link2 className="w-3 h-3 inline mr-1" />
                          Connect Telegram in Settings to publish automatically
                        </p>
                      )}
                    </div>

                    <Button 
                      onClick={handlePublish}
                      disabled={!title || isPublishing}
                      className="w-full h-11 gradient-primary text-sm font-medium"
                    >
                      {isPublishing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Publish Now
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card className="bg-card border-border lg:sticky lg:top-20">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Send className="w-4 h-4 text-blue-400" />
                      Telegram Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="bg-[#17212b] rounded-xl overflow-hidden">
                      <div className="bg-[#242f3d] px-3 py-2 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                          <Send className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <p className="text-white text-xs font-medium">Your Channel</p>
                          <p className="text-gray-400 text-[10px]">{telegramConnected ? 'Connected' : 'Not connected'}</p>
                        </div>
                      </div>
                      <div className="p-3">
                        {imagePreview ? (
                          <img src={imagePreview} alt="" className="w-full rounded-lg aspect-video object-cover mb-2" />
                        ) : (
                          <div className="aspect-video bg-gray-700/30 rounded-lg flex items-center justify-center mb-2">
                            <ImagePlus className="w-8 h-8 text-gray-600" />
                          </div>
                        )}
                        <p className="text-white text-xs font-medium">{title || 'Title...'}</p>
                        <p className="text-gray-400 text-[10px] mt-0.5 line-clamp-2">{description || 'Description...'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            isLoadingPosts ? <LoadingSkeleton /> :
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Your Posts</h2>
                <Button size="sm" className="gradient-primary h-8" onClick={() => setActiveTab('upload')}>
                  <Plus className="w-4 h-4 mr-1" /> New
                </Button>
              </div>

              {posts.length === 0 ? (
                <EmptyState 
                  icon={FileText}
                  title="No posts yet"
                  description="Create your first post to get started"
                  action={{ label: 'Create Post', onClick: () => setActiveTab('upload') }}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {posts.map((post) => (
                    <Card key={post.id} className="bg-card border-border overflow-hidden group">
                      <div className="aspect-video relative overflow-hidden">
                        {post.imageUrl ? (
                          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-accent flex items-center justify-center">
                            <FileText className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute top-2 right-2">
                          {getStatusBadge(post.status)}
                        </div>
                        <p className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium truncate">{post.title}</p>
                        <button 
                          onClick={() => handleDeletePost(post.id)}
                          className="absolute top-2 left-2 p-1.5 rounded-lg bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <CardContent className="p-3">
                        <p className="text-muted-foreground text-xs line-clamp-2 mb-2">{post.caption || 'No description'}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" />{post.views}</span>
                            <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" />{post.likes}</span>
                          </div>
                          <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{formatTimeAgo(post.createdAt)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-xl space-y-4">
              {/* Telegram Connection */}
              <Card className="bg-card border-border">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Send className="w-4 h-4 text-blue-400" />
                    Telegram Connection
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-4">
                  {isDemo ? (
                    <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                      <p className="text-sm text-orange-400">
                        Demo mode: Connect your Telegram in a real account to publish posts.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="bot-token" className="text-xs">Bot Token</Label>
                        <Input
                          id="bot-token"
                          type="password"
                          value={telegramToken}
                          onChange={(e) => setTelegramToken(e.target.value)}
                          placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                          className="h-10 text-sm"
                        />
                        <p className="text-[10px] text-muted-foreground">
                          Get this from @BotFather on Telegram
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="chat-id" className="text-xs">Channel/Group ID</Label>
                        <Input
                          id="chat-id"
                          value={telegramChatId}
                          onChange={(e) => setTelegramChatId(e.target.value)}
                          placeholder="-1001234567890 or @channelname"
                          className="h-10 text-sm"
                        />
                        <p className="text-[10px] text-muted-foreground">
                          Use @userinfobot to get channel/group ID
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleTestTelegram}
                          disabled={!telegramToken || !telegramChatId || isTestingConnection}
                          className="flex-1 h-9 gradient-primary text-sm"
                        >
                          {isTestingConnection ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Testing...
                            </>
                          ) : (
                            <>
                              <Link2 className="w-4 h-4 mr-2" />
                              Test Connection
                            </>
                          )}
                        </Button>
                      </div>
                      {telegramConnected && (
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/30">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <p className="text-sm text-green-400">Telegram connected successfully!</p>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Account Info */}
              <Card className="bg-card border-border">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Account</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  {isAuthenticated ? (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold overflow-hidden">
                          {user?.photoURL ? (
                            <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                          ) : (
                            user?.name?.[0]?.toUpperCase() || 'U'
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{user?.name || 'User'}</p>
                          <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 text-xs" onClick={logout}>
                        <LogOut className="w-3 h-3 mr-1" /> Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Sign in to save your posts and settings</p>
                      <Button onClick={loginWithGoogle} className="w-full h-10 gradient-primary text-sm">
                        Sign in with Google
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border md:hidden pb-safe">
        <div className="flex items-center justify-around py-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                activeTab === item.id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Success Modal */}
      {showSuccess && publishedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="bg-card border-border w-full max-w-md overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-5 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-lg font-bold text-white">Published!</h2>
              <p className="text-white/80 text-sm">Your post has been created</p>
            </div>
            <CardContent className="p-4">
              <div className="rounded-lg overflow-hidden mb-3">
                {publishedPost.imageUrl ? (
                  <img src={publishedPost.imageUrl} alt="" className="w-full aspect-video object-cover" />
                ) : (
                  <div className="aspect-video bg-accent flex items-center justify-center">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <p className="font-medium text-sm">{publishedPost.title}</p>
              <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{publishedPost.caption || 'No description'}</p>
            </CardContent>
            <div className="p-4 pt-0 flex gap-2">
              <Button variant="outline" className="flex-1 h-9" onClick={() => setShowSuccess(false)}>Close</Button>
              <Button className="flex-1 h-9 gradient-primary" onClick={() => { setShowSuccess(false); setActiveTab('posts') }}>
                View Posts
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Dashboard
