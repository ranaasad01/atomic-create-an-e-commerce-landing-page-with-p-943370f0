export type NavLink = {
  label: string;
  href: string;
};

export const APP_NAME = "Lumière";
export const APP_TAGLINE = "Curated Modern Living";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#products" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const navCTA = {
  label: "Shop Now",
  href: "#products",
};