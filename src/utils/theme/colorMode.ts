
export default function ColorMode<T>(light: T, dark: T) {
  const colorMode = document.documentElement.dataset.theme ?? "light";
  return () => (colorMode === "light" ? light : dark);
}
