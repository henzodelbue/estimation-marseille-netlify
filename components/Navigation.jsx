import React, { useState } from 'react';
import { Menu, X, Calculator, Calendar, User } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/estimateur', label: 'Estimation', icon: Calculator },
    { href: 'https://calendly.com/henzo-delbue-llinaresimmo/30min', label: 'Prendre RDV', icon: Calendar, external: true },
    { href: '/qui-sommes-nous', label: 'Qui sommes-nous', icon: User },
  ];

  return (
    <nav className="backdrop-blur-2xl bg-white/70 border-b border-gold-light/40 sticky top-0 z-50 shadow-2xl shadow-primary/5">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Estimation Marseille"
              className="h-16 md:h-20 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-primary hover:text-gold transition-all font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all"></span>
              </a>
            ))}
            <a
              href="/estimateur"
              className="relative px-6 py-2.5 bg-gradient-to-r from-gold to-gold text-white rounded-xl font-medium overflow-hidden group shadow-lg shadow-gold/30"
            >
              <span className="relative z-10">Estimer mon bien</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-primary hover:text-gold transition-colors"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gold-light/40 pt-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-primary hover:text-gold hover:bg-gold/10 rounded-xl transition-all font-medium"
                >
                  <link.icon size={20} className="text-gold" />
                  {link.label}
                </a>
              ))}
              <a
                href="/estimateur"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold text-white rounded-xl font-bold shadow-lg shadow-gold/30"
              >
                <Calculator size={20} />
                Estimer mon bien
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
