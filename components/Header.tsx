'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header" style={{ margin: '0 -20px', paddingLeft: '20px', paddingRight: '20px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', padding: '0 20px' }}>
          {/* Logo */}
          <div className="logo" style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 700, color: '#ffffff', flexShrink: 0 }}>
            Aubin Romain <span style={{ color: '#d4af37' }}>AZIANOUKOU</span>
          </div>

          {/* Navigation */}
          <nav className={`nav ${isOpen ? 'open' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#ffffff', fontSize: '12px', fontWeight: 500, transition: 'color 0.3s ease', whiteSpace: 'nowrap' }}>Accueil</Link>
            <Link href="/formations" style={{ color: '#ffffff', fontSize: '12px', fontWeight: 500, transition: 'color 0.3s ease', whiteSpace: 'nowrap' }}>Formations</Link>
            <Link href="/consulting" style={{ color: '#ffffff', fontSize: '12px', fontWeight: 500, transition: 'color 0.3s ease', whiteSpace: 'nowrap' }}>Consulting</Link>
            <Link href="/auteur" style={{ color: '#ffffff', fontSize: '12px', fontWeight: 500, transition: 'color 0.3s ease', whiteSpace: 'nowrap' }}>Auteur</Link>
            <Link href="/a-propos" style={{ color: '#ffffff', fontSize: '12px', fontWeight: 500, transition: 'color 0.3s ease', whiteSpace: 'nowrap' }}>À propos</Link>
            <Link href="/ressources" style={{ color: '#ffffff', fontSize: '12px', fontWeight: 500, transition: 'color 0.3s ease', whiteSpace: 'nowrap' }}>Ressources</Link>
            <Link href="/contact" style={{ color: '#ffffff', fontSize: '12px', fontWeight: 500, transition: 'color 0.3s ease', whiteSpace: 'nowrap' }}>Contact</Link>
            <a
              href="https://wa.me/22667739734"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-header"
              style={{
                backgroundColor: '#d4af37',
                color: '#06172f',
                padding: '6px 16px',
                borderRadius: '9999px',
                fontWeight: 800,
                fontSize: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background-color 0.3s ease',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                textDecoration: 'none'
              }}
            >
              <i className="fab fa-whatsapp"></i> WhatsApp
            </a>
          </nav>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '4px',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: '4px'
            }}
          >
            <span style={{ display: 'block', width: '26px', height: '2px', backgroundColor: '#ffffff', transition: 'all 0.3s ease' }}></span>
            <span style={{ display: 'block', width: '26px', height: '2px', backgroundColor: '#ffffff', transition: 'all 0.3s ease' }}></span>
            <span style={{ display: 'block', width: '26px', height: '2px', backgroundColor: '#ffffff', transition: 'all 0.3s ease' }}></span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .header {
          background-color: rgba(6, 23, 47, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 14px 0;
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .header .container {
          padding: 0 20px;
        }

        /* ===== DESKTOP (par défaut) ===== */
        .nav {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          flex-wrap: wrap !important;
        }

        /* ===== TABLETTE (max-width: 1024px) ===== */
        @media (max-width: 1024px) {
          .nav {
            gap: 4px !important;
            flex-wrap: nowrap !important;
            justify-content: flex-end !important;
            padding-right: 0 !important;
          }
          .nav a {
            font-size: 10px !important;
            white-space: nowrap !important;
            padding-left: 2px !important;
            padding-right: 2px !important;
          }
          .btn-whatsapp-header {
            font-size: 10px !important;
            padding: 4px 8px !important;
            gap: 3px !important;
            margin-left: 4px !important;
            margin-right: 0 !important;
            flex-shrink: 0 !important;
            white-space: nowrap !important;
          }
          .btn-whatsapp-header i {
            font-size: 11px !important;
          }
        }

        /* ===== MOBILE (max-width: 768px) ===== */
        @media (max-width: 768px) {
          .nav {
            display: none !important;
            flex-direction: column !important;
            position: absolute !important;
            top: 100% !important;
            left: 0 !important;
            right: 0 !important;
            background-color: #06172f !important;
            padding: 16px 20px !important;
            gap: 2px !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4) !important;
            width: 100% !important;
            align-items: center !important;
            flex-wrap: wrap !important;
          }

          .nav.open {
            display: flex !important;
          }

          .nav a {
            padding: 12px 0 !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
            font-size: 15px !important;
            width: 100% !important;
            white-space: normal !important;
            text-align: center !important;
          }

          .nav a:last-child {
            border-bottom: none !important;
          }

          .btn-whatsapp-header {
            width: auto !important;
            max-width: 70% !important;
            justify-content: center !important;
            margin-top: 8px !important;
            padding: 6px 14px !important;
            font-size: 12px !important;
            align-self: center !important;
            flex-shrink: 0 !important;
            border-radius: 9999px !important;
          }
          .btn-whatsapp-header i {
            font-size: 13px !important;
          }

          .hamburger {
            display: flex !important;
          }
        }

        /* ===== PETIT MOBILE (max-width: 480px) ===== */
        @media (max-width: 480px) {
          .header .container {
            padding: 0 12px !important;
          }
          .logo {
            font-size: 13px !important;
          }
          .nav {
            padding: 12px 16px !important;
          }
          .btn-whatsapp-header {
            max-width: 65% !important;
            padding: 5px 10px !important;
            font-size: 10px !important;
          }
          .btn-whatsapp-header i {
            font-size: 11px !important;
          }
        }
      `}</style>
    </header>
  );
}