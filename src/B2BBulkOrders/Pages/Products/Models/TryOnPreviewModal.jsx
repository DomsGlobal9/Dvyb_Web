import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Image, Palette, Shirt } from 'lucide-react';
import bg1 from '../../../../assets/ProductsPage/bg1.svg';
import bg2 from '../../../../assets/ProductsPage/bg2.svg';
import bg3 from '../../../../assets/ProductsPage/bg3.svg';
import bg4 from '../../../../assets/ProductsPage/bg4.svg';

const TryOnPreviewModal = ({ isOpen, onClose, tryOnData }) => {
  const [tryOnResult, setTryOnResult] = useState(null);
  const [tryOnResultNoBg, setTryOnResultNoBg] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedTab, setSelectedTab] = useState('colours');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedFabric, setSelectedFabric] = useState('pure-silk');
  const [selectedBlouse, setSelectedBlouse] = useState('traditional');
  const [selectedBackground, setSelectedBackground] = useState('');
  const [backgroundChangedImage, setBackgroundChangedImage] = useState(null);
  const [isChangingBackground, setIsChangingBackground] = useState(false);
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [bgError, setBgError] = useState('');
  const [viewMode, setViewMode] = useState('2D');

  const colors = [
    { name: 'blue', color: '#2C5F7F', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%232C5F7F" width="100" height="100"/%3E%3C/svg%3E' },
    { name: 'yellow', color: '#C4B454', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23C4B454" width="100" height="100"/%3E%3C/svg%3E' },
    { name: 'green', color: '#5FB878', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%235FB878" width="100" height="100"/%3E%3C/svg%3E' },
    { name: 'purple', color: '#4A5EB8', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%234A5EB8" width="100" height="100"/%3E%3C/svg%3E' },
  ];

  const fabricTypes = [
    { id: 'pure-silk', name: 'Pure Silk', category: 'Premium', style: 'Traditional', properties: { drape: 'Light', shine: 'Medium', texture: 'Soft' } },
    { id: 'zari-work', name: 'Zari Work', category: 'Lightweight', style: 'Modern', properties: { drape: 'Medium', shine: 'High', texture: 'Smooth' } },
    { id: 'heavy-silk', name: 'Heavy Silk', category: 'Premium', style: 'Traditional', properties: { drape: 'Heavy', shine: 'Low', texture: 'Rich' } },
  ];

  const blouseDesigns = [
    { id: 'traditional', name: 'Traditional', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23E5E7EB" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%239CA3AF" font-size="12"%3ETraditional%3C/text%3E%3C/svg%3E' },
    { id: 'modern-cut', name: 'Modern Cut', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23E5E7EB" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%239CA3AF" font-size="12"%3EModern%3C/text%3E%3C/svg%3E' },
    { id: 'designer', name: 'Designer', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23E5E7EB" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%239CA3AF" font-size="12"%3EDesigner%3C/text%3E%3C/svg%3E' },
    { id: 'sleeveless', name: 'Sleeveless', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23E5E7EB" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%239CA3AF" font-size="12"%3ESleeveless%3C/text%3E%3C/svg%3E' },
    { id: 'halternek', name: 'Halternek', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23E5E7EB" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%239CA3AF" font-size="12"%3EHalternek%3C/text%3E%3C/svg%3E' },
    { id: 'backless', name: 'Backless', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23E5E7EB" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%239CA3AF" font-size="12"%3EBackless%3C/text%3E%3C/svg%3E' },
  ];

  const backgroundOptions = [
    { id: 'building', name: 'Building', image: bg1 },
    { id: 'hallway', name: 'Hallway', image: bg2 },
    { id: 'trees', name: 'Trees', image: bg3 },
    { id: 'pool', name: 'Pool', image: bg4 },
  ];

  const performTryOn = async () => {
    const { modelImage, garmentImage } = tryOnData || {};
    setIsProcessing(true);
    setErrorMsg('');
    setTryOnResult(null);
    setTryOnResultNoBg(null);

    try {
      const response = await fetch("/api/tryon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelImage, garmentImage }),
      });

      const data = await response.json();

      if (data.output && data.output.length > 0) {
        const resultUrl = data.output[0];
        setTryOnResult(resultUrl);
        await removeBackgroundFromResult(resultUrl);
      } else {
        setErrorMsg("Try-on failed. Please try again with different images.");
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const removeBackgroundFromResult = async (imageUrl) => {
    setIsRemovingBg(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('image_file', blob);
      formData.append('size', 'auto');

      const removeBgResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': 'LieA99SrSnwMttGh3zPYbCRV', // consider proxying this server-side
        },
        body: formData,
      });

      if (!removeBgResponse.ok) {
        throw new Error(`Remove.bg failed: ${removeBgResponse.status}`);
      }

      const removedBgBlob = await removeBgResponse.blob();
      const noBgUrl = URL.createObjectURL(removedBgBlob);
      setTryOnResultNoBg(noBgUrl);
    } catch (error) {
      console.error('Background removal failed:', error);
    } finally {
      setIsRemovingBg(false);
    }
  };

  useEffect(() => {
    const { modelImage, garmentImage } = tryOnData || {};
    if (isOpen && modelImage && garmentImage) {
      performTryOn();
    }
  }, [isOpen, tryOnData]);

  if (!isOpen) return null;

  // ----- HiDPI background compositor (sharper output) -----
  const changeBackground = async (backgroundType) => {
    if (!tryOnResultNoBg) {
      setBgError("Background removal in progress...");
      return;
    }

    setIsChangingBackground(true);
    setBgError('');
    setSelectedBackground(backgroundType);

    try {
      const selectedBg = backgroundOptions.find(bg => bg.id === backgroundType);
      const [bgImg, personImg] = await Promise.all([
        loadImg(selectedBg.image),
        loadImg(tryOnResultNoBg),
      ]);

      const OUT_W = 900;   // logical CSS pixels
      const OUT_H = 1200;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const canvas = document.createElement('canvas');
      canvas.width = OUT_W * dpr;
      canvas.height = OUT_H * dpr;
      canvas.style.width = `${OUT_W}px`;
      canvas.style.height = `${OUT_H}px`;

      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw BG
      ctx.drawImage(bgImg, 0, 0, OUT_W, OUT_H);

      // Fit person
      const maxPersonW = OUT_W * 0.64;
      const maxPersonH = OUT_H * 0.9;
      let pw = personImg.naturalWidth || personImg.width;
      let ph = personImg.naturalHeight || personImg.height;

      const scale = Math.min(maxPersonW / pw, maxPersonH / ph, 1); // don't upscale low-res source
      pw *= scale; ph *= scale;

      const px = (OUT_W - pw) / 2;
      const py = OUT_H - ph;

      ctx.drawImage(personImg, px, py, pw, ph);

      canvas.toBlob((blob) => {
        if (!blob) {
          setBgError("Failed to create image");
          setIsChangingBackground(false);
          return;
        }
        const finalUrl = URL.createObjectURL(blob);
        setBackgroundChangedImage(finalUrl);
      }, 'image/png'); // PNG = lossless
    } catch (error) {
      console.error("Background change failed:", error);
      setBgError(error.message || "Failed to change background. Please try again.");
    } finally {
      setIsChangingBackground(false);
    }
  };

  // Prefer composed -> cut-out -> original
  const getCurrentDisplayImage = () => {
    return backgroundChangedImage || tryOnResultNoBg || tryOnResult;
  };

  const handleReset = () => {
    setSelectedBackground('');
    setBackgroundChangedImage(null);
    setBgError('');
  };

  return (
    <div
      className="fixed inset-0 z-50"
      style={{
        backgroundImage: selectedBackground ? `url(${backgroundOptions.find(bg => bg.id === selectedBackground)?.image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {selectedBackground && <div className="absolute inset-0 bg-black/10"></div>}

      {/* STAGE: centered preview area with contain (no stretching) */}
      <div
        className="absolute inset-0 w-full h-full flex items-center justify-center"
        style={{
          background: selectedBackground ? 'transparent' : 'radial-gradient(80% 80% at 50% 20%, #1f2937 0%, #111827 100%)'
        }}
      >
        {isProcessing ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p className="font-semibold text-lg">Processing try-on...</p>
            <p className="text-sm text-gray-300 mt-2">This may take a few moments</p>
          </div>
        ) : errorMsg ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 text-white">
            <div className="text-red-400 text-5xl mb-4">⚠️</div>
            <p className="font-semibold text-lg mb-2">Try-on failed</p>
            <p className="text-sm text-gray-300 mb-6">{errorMsg}</p>
            <button
              onClick={performTryOn}
              className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl font-medium"
            >
              Try Again
            </button>
          </div>
        ) : getCurrentDisplayImage() ? (
          <div
            className="
              relative 
              max-w-[48vw] xl:max-w-[40vw] lg:max-w-[46vw] md:max-w-[56vw] sm:max-w-[80vw]
              max-h-[82vh]
            "
          >
            <img
              src={getCurrentDisplayImage()}
              alt="Try-on result"
              className="w-full h-[500px] object-contain drop-shadow-2xl rounded-xl"
              draggable={false}
            />
            {(isChangingBackground || isRemovingBg) && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-xl">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent mb-2 mx-auto"></div>
                  <p className="text-sm font-medium">
                    {isRemovingBg ? 'Preparing image...' : 'Changing background...'}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <div className="text-center">
              <div className="text-6xl mb-4">👗</div>
              <p className="text-lg font-medium">Try-on result will appear here</p>
            </div>
          </div>
        )}
      </div>

      {/* TOP CENTER CONTROLS */}
      <div className={`absolute z-20 flex gap-3 transition-all duration-300 ${
        selectedBackground ? 'top-6 left-6' : 'top-6 left-1/2 transform -translate-x-1/2'
      }`}>
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow hover:shadow-md transition-all text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Product
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow hover:shadow-md transition-all text-sm font-medium"
        >
          <RotateCcw size={16} />
          Reset
        </button>

        <div className="flex bg-white rounded-full shadow-lg overflow-hidden">
          <button
            onClick={() => setViewMode('2D')}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              viewMode === '2D' ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-600'
            }`}
          >
            2D
          </button>
          <button
            onClick={() => setViewMode('3D')}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              viewMode === '3D' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            3D
          </button>
        </div>
      </div>

      {/* LEFT BOTTOM PANEL - CUSTOMIZATION */}
      <div className="absolute bottom-6 left-6 z-20 w-80 max-h-[calc(100vh-180px)] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 overflow-y-auto">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-5 h-5 text-gray-700" />
            <h3 className="text-base font-semibold text-gray-800">Customize Outfit</h3>
          </div>
          <p className="text-xs text-gray-600">Try different colors, fabrics, and styles</p>
        </div>

        <div className="flex gap-2 mb-6 bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setSelectedTab('colours')}
            className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedTab === 'colours' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Colours
          </button>
          <button
            onClick={() => setSelectedTab('fabrics')}
            className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedTab === 'fabrics' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Fabrics
          </button>
          <button
            onClick={() => setSelectedTab('blouse')}
            className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedTab === 'blouse' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Blouse
          </button>
        </div>

        <div className="space-y-4">
          {selectedTab === 'colours' && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                Colour: <span className="uppercase text-gray-900">{selectedColor}</span>
              </p>
              <div className="grid grid-cols-4 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`aspect-square rounded-xl transition-all ${
                      selectedColor === color.name
                        ? 'ring-2 ring-blue-500 ring-offset-2 shadow-lg scale-105'
                        : 'hover:scale-105 shadow'
                    }`}
                    style={{ backgroundColor: color.color }}
                  />
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'fabrics' && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Fabric Type</p>
              <div className="space-y-3">
                {fabricTypes.map((fabric) => (
                  <button
                    key={fabric.id}
                    onClick={() => setSelectedFabric(fabric.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedFabric === fabric.id
                        ? 'bg-blue-50 border-2 border-blue-500 shadow-md'
                        : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow'
                    }`}
                  >
                    <div className="font-medium text-gray-900 text-sm mb-1">{fabric.name}</div>
                    <div className="text-xs text-gray-500">{fabric.category} • {fabric.style}</div>
                  </button>
                ))}

                {selectedFabric && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Fabric Properties</p>
                    <div className="space-y-1">
                      {Object.entries(fabricTypes.find(f => f.id === selectedFabric)?.properties || {}).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-gray-600 capitalize">{key}:</span>
                          <span className="font-medium text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedTab === 'blouse' && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Blouse Design</p>
              <div className="grid grid-cols-3 gap-3">
                {blouseDesigns.map((design) => (
                  <button
                    key={design.id}
                    onClick={() => setSelectedBlouse(design.id)}
                    className={`rounded-xl overflow-hidden transition-all ${
                      selectedBlouse === design.id
                        ? 'ring-2 ring-blue-500 ring-offset-2 shadow-lg scale-105'
                        : 'hover:scale-105 shadow border border-gray-200'
                    }`}
                  >
                    <div className="aspect-square bg-gray-100">
                      <img src={design.image} alt={design.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2 bg-white">
                      <p className="text-xs font-medium text-gray-900 text-center">{design.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT BOTTOM PANEL - SCENES & ACTIONS */}
      <div className="absolute bottom-6 right-6 z-20 w-80 max-h-[calc(100vh-180px)] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 overflow-y-auto">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Image className="w-5 h-5 text-gray-700" />
            <h3 className="text-base font-semibold text-gray-800">Scenes</h3>
          </div>
          <p className="text-xs text-gray-600 mb-4">Backgrounds</p>
        </div>

        {bgError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs">
            {bgError}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-6">
          {backgroundOptions.map((bg) => (
            <button
              key={bg.id}
              onClick={() => changeBackground(bg.id)}
              disabled={!tryOnResultNoBg || isChangingBackground}
              className={`relative rounded-xl overflow-hidden transition-all ${
                selectedBackground === bg.id
                  ? 'ring-2 ring-blue-500 ring-offset-2 shadow-lg scale-105'
                  : 'hover:scale-105 shadow-md'
              } ${!tryOnResultNoBg ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="aspect-[4/3]">
                <img
                  src={bg.image}
                  alt={bg.name}
                  className="w-full h-full object-cover [image-rendering:auto]"
                  draggable={false}
                />
              </div>
              {isChangingBackground && selectedBackground === bg.id && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-3">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-red-400 to-pink-500 text-white py-3 rounded-full hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2">
              <Shirt className="w-4 h-4" />
              Add to Bag
            </button>
            <button className="w-full bg-white border border-gray-300 py-3 rounded-full hover:shadow-md transition-all font-medium flex items-center justify-center gap-2">
              ♥ Add to Wishlist
            </button>
            <button className="w-full bg-white border border-gray-300 py-3 rounded-full hover:shadow-md transition-all font-medium flex items-center justify-center gap-2">
              ↗ Share Look
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// small helper
function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export default TryOnPreviewModal;
