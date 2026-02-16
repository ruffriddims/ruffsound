import { useState, useEffect } from 'react';
import { ArrowLeft, Calculator, Music, Disc, Zap, Check, Info } from 'lucide-react';

type Page = 'home' | 'pricing' | 'upload' | 'options' | 'payment';

interface PricingProps {
  navigateTo: (page: Page) => void;
}

interface Rate {
  label: string;
  price: number;
  perSong?: boolean;
  description: string;
}

const mixingRates: Record<string, Rate> = {
  single: { label: 'Single Song', price: 350, description: 'One song, up to 24 stems' },
  ep: { label: 'EP (3-5 songs)', price: 300, perSong: true, description: 'Per song rate' },
  album: { label: 'Album (6+ songs)', price: 300, perSong: true, description: 'Per song rate' },
};

const masteringRates: Record<string, Rate> = {
  single: { label: 'Single Song', price: 100, description: 'One song master' },
  epAlbum: { label: 'EP/Album (3+ songs)', price: 75, perSong: true, description: 'Per song rate' },
  stemMastering: { label: 'Stem Mastering', price: 125, perSong: true, description: 'Per song with stems' },
};

const bundleRates: Record<string, Rate> = {
  single: { label: 'Single Song', price: 400, description: 'One song - Mix + Master' },
  ep: { label: 'EP (3-5 songs)', price: 350, perSong: true, description: 'Per song - Mix + Master' },
  album: { label: 'Album (6+ songs)', price: 300, perSong: true, description: 'Per song - Mix + Master' },
};

const addOns = {
  instrumental: { label: 'Instrumental Version', price: 15, description: 'Mix without vocals', perSong: true },
  tvTrack: { label: 'TV Track', price: 15, description: 'Mix without lead vocal', perSong: true },
  rush24: { label: '24 Hour Rush', price: 50, description: 'Priority 24-hour turnaround', perSong: false },
  rush48: { label: '48 Hour Rush', price: 25, description: 'Priority 48-hour turnaround', perSong: false },
  stems: { label: 'Stems Export', price: 50, description: 'Individual processed stems', perSong: false },
  ddp: { label: 'DDP Authoring', price: 50, description: 'Master DDP for duplication', perSong: false },
};

