import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Increased font size + made text bold
  const linkBase =
    "relative px-4 py-2 text-lg md:text-xl font-bold text-foreground transition-colors group";
  const linkUnderline =
    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-primary after:origin-left after:transition-transform after:duration-200";
  const desktopLink = ({ isActive }: { isActive: boolean }) =>
    [
      linkBase,
      linkUnderline,
      isActive
        ? "text-primary after:scale-x-100"
        : "hover:text-primary after:scale-x-0 group-hover:after:scale-x-100",
    ].join(" ");

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/65 border-b border-border/60 shadow-sm">
      <div className="container mx-auto px-6 md:px-10">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo Only */}
          <Link
            to="/"
            className="flex items-center select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
            aria-label="Nivaaran Home"
          >
            <img
              src="https://i.postimg.cc/25HS8J7r/Gemini-Generated-Image-jl7rxjl7rxjl7rxj-removebg-preview.png"
              alt="Nivaaran Logo"
              className="h-70 md:h-72 lg:h-78 w-auto object-contain transition-transform duration-200 hover:scale-[1.05]"
              loading="lazy"
              decoding="async"
            />
          </Link>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex items-center gap-4 lg:gap-8"
            role="menubar"
            aria-label="Main Navigation"
          >
            <NavLink to="/" className={desktopLink} role="menuitem">
              Home
            </NavLink>
            <NavLink to="/products" className={desktopLink} role="menuitem">
              Products
            </NavLink>
            <NavLink to="/blog" className={desktopLink} role="menuitem">
              Blog
            </NavLink>
            <NavLink to="/about" className={desktopLink} role="menuitem">
              About
            </NavLink>
            <NavLink to="/contact" className={desktopLink} role="menuitem">
              Contact
            </NavLink>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border/60 py-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col py-2">
              {["Home", "Products", "Blog", "About", "Contact"].map((item) => (
                <NavLink
                  key={item}
                  to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    [
                      "px-4 py-3 text-lg font-semibold",
                      isActive
                        ? "text-primary font-bold"
                        : "text-foreground hover:text-primary",
                    ].join(" ")
                  }
                >
                  {item}
                </NavLink>
              ))}

              {/* Mobile Search */}
              <div className="mt-2 px-2">
                <Button
                  variant="outline"
                  className="w-full justify-center text-base font-medium"
                  onClick={() => setIsOpen(false)}
                  aria-label="Search"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
