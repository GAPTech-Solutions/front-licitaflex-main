import Link from "next/link";

interface LogoProps {
  variant?: "default" | "white";
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  disableLink?: boolean; // Add this prop to make link optional
}

export function Logo({
  variant = "default",
  showText = false,
  size = "md",
  disableLink = false,
}: LogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-16",
  };

  const content = (
    <>
      <div className={`${sizeClasses[size]}`}>
        <img
          src="/Logo_Canal_de_Compras_vetorizada.png"
          alt="Logo"
          className={`w-full h-full object-contain ${variant === "white" ? "invert" : ""}`}
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-bold text-xl ${variant === "white" ? "text-white" : "text-primary"}`}>
            CANAL DE COMPRAS
          </span>
          <span
            className={`font-bold text-xs tracking-[0.3em] ${
              variant === "white" ? "text-white" : ""
            } text-secondary`}>
            BRASIL
          </span>
        </div>
      )}
    </>
  );

  // Conditionally wrap with Link
  if (disableLink) {
    return <div className="flex items-center gap-2">{content}</div>;
  }

  return (
    <Link href="/" className="flex items-center gap-2">
      {content}
    </Link>
  );
}