export default function Pricing({ navigateTo }: PricingProps) {
  const [serviceType, setServiceType] = useState<'mixing' | 'mastering' | 'bundle'>('mastering');
  const [projectSize, setProjectSize] = useState<'single' | 'ep' | 'album' | 'epAlbum' | 'stemMastering'>('single');
  const [songCount, setSongCount] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleAddOn = (key: string) => {
    setSelectedAddOns(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const getCurrentRates = () => {
    if (serviceType === 'mixing') return mixingRates;
    if (serviceType === 'mastering') return masteringRates;
    return bundleRates;
  };

  const calculateTotal = () => {
    let total = 0;
    
    // Base service cost
    const rates = getCurrentRates();
    const rate = rates[projectSize as keyof typeof rates];
    if (rate) {
      total = rate.perSong ? rate.price * songCount : rate.price;
    }
    
    // Add-ons
    selectedAddOns.forEach(key => {
      const addOn = addOns[key as keyof typeof addOns];
      if (addOn.perSong) {
        total += addOn.price * songCount;
      } else {
        total += addOn.price;
      }
    });
    
    return total;
  };

  const handleProceed = () => {
    navigateTo('options');
  };

  const handleServiceTypeChange = (type: 'mixing' | 'mastering' | 'bundle') => {
    setServiceType(type);
    // Reset project size based on service type
    if (type === 'mastering') {
      setProjectSize('single');
    } else {
      setProjectSize('single');
    }
    setSongCount(1);
  };

  const handleProjectSizeChange = (key: string) => {
    setProjectSize(key as any);
    if (key === 'single') setSongCount(1);
    else if (key === 'ep' || key === 'epAlbum') setSongCount(4);
    else setSongCount(8);
  };

  const getMinSongs = () => {
    if (projectSize === 'ep' || projectSize === 'epAlbum') return 3;
    if (projectSize === 'album') return 6;
    return 1;
  };

  const getMaxSongs = () => {
    if (projectSize === 'ep' || projectSize === 'epAlbum') return 5;
    if (projectSize === 'album') return 20;
    return 1;
  };

  return (
    <div className="min-h-screen bg-dark pt-24 pb-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigateTo('home')}
          className={`flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 mb-8 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div 
          className={`text-center mb-12 transition-all duration-700 ease-expo-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-chrome/10 border border-chrome/20 rounded-full mb-6">
            <Calculator className="w-5 h-5 text-chrome" />
            <span className="text-sm text-gray-300">Project Calculator</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Get Your <span className="metallic-text">Quote</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Select your project details below to get an instant estimate. 
            Final pricing may vary based on project complexity.
          </p>
        </div>

        {/* Service Type Selection */}
        <div 
          className={`tech-card rounded-2xl p-6 mb-6 transition-all duration-700 ease-expo-out delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Music className="w-5 h-5 text-chrome" />
            Select Service
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { key: 'mixing', label: 'Mixing Only', icon: Music },
              { key: 'mastering', label: 'Mastering Only', icon: Disc },
              { key: 'bundle', label: 'Mix + Master Bundle', icon: Zap },
            ].map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.key}
                  onClick={() => handleServiceTypeChange(option.key as any)}
                  className={`relative p-4 rounded-xl border transition-all duration-300 text-left ${
                    serviceType === option.key
                      ? 'bg-chrome/10 border-chrome/50 shadow-glow'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-2 ${serviceType === option.key ? 'text-chrome' : 'text-gray-400'}`} />
                  <div className="text-white font-medium">{option.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Size */}
        <div 
          className={`tech-card rounded-2xl p-6 mb-6 transition-all duration-700 ease-expo-out delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-lg font-semibold text-white mb-4">Project Size</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {Object.entries(getCurrentRates()).map(([key, rate]) => (
              <button
                key={key}
                onClick={() => handleProjectSizeChange(key)}
                className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                  projectSize === key
                    ? 'bg-chrome/10 border-chrome/50 shadow-glow'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="text-white font-medium">{rate.label}</div>
                <div className="text-chrome text-lg font-bold mt-1">
                  ${rate.price}{rate.perSong && '/song'}
                </div>
                <div className="text-gray-500 text-xs mt-1">{rate.description}</div>
              </button>
            ))}
          </div>

          {/* Song Count Slider */}
          {projectSize !== 'single' && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <label className="text-gray-300">Number of Songs</label>
                <span className="text-2xl font-bold text-chrome">{songCount}</span>
              </div>
              <input
                type="range"
                min={getMinSongs()}
                max={getMaxSongs()}
                value={songCount}
                onChange={(e) => setSongCount(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{getMinSongs()}</span>
                <span>{getMaxSongs()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Add-ons */}
        <div 
          className={`tech-card rounded-2xl p-6 mb-6 transition-all duration-700 ease-expo-out delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-lg font-semibold text-white mb-4">Add-ons</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {Object.entries(addOns).map(([key, addOn]) => (
              <button
                key={key}
                onClick={() => toggleAddOn(key)}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                  selectedAddOns.includes(key)
                    ? 'bg-chrome/10 border-chrome/50'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                  selectedAddOns.includes(key)
                    ? 'bg-chrome border-chrome'
                    : 'border-gray-500'
                }`}>
                  {selectedAddOns.includes(key) && <Check className="w-3 h-3 text-dark" />}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white text-sm">{addOn.label}</div>
                  <div className="text-gray-500 text-xs">{addOn.description}</div>
                </div>
                <div className="text-chrome font-semibold">
                  ${addOn.price}{addOn.perSong && '/song'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Total & CTA */}
        <div 
          className={`tech-card rounded-2xl p-6 transition-all duration-700 ease-expo-out delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-gray-400 text-sm mb-1">Estimated Total</div>
              <div className="text-4xl font-bold metallic-text">${calculateTotal()}</div>
              <div className="text-gray-500 text-xs mt-1">
                {songCount > 1 && `${songCount} songs`}
                {selectedAddOns.length > 0 && ` • ${selectedAddOns.length} add-on${selectedAddOns.length > 1 ? 's' : ''}`}
              </div>
            </div>
            <button
              onClick={handleProceed}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-chrome to-silver text-dark font-bold rounded-xl hover:shadow-glow transition-all duration-300"
            >
              Proceed to Options
            </button>
          </div>
          <div className="flex items-center gap-2 mt-4 text-gray-500 text-xs">
            <Info className="w-4 h-4" />
            <span>This is an estimate. Final pricing will be confirmed after project review.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
