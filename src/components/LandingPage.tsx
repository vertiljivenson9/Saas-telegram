'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Send, 
  Sparkles, 
  Zap, 
  Globe, 
  Clock, 
  Shield, 
  ArrowRight,
  CheckCircle2,
  Star,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Upload,
  FileText,
  Settings,
  BarChart3,
  Menu,
  X
} from 'lucide-react'
import { AutoPostIcon } from '@/components/AutoPostLogo'
import { useState } from 'react'

interface LandingPageProps {
  onEnterDashboard?: () => void
  isDemo?: boolean
}

export default function LandingPage({ onEnterDashboard, isDemo = true }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: Zap,
      title: 'Instant Publishing',
      description: 'Publish to multiple platforms with a single click.'
    },
    {
      icon: Globe,
      title: 'Multi-Platform',
      description: 'Connect Telegram, Twitter, Instagram and more.'
    },
    {
      icon: Clock,
      title: 'Schedule Posts',
      description: 'Plan your content calendar in advance.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <AutoPostIcon size={28} />
            <span className="font-bold text-base sm:text-lg text-foreground">AutoPost</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground">Features</Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">Pricing</Button>
            <Button variant="outline" size="sm">Sign In</Button>
            <Button size="sm" className="gradient-primary" onClick={onEnterDashboard}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden relative z-20 px-4 pb-4 space-y-2 bg-background/95 backdrop-blur-sm">
            <Button variant="ghost" className="w-full justify-start">Features</Button>
            <Button variant="ghost" className="w-full justify-start">Pricing</Button>
            <Button variant="outline" className="w-full">Sign In</Button>
            <Button className="w-full gradient-primary" onClick={onEnterDashboard}>Get Started</Button>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-20">
          <div className="text-center mb-8 sm:mb-10">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 mb-4 text-xs">
              <Sparkles className="w-3 h-3 mr-1.5" />
              Introducing AutoPost
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight px-2">
              Post once, publish
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                everywhere automatically
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-6 px-4">
              Sync your posts to Telegram, Twitter, Instagram, and more — all from one dashboard.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
              <Button 
                size="lg" 
                className="gradient-primary h-12 px-6 text-base w-full sm:w-auto"
                onClick={onEnterDashboard}
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-6 text-base w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              No credit card required • 14-day free trial
            </p>
          </div>

          {/* Product Preview */}
          <div className="relative px-2 sm:px-0">
            {/* Dashboard Preview */}
            <div className="relative bg-card rounded-xl sm:rounded-2xl border border-border shadow-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-card border-b border-border">
                <div className="flex items-center gap-2">
                  <AutoPostIcon size={18} />
                  <span className="font-medium text-xs sm:text-sm text-foreground">Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    Live
                  </Badge>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col md:flex-row">
                {/* Sidebar - Hidden on mobile */}
                <div className="hidden md:flex w-48 bg-sidebar border-r border-sidebar-border p-3 flex-col">
                  <nav className="space-y-1 flex-1">
                    {[
                      { icon: FileText, label: 'Home', active: true },
                      { icon: Upload, label: 'Upload' },
                      { icon: FileText, label: 'Posts' },
                      { icon: Settings, label: 'Settings' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors ${
                          item.active 
                            ? 'bg-sidebar-accent text-sidebar-primary' 
                            : 'text-sidebar-foreground/60 hover:bg-sidebar-accent/50'
                        }`}
                      >
                        <item.icon className="w-3.5 h-3.5" />
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-3 sm:p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                    {/* Upload Form */}
                    <div className="space-y-3">
                      <h3 className="font-medium text-sm text-foreground">Create New Post</h3>
                      <div className="aspect-video rounded-lg border-2 border-dashed border-border bg-accent/20 flex items-center justify-center">
                        <div className="text-center p-4">
                          <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground mx-auto mb-1.5" />
                          <p className="text-xs text-muted-foreground">Upload Image</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-8 rounded-lg bg-input border border-border" />
                        <div className="h-16 rounded-lg bg-input border border-border" />
                      </div>
                      <Button className="w-full gradient-primary h-9 text-sm">
                        <Send className="w-3.5 h-3.5 mr-1.5" />
                        Publish Now
                      </Button>
                    </div>

                    {/* Stats - Compact */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm text-foreground">Analytics</h3>
                        <BarChart3 className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: 'Posts', value: '--' },
                          { label: 'Views', value: '--' },
                          { label: 'Engagement', value: '--%' },
                          { label: 'Published', value: '--' },
                        ].map((stat) => (
                          <div key={stat.label} className="p-2.5 rounded-lg bg-accent/30 border border-border">
                            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                            <p className="text-base font-semibold text-foreground mt-0.5">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 rounded-lg bg-accent/30 border border-border">
                        <p className="text-[10px] text-muted-foreground mb-1.5">Connected Platforms</p>
                        <div className="flex gap-1.5">
                          {['Telegram', 'Twitter', 'Instagram'].map((platform) => (
                            <Badge key={platform} variant="outline" className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-primary/20">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Mockup - Hidden on small screens */}
            <div className="hidden lg:block absolute -right-4 xl:right-4 top-1/2 -translate-y-1/2 z-20">
              <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-[2rem] p-1.5 shadow-2xl w-[180px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-gray-900 rounded-b-xl" />
                <div className="bg-[#17212b] rounded-[1.5rem] overflow-hidden">
                  {/* Telegram Header */}
                  <div className="bg-[#242f3d] px-2.5 py-2 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <Send className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-[10px]">Your Channel</h4>
                      <p className="text-[8px] text-gray-400">12.4K subscribers</p>
                    </div>
                  </div>
                  {/* Post */}
                  <div className="p-2">
                    <div className="rounded overflow-hidden mb-1.5">
                      <img 
                        src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=150&fit=crop"
                        alt="Post"
                        className="w-full aspect-video object-cover"
                      />
                    </div>
                    <h5 className="font-medium text-white text-[10px] mb-0.5">New Product!</h5>
                    <p className="text-gray-400 text-[8px] line-clamp-2">Latest updates...</p>
                    <div className="flex items-center gap-2 mt-1.5 text-gray-500 text-[8px]">
                      <span className="flex items-center gap-0.5">
                        <Eye className="w-2.5 h-2.5" />1.2K
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Heart className="w-2.5 h-2.5" />89
                      </span>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="border-t border-gray-700/50 px-2 py-1.5 flex items-center justify-around">
                    <Heart className="w-3 h-3 text-gray-400" />
                    <MessageCircle className="w-3 h-3 text-gray-400" />
                    <Share2 className="w-3 h-3 text-gray-400" />
                  </div>
                  {/* Home Indicator */}
                  <div className="py-1.5 flex justify-center">
                    <div className="w-16 h-0.5 bg-gray-600 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Notification - Hidden on mobile */}
            <div className="hidden sm:block absolute top-2 left-4 lg:left-8">
              <Card className="bg-card/90 backdrop-blur-sm border border-border shadow-lg px-2.5 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-foreground">Published!</p>
                    <p className="text-[8px] text-muted-foreground">Telegram • just now</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 mb-3 text-xs">Features</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Everything you need
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Powerful features for creators and businesses.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-4">
                  <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center mb-2.5">
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-medium text-sm text-foreground mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 mb-3 text-xs">How It Works</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Three simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { step: '01', title: 'Upload', description: 'Add your image and write your content.' },
              { step: '02', title: 'Select', description: 'Choose which platforms to publish to.' },
              { step: '03', title: 'Publish', description: 'One click and you\'re done!' }
            ].map((item, index) => (
              <Card key={index} className="bg-card border-border relative">
                <div className="text-4xl font-bold text-primary/15 absolute -top-1 left-3">
                  {item.step}
                </div>
                <CardContent className="p-5 pt-8">
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/15 via-purple-500/10 to-pink-500/15 border-primary/20">
            <CardContent className="p-6 sm:p-8 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                Ready to get started?
              </h2>
              <p className="text-sm text-muted-foreground mb-5">
                Join thousands of creators who save hours every week.
              </p>
              <Button size="lg" className="gradient-primary h-11 px-6" onClick={onEnterDashboard}>
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                No credit card required
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AutoPostIcon size={22} />
            <span className="font-medium text-sm text-foreground">AutoPost</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 AutoPost</p>
        </div>
      </footer>
    </div>
  )
}
