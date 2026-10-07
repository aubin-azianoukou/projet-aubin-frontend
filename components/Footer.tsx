'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer" style={{ margin: '0 -20px', paddingLeft: '20px', paddingRight: '20px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 30px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          padding: '0 20px',
          backgroundColor: '#06172f',
          paddingTop: '40px',
          paddingBottom: '20px'
        }}>
          {/* Colonne 1 - Logo */}
          <div className="col">
            <div className="logo" style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
              Aubin Romain <span style={{ color: '#d4af37' }}>AZIANOUKOU</span>
            </div>
            <p style={{ marginTop: '8px', color: '#dde3ee', fontSize: '12px', lineHeight: '1.8' }}>
              Développer les compétences, structurer les entreprises et accompagner la réussite durable depuis Ouagadougou.
            </p>
          </div>

          {/* Colonne 2 - Piliers */}
          <div className="col">
            <h4 style={{ color: '#d4af37', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>Piliers</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2px', padding: 0 }}>
              <li><Link href="/formations" style={{ color: '#dde3ee', fontSize: '12px', lineHeight: '1.8', transition: 'color 0.3s ease' }}>Formations</Link></li>
              <li><Link href="/consulting" style={{ color: '#dde3ee', fontSize: '12px', lineHeight: '1.8', transition: 'color 0.3s ease' }}>Consulting</Link></li>
              <li><Link href="/auteur" style={{ color: '#dde3ee', fontSize: '12px', lineHeight: '1.8', transition: 'color 0.3s ease' }}>Auteur</Link></li>
              <li><Link href="/ressources" style={{ color: '#dde3ee', fontSize: '12px', lineHeight: '1.8', transition: 'color 0.3s ease' }}>Ressources</Link></li>
            </ul>
          </div>

          {/* Colonne 3 - Support */}
          <div className="col">
            <h4 style={{ color: '#d4af37', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2px', padding: 0 }}>
              <li><Link href="/faq" style={{ color: '#dde3ee', fontSize: '12px', lineHeight: '1.8', transition: 'color 0.3s ease' }}>FAQ</Link></li>
              <li><Link href="/evenements" style={{ color: '#dde3ee', fontSize: '12px', lineHeight: '1.8', transition: 'color 0.3s ease' }}>Événements</Link></li>
              <li><Link href="/telechargements" style={{ color: '#dde3ee', fontSize: '12px', lineHeight: '1.8', transition: 'color 0.3s ease' }}>Téléchargements</Link></li>
              <li><Link href="/temoignages" style={{ color: '#dde3ee', fontSize: '12px', lineHeight: '1.8', transition: 'color 0.3s ease' }}>Témoignages</Link></li>
              <li><Link href="/contact" style={{ color: '#dde3ee', fontSize: '12px', lineHeight: '1.8', transition: 'color 0.3s ease' }}>Contact</Link></li>
            </ul>
          </div>

          {/* Colonne 4 - Contact */}
          <div className="col">
            <h4 style={{ color: '#d4af37', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>Contact</h4>
            <p style={{ color: '#dde3ee', fontSize: '12px', lineHeight: '1.8' }}><strong>WhatsApp :</strong> +226 62 38 12 72</p>
            <p style={{ color: '#dde3ee', fontSize: '12px', lineHeight: '1.8' }}><strong>Téléphone :</strong> +226 67 73 97 34</p>
            <p style={{ color: '#dde3ee', fontSize: '12px', lineHeight: '1.8' }}><strong>Adresse :</strong> Ouagadougou, Burkina Faso</p>
            <a
              href="https://wa.me/22662381272"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-small"
              style={{
                backgroundColor: '#d4af37',
                color: '#06172f',
                padding: '8px 14px',
                borderRadius: '9999px',
                fontWeight: 800,
                fontSize: '12px',
                transition: 'background-color 0.3s ease',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                marginTop: '8px',
                textDecoration: 'none'
              }}
            >
              <i className="fab fa-whatsapp"></i> WhatsApp
            </a>
          </div>

          {/* Copyright */}
          <div style={{
            gridColumn: '1 / -1',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '16px',
            textAlign: 'center',
            fontSize: '11px',
            color: '#dde3ee',
            opacity: 0.6,
            marginTop: '16px'
          }}>
            &copy; 2026 Aubin Romain AZIANOUKOU. Tous droits réservés.
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: #06172f;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        @media (max-width: 1024px) {
          .container > div {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }

        @media (max-width: 768px) {
          .container > div {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            text-align: center !important;
          }

          .col ul {
            align-items: center !important;
          }

          .col p {
            text-align: center !important;
          }

          .btn-gold-small {
            margin: 10px auto 0 auto !important;
          }
        }
      `}</style>
    </footer>
  );
}