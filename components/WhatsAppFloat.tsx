'use client';

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/22667739734"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Contacter sur WhatsApp"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '40px',
        zIndex: 9999,
        backgroundColor: '#d4af37',
        padding: '12px 18px',
        borderRadius: '9999px',
        color: '#06172f',
        fontWeight: 800,
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 12px 35px rgba(6, 23, 47, 0.3)',
        transition: 'transform 0.3s ease, background-color 0.3s ease',
        border: 'none',
        cursor: 'pointer',
        textDecoration: 'none'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#e1bb43';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#d4af37';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <i className="fab fa-whatsapp" style={{ fontSize: '18px' }}></i>
      <span>WhatsApp</span>

      <style jsx>{`
        @media (max-width: 768px) {
          .whatsapp-float {
            bottom: 16px !important;
            right: 28px !important;
            padding: 12px !important;
            width: 52px !important;
            height: 52px !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 99999 !important;
            box-shadow: 0 8px 25px rgba(6, 23, 47, 0.4) !important;
          }
          .whatsapp-float span {
            display: none !important;
          }
          .whatsapp-float i {
            font-size: 24px !important;
            margin: 0 !important;
          }
        }
        @media (max-width: 480px) {
          .whatsapp-float {
            bottom: 14px !important;
            right: 24px !important;
            padding: 11px !important;
            width: 48px !important;
            height: 48px !important;
          }
          .whatsapp-float i {
            font-size: 22px !important;
          }
        }
      `}</style>
    </a>
  );
}