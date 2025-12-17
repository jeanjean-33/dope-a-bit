import { cn } from '../utils/cn'

export function Logo({ className, size = 32 }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-200 hover:scale-110"
      >
        {/* Éclair stylisé avec dégradé vibrant */}
        <path
          d="M16 4L12 12H20L16 28"
          fill="url(#lightningGradient)"
          className="drop-shadow-lg"
        />

        {/* Contour lumineux pour l'effet glow */}
        <path
          d="M16 4L12 12H20L16 28"
          fill="none"
          stroke="url(#glowGradient)"
          strokeWidth="0.5"
          opacity="0.8"
        />

        {/* Points d'énergie animés */}
        <circle
          cx="14"
          cy="8"
          r="1"
          fill="#fbbf24"
          className="animate-ping"
          opacity="0.8"
        />
        <circle
          cx="18"
          cy="16"
          r="0.8"
          fill="#f59e0b"
          className="animate-pulse"
          opacity="0.6"
        />
        <circle
          cx="16"
          cy="22"
          r="0.6"
          fill="#d97706"
          className="animate-bounce"
          opacity="0.7"
        />

        {/* Définition des dégradés */}
        <defs>
          <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
