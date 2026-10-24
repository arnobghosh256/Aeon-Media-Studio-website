import React, { useState } from 'react';
import { Sliders, Search } from 'lucide-react';
import { AdminBrandSettings } from './AdminBrandSettings.tsx';
import { AdminSEOSettings } from './AdminSEOSettings.tsx';
import { BrandSettings } from '../../types/index.ts';

interface AdminBrandAndSEOSettingsProps {
  settings: BrandSettings;
  onSettingsUpdated: (settings: BrandSettings) => void;
}

export const AdminBrandAndSEOSettings: React.FC<AdminBrandAndSEOSettingsProps> = ({
  settings,
  onSettingsUpdated,
}) => {
  const [subTab, setSubTab] = useState<'brand' | 'seo'>('brand');

  return (
    <div className="space-y-6">
      {/* Sub-navigation tabs */}
      <div className="flex items-center gap-2 border-b border-[#22221F]/10 pb-4">
        <button
          onClick={() => setSubTab('brand')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-sans uppercase tracking-wider font-medium transition-colors ${
            subTab === 'brand'
              ? 'bg-[#22221F] text-[#F7F4EE]'
              : 'bg-white text-[#22221F]/70 hover:text-[#22221F] border border-[#22221F]/10'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Brand & Studio Settings</span>
        </button>

        <button
          onClick={() => setSubTab('seo')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-sans uppercase tracking-wider font-medium transition-colors ${
            subTab === 'seo'
              ? 'bg-[#22221F] text-[#F7F4EE]'
              : 'bg-white text-[#22221F]/70 hover:text-[#22221F] border border-[#22221F]/10'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>SEO & Search Snippets</span>
        </button>
      </div>

      {subTab === 'brand' ? (
        <AdminBrandSettings
          settings={settings}
          onSettingsUpdated={onSettingsUpdated}
        />
      ) : (
        <AdminSEOSettings
          settings={settings}
          onSettingsUpdated={onSettingsUpdated}
        />
      )}
    </div>
  );
};
