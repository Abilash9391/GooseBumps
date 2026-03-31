import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { section: "home", label: "Home" },
  { section: "vision", label: "Vision" },
  { section: "events", label: "Events" },
  { section: "schedule", label: "Schedule" },
  { section: "achievements", label: "Achievements" },
  { section: "about-game", label: "About Game", isPage: true },
  { section: "contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const getHref = (link: typeof navLinks[0]) => {
    if (link.isPage) return "/about-game";
    return isHomePage ? `#${link.section}` : `/#${link.section}`;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    if (link.isPage) return;

    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(link.section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Goosebumps Ultimate Disc Club"
              className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
            />
            <div className="hidden sm:block">
              <span className="font-display text-lg lg:text-xl font-bold tracking-tight text-foreground leading-tight block">
                GOOSEBUMPS
              </span>
              <span className="text-xs text-muted-foreground tracking-widest">
                ULTIMATE DISC CLUB
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) =>
              link.isPage ? (
                <Link
                  key={link.section}
                  to="/about-game"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.section}
                  href={getHref(link)}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={isHomePage ? "#contact" : "/#contact"}>
              <Button variant="default" className="font-semibold uppercase tracking-wider">
                Join Now
              </Button>
            </a>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex items-center gap-3 mb-8">
                <img
                  src="/images/logo.png"
                  alt="Goosebumps Ultimate Disc Club"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <span className="font-display text-lg font-bold tracking-tight text-foreground leading-tight block">
                    GOOSEBUMPS
                  </span>
                  <span className="text-xs text-muted-foreground tracking-widest">
                    ULTIMATE DISC CLUB
                  </span>
                </div>
              </div>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) =>
                  link.isPage ? (
                    <Link
                      key={link.section}
                      to="/about-game"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider py-2"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.section}
                      href={getHref(link)}
                      onClick={(e) => handleNavClick(e, link)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider py-2"
                    >
                      {link.label}
                    </a>
                  )
                )}
                <a href={isHomePage ? "#contact" : "/#contact"}>
                  <Button className="mt-4 w-full font-semibold uppercase tracking-wider">
                    Join Now
                  </Button>
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
