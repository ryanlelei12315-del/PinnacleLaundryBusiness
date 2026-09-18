import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, Camera, Upload, X, MapPin,
  Check, Truck, Package, Shirt, Thermometer, Layers, Phone,
  Clock, AlertCircle, ZoomIn
} from 'lucide-react';

const SERVICES = [
  { id: 'washing', icon: Shirt, label: 'Washing', price: 50, unit: '/kg', color: '#0369a1', bg: '#e0f2fe' },
  { id: 'ironing', icon: Thermometer, label: 'Ironing', color: '#059669', bg: '#d1fae5' },
  { id: 'folding', icon: Layers, label: 'Folding', color: '#7c3aed', bg: '#ede9fe' },
  { id: 'blankets', icon: Package, label: 'Blankets', price: 250, unit: '/each', color: '#d97706', bg: '#fef3c7' },
];

const WEIGHTS = ['0.5', '1', '2', '3', '5', '10'];

type PhotoItem = { id: string; url: string; name: string };

export default function BookingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>(['washing']);
  const [weight, setWeight] = useState('3');
  const [customWeight, setCustomWeight] = useState('');
  const [blankets, setBlankets] = useState(1);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [retrievalMode, setRetrievalMode] = useState<'pickup' | 'manual' | null>(null);
  const [pickupForm, setPickupForm] = useState({ phone: '07XXXXXXXX', instructions: '', time: '10:00 AM' });
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleService = (id: string) => {
    setSelectedServices(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);
  };

  const actualWeight = customWeight ? parseFloat(customWeight) : parseFloat(weight);
  const washingCost = selectedServices.includes('washing') ? actualWeight * 50 : 0;
  const blanketCost = selectedServices.includes('blankets') ? blankets * 250 : 0;
  const total = washingCost + blanketCost;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPhotos = files.map(f => ({
      id: Math.random().toString(36).slice(2),
      url: URL.createObjectURL(f),
      name: f.name
    }));
    setPhotos(p => [...p, ...newPhotos]);
  };

  const removePhoto = (id: string) => setPhotos(p => p.filter(ph => ph.id !== id));

  const steps = [
    { n: 1, label: 'Service' },
    { n: 2, label: 'Quantity' },
    { n: 3, label: 'Photos' },
    { n: 4, label: 'Collection' },
    { n: 5, label: 'Review' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#f0f8ff' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #0369a1, #06b6d4)' }}>P</div>
            <span className="font-bold text-sm hidden sm:block" style={{ fontFamily: 'Manrope', color: '#0c1f3a' }}>Pinnacle Laundry</span>
          </Link>
          <div className="flex-1" />
          {/* Step indicators */}
          <div className="flex items-center gap-1.5">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-center gap-1.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                  ${step === s.n ? 'bg-sky-600 text-white shadow-md shadow-sky-200' :
                  step > s.n ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step > s.n ? <Check size={13} /> : s.n}
                </div>
                <span className={`text-xs hidden sm:block ${step === s.n ? 'text-sky-600 font-semibold' : 'text-gray-400'}`}>{s.label}</span>
                {i < steps.length - 1 && <div className="w-4 h-0.5 bg-gray-200 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Step 1: Select Services */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: '#0c1f3a' }}>Select Services</h2>
            <p className="text-gray-500 text-sm mb-8">Choose what you need done. Select all that apply.</p>
            <div className="grid grid-cols-2 gap-4">
              {SERVICES.map(s => (
                <button key={s.id} onClick={() => toggleService(s.id)}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${selectedServices.includes(s.id)
                    ? 'border-sky-500 shadow-md shadow-sky-100' : 'border-gray-200 bg-white hover:border-sky-300'}`}
                  style={{ background: selectedServices.includes(s.id) ? s.bg : 'white' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                      <s.icon size={20} style={{ color: s.color }} />
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                      ${selectedServices.includes(s.id) ? 'bg-sky-500 border-sky-500' : 'border-gray-300'}`}>
                      {selectedServices.includes(s.id) && <Check size={12} className="text-white" />}
                    </div>
                  </div>
                  <div className="font-bold text-sm mb-0.5" style={{ color: '#0c1f3a' }}>{s.label}</div>
                  {s.price && <div className="text-xs font-semibold" style={{ color: s.color }}>KSh {s.price}{s.unit}</div>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Quantity */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: '#0c1f3a' }}>Laundry Quantity</h2>
            <p className="text-gray-500 text-sm mb-8">Estimate your laundry weight. Final price is confirmed after weighing.</p>

            {selectedServices.includes('washing') && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
                <h3 className="font-bold mb-4" style={{ color: '#0c1f3a' }}>Laundry Weight</h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {WEIGHTS.map(w => (
                    <button key={w} onClick={() => { setWeight(w); setCustomWeight(''); }}
                      className={`py-3 rounded-xl font-semibold text-sm border-2 transition-all
                        ${weight === w && !customWeight ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-gray-200 bg-white text-gray-600 hover:border-sky-300'}`}>
                      {w} kg
                    </button>
                  ))}
                  <button onClick={() => setWeight('')}
                    className={`py-3 rounded-xl font-semibold text-sm border-2 transition-all
                      ${customWeight !== '' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-gray-200 bg-white text-gray-600 hover:border-sky-300'}`}>
                    Custom
                  </button>
                </div>
                {(customWeight !== '' || (!WEIGHTS.includes(weight) && weight !== '')) && (
                  <div className="flex items-center gap-3">
                    <input type="number" placeholder="Enter kg" value={customWeight}
                      onChange={e => setCustomWeight(e.target.value)}
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                    <span className="text-sm text-gray-500">kg</span>
                  </div>
                )}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-gray-500">{actualWeight || 0} kg × KSh 50</span>
                  <span className="font-bold text-sky-700">KSh {washingCost}</span>
                </div>
              </div>
            )}

            {selectedServices.includes('blankets') && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
                <h3 className="font-bold mb-4" style={{ color: '#0c1f3a' }}>Number of Blankets</h3>
                <div className="flex items-center gap-4">
                  <button onClick={() => setBlankets(b => Math.max(1, b - 1))}
                    className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-sky-400">−</button>
                  <span className="text-2xl font-extrabold w-12 text-center" style={{ color: '#0c1f3a' }}>{blankets}</span>
                  <button onClick={() => setBlankets(b => b + 1)}
                    className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-sky-400">+</button>
                  <div className="flex-1 text-right">
                    <span className="text-sm text-gray-500">{blankets} × KSh 250</span>
                    <div className="font-bold text-amber-600">KSh {blanketCost}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Total estimate */}
            <div className="rounded-2xl p-5 border border-sky-200"
              style={{ background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)' }}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold" style={{ color: '#0c1f3a' }}>Estimated Total</span>
                <span className="text-2xl font-extrabold text-sky-700">KSh {total}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-600">
                <AlertCircle size={13} />
                Estimated price — final amount confirmed after weighing.
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Photos */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: '#0c1f3a' }}>Show Us Your Laundry</h2>
            <p className="text-gray-500 text-sm mb-2">Take photos of your clothes so our team can identify your order.</p>
            <p className="text-xs text-sky-600 mb-8">Make sure the clothes are clearly visible.</p>

            {!showCamera ? (
              <>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button onClick={() => setShowCamera(true)}
                    className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed border-sky-300 bg-sky-50 hover:bg-sky-100 transition-colors">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #0369a1, #06b6d4)' }}>
                      <Camera size={24} className="text-white" />
                    </div>
                    <span className="font-semibold text-sm text-sky-700">Take Photo</span>
                  </button>
                  <button onClick={() => fileRef.current?.click()}
                    className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-200">
                      <Upload size={24} className="text-gray-500" />
                    </div>
                    <span className="font-semibold text-sm text-gray-600">Upload From Device</span>
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} />
                </div>

                {photos.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 text-sm" style={{ color: '#0c1f3a' }}>Photos Added ({photos.length})</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {photos.map(ph => (
                        <div key={ph.id} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                          <img src={ph.url} alt={ph.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button onClick={() => setPreviewPhoto(ph.url)}
                              className="w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center">
                              <ZoomIn size={14} className="text-gray-700" />
                            </button>
                            <button onClick={() => removePhoto(ph.id)}
                              className="w-8 h-8 rounded-lg bg-red-500/90 flex items-center justify-center">
                              <X size={14} className="text-white" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 p-4 rounded-xl bg-sky-50 border border-sky-100 text-xs text-sky-700">
                  Your laundry photos are used only to help identify and process your order. They are visible only to authorized Pinnacle staff.
                </div>
              </>
            ) : (
              /* Camera UI */
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-900">
                <div className="relative aspect-video bg-gray-800 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Camera size={48} className="mx-auto mb-3 opacity-40" />
                    <p className="text-sm">Camera Preview</p>
                    <p className="text-xs mt-1 opacity-60">Live camera would appear here</p>
                  </div>
                  {/* Camera controls overlay */}
                  <div className="absolute top-4 left-4 flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">⚡</div>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">↺</div>
                  </div>
                </div>
                <div className="bg-gray-900 p-6 flex items-center justify-center gap-8">
                  <button onClick={() => setShowCamera(false)} className="text-white/60 text-sm">Cancel</button>
                  <button
                    onClick={() => {
                      setPhotos(p => [...p, { id: Math.random().toString(36).slice(2), url: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format`, name: 'photo.jpg' }]);
                      setShowCamera(false);
                    }}
                    className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-white/20 hover:bg-white/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white" />
                  </button>
                  <div className="w-16" />
                </div>
              </div>
            )}

            {/* Photo preview modal */}
            {previewPhoto && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setPreviewPhoto(null)}>
                <div className="relative max-w-lg w-full">
                  <img src={previewPhoto} alt="Preview" className="w-full rounded-2xl" />
                  <button onClick={() => setPreviewPhoto(null)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white">
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Collection */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: '#0c1f3a' }}>How Would You Like to Receive Your Laundry?</h2>
            <p className="text-gray-500 text-sm mb-8">Choose your preferred collection method.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <button onClick={() => setRetrievalMode('pickup')}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${retrievalMode === 'pickup' ? 'border-sky-500 bg-sky-50' : 'border-gray-200 bg-white hover:border-sky-300'}`}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: retrievalMode === 'pickup' ? '#e0f2fe' : '#f3f4f6' }}>
                  <Truck size={24} style={{ color: retrievalMode === 'pickup' ? '#0369a1' : '#9ca3af' }} />
                </div>
                <div className="font-bold mb-1" style={{ color: '#0c1f3a' }}>Request Pickup</div>
                <p className="text-sm text-gray-500">Pinnacle crew collects clothes from your location.</p>
                {retrievalMode === 'pickup' && (
                  <div className="mt-2 flex items-center gap-1 text-sky-600 text-xs font-semibold">
                    <Check size={13} /> Selected
                  </div>
                )}
              </button>

              <button onClick={() => setRetrievalMode('manual')}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${retrievalMode === 'manual' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-green-300'}`}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: retrievalMode === 'manual' ? '#d1fae5' : '#f3f4f6' }}>
                  <MapPin size={24} style={{ color: retrievalMode === 'manual' ? '#059669' : '#9ca3af' }} />
                </div>
                <div className="font-bold mb-1" style={{ color: '#0c1f3a' }}>Manual Drop-Off / Retrieval</div>
                <p className="text-sm text-gray-500">Bring laundry to Pinnacle or collect manually.</p>
                {retrievalMode === 'manual' && (
                  <div className="mt-2 flex items-center gap-1 text-green-600 text-xs font-semibold">
                    <Check size={13} /> Selected
                  </div>
                )}
              </button>
            </div>

            {retrievalMode === 'pickup' && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold mb-4" style={{ color: '#0c1f3a' }}>Pickup Details</h3>
                {/* Map placeholder */}
                <div className="rounded-xl overflow-hidden border border-gray-200 mb-4 relative"
                  style={{ height: 160, background: 'linear-gradient(135deg, #e0f2fe, #bfdbfe)' }}>
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div>
                      <div className="text-sky-600 text-xs font-semibold mb-1">Google Maps Integration</div>
                      <MapPin size={32} className="mx-auto text-sky-500" />
                      <div className="text-xs text-sky-700 mt-1 font-medium">Near Student Center</div>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button className="w-7 h-7 bg-white rounded shadow flex items-center justify-center text-gray-600 text-sm font-bold">+</button>
                    <button className="w-7 h-7 bg-white rounded shadow flex items-center justify-center text-gray-600 text-sm font-bold">−</button>
                  </div>
                  {/* Accuracy circle hint */}
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <button className="text-xs bg-white rounded-lg px-3 py-1.5 shadow font-medium text-sky-700 flex items-center gap-1">
                      <MapPin size={12} /> Use My Location
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 block mb-1">Your Phone</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                      <Phone size={16} className="text-gray-400" />
                      <input type="tel" value={pickupForm.phone}
                        onChange={e => setPickupForm(f => ({ ...f, phone: e.target.value }))}
                        className="flex-1 text-sm outline-none bg-transparent" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 block mb-1">Pickup Instructions</label>
                    <textarea rows={2} placeholder="Hostel/block/building and any useful directions..."
                      value={pickupForm.instructions}
                      onChange={e => setPickupForm(f => ({ ...f, instructions: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 block mb-1">Preferred Pickup Time</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                      <Clock size={16} className="text-gray-400" />
                      <input type="time" value="10:00"
                        className="flex-1 text-sm outline-none bg-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {retrievalMode === 'manual' && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold mb-3" style={{ color: '#0c1f3a' }}>Drop-Off Location</h3>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#d1fae5' }}>
                    <MapPin size={20} style={{ color: '#059669' }} />
                  </div>
                  <div>
                    <div className="font-bold text-sm mb-1" style={{ color: '#0c1f3a' }}>Pinnacle Laundry</div>
                    <div className="text-sm text-gray-500">Near Breeze Point, near Student Center</div>
                    <div className="text-sm text-gray-500 mt-1">Tel: 0793002308</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: '#0c1f3a' }}>Review Your Order</h2>
            <p className="text-gray-500 text-sm mb-8">Confirm your booking details before proceeding.</p>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
              <div className="p-5 border-b border-gray-100">
                <div className="text-xs text-gray-400 mb-1">Services</div>
                <div className="flex flex-wrap gap-2">
                  {selectedServices.map(s => (
                    <span key={s} className="badge text-xs" style={{ background: '#e0f2fe', color: '#0369a1' }}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
              {selectedServices.includes('washing') && (
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">Laundry</div>
                    <div className="font-semibold text-sm">{actualWeight} kg × KSh 50</div>
                  </div>
                  <div className="font-bold text-sky-700">KSh {washingCost}</div>
                </div>
              )}
              {selectedServices.includes('blankets') && (
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">Blankets</div>
                    <div className="font-semibold text-sm">{blankets} × KSh 250</div>
                  </div>
                  <div className="font-bold text-amber-600">KSh {blanketCost}</div>
                </div>
              )}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Photos</div>
                  <div className="font-semibold text-sm">{photos.length} photo{photos.length !== 1 ? 's' : ''} added</div>
                </div>
              </div>
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Collection Method</div>
                  <div className="font-semibold text-sm">{retrievalMode === 'pickup' ? 'Pickup Requested' : 'Manual Drop-Off / Retrieval'}</div>
                </div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: retrievalMode === 'pickup' ? '#e0f2fe' : '#d1fae5' }}>
                  {retrievalMode === 'pickup' ? <Truck size={16} style={{ color: '#0369a1' }} /> : <MapPin size={16} style={{ color: '#059669' }} />}
                </div>
              </div>
              <div className="p-5 flex items-center justify-between bg-sky-50">
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Estimated Total</div>
                  <div className="text-xs text-amber-600">Final amount confirmed after weighing</div>
                </div>
                <div className="text-2xl font-extrabold text-sky-700">KSh {total}</div>
              </div>
            </div>

            {/* Payment instructions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
              <h3 className="font-bold mb-3 text-sm" style={{ color: '#0c1f3a' }}>Payment via M-Pesa</h3>
              <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-green-50 border border-green-200">
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">M-Pesa Till Number</div>
                  <div className="font-bold text-lg text-green-700">XXXXX</div>
                  <div className="text-xs text-amber-600">Placeholder — real number to be added</div>
                </div>
                <button className="text-xs font-semibold text-green-700 border border-green-300 rounded-lg px-3 py-1.5 hover:bg-green-100">
                  Copy
                </button>
              </div>
              <ol className="text-xs text-gray-500 flex flex-col gap-1.5 list-decimal list-inside">
                <li>Open M-Pesa</li>
                <li>Select Lipa na M-Pesa</li>
                <li>Select Buy Goods and Services</li>
                <li>Enter the Pinnacle Till Number</li>
                <li>Enter KSh {total} (estimated)</li>
                <li>Confirm payment and save the code</li>
              </ol>
            </div>

            <button onClick={() => navigate('/dashboard')}
              className="w-full text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-lg transition-all text-base"
              style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
              Confirm Booking <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-8">
          <button onClick={() => step === 1 ? navigate('/') : setStep(s => s - 1)}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
            <ChevronLeft size={18} /> {step === 1 ? 'Back to Home' : 'Back'}
          </button>
          {step < 5 && (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={
                (step === 1 && selectedServices.length === 0) ||
                (step === 4 && !retrievalMode)
              }
              className="flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-xl transition-all hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
              Continue <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
