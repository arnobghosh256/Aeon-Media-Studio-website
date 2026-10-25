import React from 'react';

export const LOGO_ASSET_PATH = '/assets/aistudio/IMG_20261003_095753_7e6246d0.png';

export interface BrandLogoProps {
  variant?: 'header' | 'footer' | 'seal' | 'hero' | 'admin' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
  lightText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'header',
  size = 'md',
  showSubtitle = true,
  className = '',
  onClick,
  lightText = false,
}) => {
  // Dimension mappings for the emblem crest
  const emblemSizes = {
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  const Component = onClick ? 'button' : 'div';

  // HEADER VARIANT: Precision lockup for sticky navigation
  if (variant === 'header') {
    return (
      <Component
        onClick={onClick}
        className={`group inline-flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B6A17E] transition-transform ${className}`}
        aria-label="AEON MEDIA — Return to homepage"
      >
        {/* Heraldic circular emblem badge */}
        <div className="relative shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#B6A17E]/60 ring-1 ring-[#22221F]/15 bg-[#141412] shadow-sm group-hover:border-[#B6A17E] group-hover:shadow-[0_0_12px_rgba(182,161,126,0.3)] transition-all duration-300">
            <img
              src={LOGO_ASSET_PATH}
              alt="AEON MEDIA Tiger & Eagle Crest"
              className="w-full h-full object-cover object-top scale-125 translate-y-[2px] group-hover:scale-130 transition-transform duration-300"
              loading="eager"
            />
          </div>
          {/* Subtle gold pinpoint anchor */}
          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#B6A17E] ring-2 ring-[#F7F4EE]" />
        </div>

        {/* Typographic lockup */}
        <div className="flex flex-col">
          <span className="font-serif font-medium text-lg sm:text-xl tracking-[0.14em] text-[#22221F] group-hover:text-[#B6A17E] transition-colors leading-none uppercase">
            AEON MEDIA
          </span>
          {showSubtitle && (
            <span className="font-sans text-[8.5px] uppercase tracking-[0.24em] text-[#B6A17E] font-medium mt-1 leading-none">
              Luxury Hospitality
            </span>
          )}
        </div>
      </Component>
    );
  }

  // FOOTER VARIANT: Rich dark presence with gold typography
  if (variant === 'footer') {
    return (
      <Component
        onClick={onClick}
        className={`group inline-flex items-center gap-4 text-left ${className}`}
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden border border-[#B6A17E]/40 ring-1 ring-[#F7F4EE]/10 bg-[#121211] shadow-xl group-hover:border-[#B6A17E] transition-all duration-300 shrink-0">
          <img
            src={LOGO_ASSET_PATH}
            alt="AEON MEDIA Insignia"
            className="w-full h-full object-cover object-top scale-120 group-hover:scale-125 transition-transform duration-500"
          />
        </div>
        <div className="space-y-1">
          <span className="block font-serif text-2xl sm:text-3xl tracking-[0.12em] text-[#F7F4EE] group-hover:text-[#B6A17E] transition-colors uppercase">
            AEON MEDIA
          </span>
          {showSubtitle && (
            <span className="block text-[10px] font-sans uppercase tracking-[0.22em] text-[#B6A17E] font-medium">
              Atelier de Haute Rédaction
            </span>
          )}
        </div>
      </Component>
    );
  }

  // ADMIN VARIANT: Refined crest lockup for Admin Sidebar and Portal
  if (variant === 'admin') {
    return (
      <Component
        onClick={onClick}
        className={`flex items-center gap-3 text-left ${className}`}
      >
        <div className="w-10 h-10 rounded-sm overflow-hidden border border-[#B6A17E]/50 bg-[#141412] shadow-md shrink-0">
          <img
            src={LOGO_ASSET_PATH}
            alt="AEON MEDIA Admin Mark"
            className="w-full h-full object-cover object-top scale-125"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[0.22em] text-[#B6A17E] font-semibold font-sans">
            Central Studio Console
          </span>
          <span className="text-lg font-serif text-[#F7F4EE] tracking-[0.1em] uppercase">
            AEON MEDIA
          </span>
        </div>
      </Component>
    );
  }

  // SEAL VARIANT: Architectural stamp for monographs & philosophy
  if (variant === 'seal') {
    return (
      <div className={`inline-flex flex-col items-center text-center ${className}`}>
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 border border-[#B6A17E]/40 ring-1 ring-[#22221F]/10 bg-[#151514] shadow-lg overflow-hidden group">
          <img
            src={LOGO_ASSET_PATH}
            alt="AEON MEDIA Heritage Seal"
            className="w-full h-full object-cover object-top scale-125 rounded-full"
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[#B6A17E]/30 pointer-events-none" />
        </div>
        <div className="mt-3 space-y-0.5">
          <span className={`block font-serif text-sm tracking-[0.16em] uppercase ${lightText ? 'text-[#F7F4EE]' : 'text-[#22221F]'}`}>
            AEON MEDIA
          </span>
          <span className="block font-sans text-[9px] tracking-[0.24em] text-[#B6A17E] uppercase">
            Heritage Mark · Vol. IV
          </span>
        </div>
      </div>
    );
  }

  // HERO VARIANT: Grand presentation with the full crest and gold artwork
  if (variant === 'hero') {
    return (
      <div className={`relative inline-block ${className}`}>
        <div className="relative rounded-lg overflow-hidden border border-[#B6A17E]/40 shadow-2xl bg-[#121210] p-1.5 ring-1 ring-[#22221F]/20">
          <img
            src={LOGO_ASSET_PATH}
            alt="AEON MEDIA Grand Insignia"
            className="w-48 sm:w-56 md:w-64 h-auto object-cover rounded-md"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-[#B6A17E]/20 rounded-md pointer-events-none" />
        </div>
      </div>
    );
  }

  // BADGE VARIANT: Compact pill badge
  return (
    <Component
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 px-3 py-1.5 bg-[#22221F] text-[#F7F4EE] border border-[#B6A17E]/30 ${className}`}
    >
      <div className="w-5 h-5 rounded-full overflow-hidden border border-[#B6A17E]/50 shrink-0">
        <img
          src={LOGO_ASSET_PATH}
          alt="AEON MEDIA Badge"
          className="w-full h-full object-cover object-top scale-140"
        />
      </div>
      <span className="font-serif text-xs tracking-[0.12em] uppercase">
        AEON MEDIA
      </span>
    </Component>
  );
};
