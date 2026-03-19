interface AutoPostLogoProps {
  size?: number
  className?: string
  showText?: boolean
}

export function AutoPostLogo({ size = 32, className = '', showText = false }: AutoPostLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logo-gradient-main" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6"/>
            <stop offset="0.5" stopColor="#6366F1"/>
            <stop offset="1" stopColor="#4F46E5"/>
          </linearGradient>
          <linearGradient id="logo-gradient-accent" x1="8" y1="8" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C4B5FD"/>
            <stop offset="1" stopColor="#A78BFA"/>
          </linearGradient>
        </defs>
        
        {/* Background rounded square */}
        <rect width="32" height="32" rx="8" fill="url(#logo-gradient-main)"/>
        
        {/* Inner glow circle */}
        <circle cx="16" cy="16" r="8" fill="url(#logo-gradient-accent)" opacity="0.3"/>
        
        {/* Main icon - Send/Publish arrow */}
        <path 
          d="M10 22L22 10" 
          stroke="white" 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
        <path 
          d="M14 10H22V18" 
          stroke="white" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* Accent dot */}
        <circle cx="10" cy="22" r="2" fill="white"/>
      </svg>
      
      {showText && (
        <span className="font-bold text-lg bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
          AutoPost
        </span>
      )}
    </div>
  )
}

export function AutoPostIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="icon-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6"/>
          <stop offset="1" stopColor="#4F46E5"/>
        </linearGradient>
      </defs>
      
      <rect width="24" height="24" rx="6" fill="url(#icon-gradient)"/>
      
      <path 
        d="M7 17L17 7" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M10 7H17V14" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      <circle cx="7" cy="17" r="1.5" fill="white"/>
    </svg>
  )
}

export default AutoPostLogo
