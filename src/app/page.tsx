'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-session'
import Dashboard from '@/components/Dashboard'
import { 
  Send, 
  Zap, 
  Globe, 
  Shield, 
  ArrowRight, 
  Check, 
  Star,
  Loader2,
  Sparkles
} from 'lucide-react'
import { AutoPostIcon } from '@/components/AutoPostLogo'

function LandingPage({ onEnterDemo, onSignIn }: { onEnterDemo: () => void; onSignIn: () => void }) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const features = [
    {
      icon: Send,
      title: "Multi-Platform Publishing",
      description: "Publish to Telegram, Twitter, and Instagram with a single click. More platforms coming soon."
    },
    {
      icon: Zap,
      title: "Instant Delivery",
      description: "Your content is delivered instantly to all connected platforms. No delays, no waiting."
    },
    {
      icon: Globe,
      title: "Reach Your Audience",
      description: "Connect with your audience wherever they are. One post, multiple channels."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and secure. We never share your information with third parties."
    }
  ]

  const testimonials = [
    {
      name: "Sarah K.",
      role: "Content Creator",
      content: "AutoPost has saved me hours every week. I can now focus on creating content instead of posting it everywhere.",
      avatar: "S"
    },
    {
      name: "Mike R.",
      role: "Marketing Manager",
      content: "The Telegram integration is seamless. Our newsletter goes out to all channels instantly.",
      avatar: "M"
    },
    {
      name: "Ana L.",
      role: "Small Business Owner",
      content: "Finally a tool that just works. Simple, fast, and reliable. Highly recommended!",
      avatar: "A"
    }
  ]

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: ["5 posts/month", "1 Telegram channel", "Basic support"],
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      description: "For serious content creators",
      features: ["Unlimited posts", "5 channels per platform", "Priority support", "Analytics dashboard"],
      popular: true
    },
    {
      name: "Business",
      price: "$29",
      description: "For teams and agencies",
      features: ["Everything in Pro", "Unlimited channels", "Team collaboration", "API access", "Custom integrations"],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AutoPostIcon size={24} />
            <span className="font-bold text-lg">AutoPost</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 text-sm" onClick={onEnterDemo}>
              Try Demo
            </Button>
            <Button size="sm" className="h-8 gradient-primary text-sm" onClick={onSignIn}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            New: Instagram support coming soon
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Post once,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> publish everywhere</span>
            <br />automatically
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Save hours every week. Create content once and let AutoPost distribute it to all your social platforms instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button size="lg" className="gradient-primary h-12 px-8 text-base" onClick={onSignIn}>
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base" onClick={onEnterDemo}>
              Try Demo
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">No credit card required • Free plan available</p>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl border border-border overflow-hidden bg-gradient-to-b from-card to-background glow-card">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
            <div className="p-4 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload Form Preview */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Send className="w-4 h-4 text-primary" />
                    Create Post
                  </div>
                  <div className="aspect-video rounded-lg border-2 border-dashed border-border bg-accent/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 mx-auto mb-2 flex items-center justify-center">
                        <Send className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Your content here</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-primary text-primary-foreground">Telegram</Badge>
                    <Badge variant="outline" className="opacity-50">Twitter</Badge>
                    <Badge variant="outline" className="opacity-50">Instagram</Badge>
                  </div>
                </div>
                {/* Telegram Preview */}
                <div className="bg-[#17212b] rounded-xl overflow-hidden">
                  <div className="bg-[#242f3d] px-4 py-2 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <Send className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Your Channel</p>
                      <p className="text-gray-400 text-xs">12.4K subscribers</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="aspect-video bg-gray-700/30 rounded-lg mb-3" />
                    <p className="text-white text-sm font-medium">Your amazing content</p>
                    <p className="text-gray-400 text-xs mt-1">Published instantly to your audience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything you need to automate your content</h2>
            <p className="text-muted-foreground">Powerful features to help you reach your audience effortlessly</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="bg-card border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-accent/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Loved by content creators</h2>
            <p className="text-muted-foreground">Join thousands of users saving time with AutoPost</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground">Start free, upgrade when you need more</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <Card key={i} className={`bg-card border-border ${plan.popular ? 'border-primary ring-1 ring-primary' : ''}`}>
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-xs text-center py-1 font-medium">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <div className="mt-2 mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'gradient-primary' : ''}`} 
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={onSignIn}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-primary/30">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to save hours every week?</h2>
              <p className="text-muted-foreground mb-6">Join thousands of content creators automating their workflow</p>
              <Button size="lg" className="gradient-primary h-12 px-8" onClick={onSignIn}>
                Start Free Today
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AutoPostIcon size={20} />
            <span className="font-medium">AutoPost</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 AutoPost. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { loginWithGoogle, loginWithEmail, signUp, isLoading } = useAuth()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (mode === 'signin') {
        const result = await loginWithEmail(email, password)
        if (result.success) {
          onClose()
        } else {
          setError(result.error || 'Failed to sign in')
        }
      } else {
        const result = await signUp(email, password, name)
        if (result.success) {
          onClose()
        } else {
          setError(result.error || 'Failed to create account')
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setIsSubmitting(true)
    try {
      const result = await loginWithGoogle()
      if (result.success) {
        onClose()
      } else {
        setError(result.error || 'Failed to sign in with Google')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="bg-card border-border w-full max-w-md overflow-hidden animate-in fade-in-0 zoom-in-95">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <AutoPostIcon size={24} />
              <span className="font-bold text-lg">{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-accent">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="text-xs font-medium mb-1.5 block">Name</label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="h-10"
                  required
                />
              </div>
            )}
            <div>
              <label className="text-xs font-medium mb-1.5 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-10"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-10"
                required
              />
            </div>
            <Button type="submit" className="w-full h-10 gradient-primary" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (mode === 'signin' ? 'Sign In' : 'Create Account')}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">or continue with</span>
            </div>
          </div>

          <Button 
            type="button" 
            variant="outline" 
            className="w-full h-10" 
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-6">
            {mode === 'signin' ? (
              <>
                Don't have an account?{' '}
                <button onClick={() => setMode('signup')} className="text-primary hover:underline">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button onClick={() => setMode('signin')} className="text-primary hover:underline">
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </Card>
    </div>
  )
}

export default function App() {
  const { isAuthenticated, isDemo, isLoading, enterDemo, exitDemo } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Show dashboard if authenticated or in demo mode
  if (isAuthenticated || isDemo) {
    return <Dashboard />
  }

  // Show landing page with auth modal
  return (
    <>
      <LandingPage 
        onEnterDemo={enterDemo}
        onSignIn={() => setShowAuthModal(true)}
      />
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  )
}
