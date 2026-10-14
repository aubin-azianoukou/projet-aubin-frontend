'use client';

// ============================================================
// COMPOSANT BookPrice
// ============================================================
// Affiche un prix avec possibilité de badge promo
// Utilisation :
//   <BookPrice prix="13 900" />
//   <BookPrice prix="13 900" prixPromo="6 900" badge="50% OFF" />
// ============================================================

interface BookPriceProps {
  prix: string;
  prixPromo?: string;
  badge?: string;
  devise?: string;         // Par défaut : FCFA
  size?: 'small' | 'medium' | 'large';
  align?: 'left' | 'center' | 'right';
}

export default function BookPrice({
  prix,
  prixPromo,
  badge,
  devise = 'FCFA',
  size = 'medium',
  align = 'left',
}: BookPriceProps) {
  const hasPromo = Boolean(prixPromo);

  // Tailles selon le paramètre `size`
  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-3xl',
  };

  const alignClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  return (
    <div className={`flex flex-col gap-2 ${alignClasses[align]}`}>
      {/* Badge promo (si présent) */}
      {badge && (
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider"
          style={{
            background: '#d4af37',
            color: '#06172f',
          }}
        >
          {badge}
        </span>
      )}

      {/* Prix */}
      <div className="flex items-baseline gap-3 flex-wrap">
        {/* Prix barré (si promo) */}
        {hasPromo && (
          <span
            className="text-sm font-normal line-through opacity-60"
            style={{ color: '#6c7280' }}
          >
            {prix} {devise}
          </span>
        )}

        {/* Prix principal (promo si présente, sinon normal) */}
        <span
          className={`${sizeClasses[size]} font-bold`}
          style={{
            fontFamily: "'Playfair Display', serif",
            color: hasPromo ? '#d4af37' : '#06172f',
          }}
        >
          {hasPromo ? prixPromo : prix} {devise}
        </span>
      </div>
    </div>
  );
}