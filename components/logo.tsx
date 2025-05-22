import Link from "next/link"

interface LogoProps {
  variant?: "default" | "white"
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ variant = "default", showText = false, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-16",
  }

  return (
    <Link href="/" className="flex items-center gap-2">
      <div className={`${sizeClasses[size]}`}>
        <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill={variant === "white" ? "#FFFFFF" : "#1916a1"} />
          <path d="M50 15L80 32.5V67.5L50 85L20 67.5V32.5L50 15Z" fill={variant === "white" ? "#1916a1" : "#FFFFFF"} />
          <path d="M35 50L50 40L50 60Z" fill="#f4d400" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-xl ${variant === "white" ? "text-white" : "text-primary"}`}>
            CANAL DE COMPRAS
          </span>
          <span
            className={`font-bold text-xs tracking-[0.3em] ${variant === "white" ? "text-white" : ""} text-secondary`}
          >
            BRASIL
          </span>
        </div>
      )}
    </Link>
  )
}
