import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { NavLink, useLocation } from "react-router-dom";
import { Activity, Menu, X } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/match", label: "Match Overview" },
  { to: "/players", label: "Players" },
  { to: "/strategy", label: "Strategy" },
  { to: "/recovery", label: "Recovery" },
];

const Navbar = () => {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isLanding = location.pathname === "/";

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isLanding ? "bg-transparent" : "bg-background/80 backdrop-blur-xl border-b border-border"
      }`}
      style={{ opacity: 0 }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Activity className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold font-display text-foreground">PlayWise</span>
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </NavLink>
            );
          })}
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-6 pb-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </NavLink>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
