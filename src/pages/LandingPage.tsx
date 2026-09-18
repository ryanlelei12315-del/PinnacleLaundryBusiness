import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu, X, Phone, MapPin, ChevronDown, ChevronRight,
  Star, CheckCircle, ArrowRight, Shirt, Thermometer,
  Package, Layers, Truck, RefreshCw, Clock, Shield,
  DollarSign, Search
} from 'lucide-react';

const WashingMachineIllustration = () => (
  <div className="relative w-72 h-72 mx-auto">
    {/* Outer body */}
    <div className="absolute inset-4 rounded-2xl shadow-2xl"
      style={{ background: 'linear-gradient(145deg, #e8f4fb 0%, #c8e6f5 50%, #a8d5ef 100%)', border: '3px solid #7bbde0' }}>
      {/* Top panel */}
      <div className="h-12 rounded-t-xl mx-1 mt-1 flex items-center px-4 gap-2"
        style={{ background: 'linear-gradient(90deg, #1e4d7a, #0369a1)' }}>
        <div className="w-3 h-3 rounded-full bg-cyan-300 shadow-lg" />
        <div className="w-3 h-3 rounded-full bg-green-400 shadow-lg" />
        <div className="flex-1" />
        <div className="text-white text-xs font-bold font-mono">30°</div>
      </div>
      {/* Door */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden"
        style={{ background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9) 0%, rgba(100,180,230,0.7) 50%, rgba(30,90,160,0.9) 100%)' }}>
        {/* Drum lines */}
        <div className="absolute inset-2 rounded-full border-2 border-white/30" />
        <div className="absolute inset-5 rounded-full border border-white/20" />
        {/* Clothes peek */}
        <div className="absolute bottom-3 left-6 w-8 h-6 rounded-full opacity-70"
          style={{ background: 'linear-gradient(135deg, #34d399, #059669)' }} />
        <div className="absolute bottom-5 right-4 w-6 h-5 rounded-full opacity-60"
          style={{ background: 'linear-gradient(135deg, #f9a8d4, #ec4899)' }} />
        <div className="absolute bottom-2 right-8 w-5 h-4 rounded opacity-50"
          style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }} />
      </div>
      {/* Bottom controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-sky-300 bg-white/60" />
        <div className="w-8 h-8 rounded-full border-2 border-sky-300 bg-white/60" />
        <div className="w-14 h-6 rounded-full bg-sky-500 shadow-md" />
      </div>
    </div>
    {/* Floating clothes */}
    <div className="absolute -top-4 -right-4 animate-float" style={{ animationDelay: '0s' }}>
      <div className="w-12 h-10 rounded-lg shadow-lg rotate-12"
        style={{ background: 'linear-gradient(135deg, #34d399, #059669)' }} />
    </div>
    <div className="absolute -top-2 -left-6 animate-float-slow" style={{ animationDelay: '1s' }}>
      <div className="w-10 h-8 rounded-lg shadow-lg -rotate-6"
        style={{ background: 'linear-gradient(135deg, #60a5fa, #2563eb)' }} />
    </div>
    <div className="absolute -bottom-2 -right-6 animate-float" style={{ animationDelay: '2s' }}>
      <div className="w-8 h-6 rounded shadow-lg rotate-3"
        style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }} />
    </div>
    {/* Soap bubbles */}
    <div className="absolute top-8 right-2 animate-float" style={{ animationDelay: '0.5s' }}>
      <div className="w-4 h-4 rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(100,200,255,0.4))' }} />
    </div>
    <div className="absolute top-16 right-0 animate-float-slow" style={{ animationDelay: '1.5s' }}>
      <div className="w-3 h-3 rounded-full opacity-50"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(100,200,255,0.4))' }} />
    </div>
  </div>
);

const services = [
  { icon: Shirt, title: 'Washing', desc: 'Professional washing for everyday clothes.', price: 'KSh 50/kg', color: '#0369a1', bg: '#e0f2fe' },
  { icon: Thermometer, title: 'Ironing', desc: 'Freshly pressed clothes ready to wear.', color: '#059669', bg: '#d1fae5' },
  { icon: Layers, title: 'Folding', desc: 'Neatly folded and organized clothes.', color: '#7c3aed', bg: '#ede9fe' },
  { icon: Package, title: 'Blankets', desc: 'Full blanket cleaning service.', price: 'KSh 250 each', color: '#d97706', bg: '#fef3c7' },
  { icon: Truck, title: 'Pickup', desc: 'Request pickup from your location.', color: '#0ea5e9', bg: '#e0f9ff' },
  { icon: RefreshCw, title: 'Retrieval', desc: 'Collect your completed laundry or request retrieval.', color: '#db2777', bg: '#fce7f3' },
];

const steps = [
  { n: '01', title: 'Book', desc: 'Choose your laundry service, weight, and preferences.' },
  { n: '02', title: 'Drop Off or Request Pickup', desc: 'Bring laundry to us or have us collect from your location.' },
  { n: '03', title: 'We Clean', desc: 'Pinnacle handles washing, ironing, and folding with care.' },
  { n: '04', title: 'Track', desc: 'Monitor your order status every step of the way.' },
  { n: '05', title: 'Collect', desc: 'Get your clean clothes back — delivered or ready for pickup.' },
];

const faqs = [
  { q: 'How much does laundry cost?', a: 'Standard laundry is KSh 50 per kilogram. Blankets are KSh 250 each. Final pricing is confirmed after weighing.' },
  { q: 'Where is Pinnacle Laundry located?', a: 'Near Breeze Point, close to the Student Center.' },
  { q: 'Can I request pickup?', a: 'Yes. Select Request Pickup during booking and provide your location details.' },
  { q: 'Can I take photos of my clothes?', a: 'Yes. The booking process allows you to take or upload laundry photos for identification.' },
  { q: 'How do I pay?', a: 'Payment is made through the Pinnacle M-Pesa Till Number (XXXXX). Enter your M-Pesa transaction code after payment.' },
  { q: 'How long does laundry take?', a: 'Standard turnaround is 24–48 hours. We\'ll notify you when your laundry is ready.' },
];

const testimonials = [
  { name: 'Amina K.', role: 'First Year, Engineering', text: 'Pinnacle saved me so much time. Easy to book, and my clothes came back perfectly clean.', stars: 5 },
  { name: 'David M.', role: 'Third Year, Business', text: 'The pickup feature is amazing. They collect from my hostel and return folded. Highly recommend!', stars: 5 },
  { name: 'Grace W.', role: 'Second Year, Medicine', text: 'Transparent pricing and real-time tracking. Finally a laundry service I can trust.', stars: 5 },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #0369a1, #06b6d4)' }}>P</div>
            <span className="font-bold text-lg" style={{ fontFamily: 'Manrope', color: '#0c1f3a' }}>Pinnacle Laundry</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#services" className="hover:text-sky-600 transition-colors">Services</a>
            <a href="#how-it-works" className="hover:text-sky-600 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-sky-600 transition-colors">Pricing</a>
            <a href="#track" className="hover:text-sky-600 transition-colors">Track Order</a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-sky-600 px-4 py-2 rounded-lg transition-colors">Login</Link>
            <button onClick={() => navigate('/booking')}
              className="text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-sky-200"
              style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
              Book Laundry
            </button>
          </div>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-4">
            <a href="#services" className="text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>How It Works</a>
            <a href="#pricing" className="text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="#track" className="text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>Track Order</a>
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <Link to="/login" className="flex-1 text-center text-sm font-medium border border-gray-200 rounded-xl py-2.5">Login</Link>
              <button onClick={() => navigate('/booking')}
                className="flex-1 text-sm font-semibold text-white rounded-xl py-2.5"
                style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
                Book Laundry
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-24" style={{ background: 'linear-gradient(160deg, #f0f8ff 0%, #e0f2fe 50%, #f0fdf4 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white border border-sky-200 rounded-full px-4 py-1.5 text-sm font-medium text-sky-700 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Student-friendly laundry service
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ color: '#0c1f3a' }}>
              Clean Clothes.<br />
              <span style={{ color: '#0369a1' }}>Zero Hassle.</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              Professional laundry services near Breeze Point and the Student Center. Wash, fold, iron, and collect your clothes with ease.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <button onClick={() => navigate('/booking')}
                className="flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-sky-200 hover:shadow-xl transition-all"
                style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
                Book Laundry <ArrowRight size={18} />
              </button>
              <a href="#how-it-works"
                className="flex items-center gap-2 font-semibold px-8 py-3.5 rounded-xl border-2 border-sky-200 text-sky-700 hover:bg-sky-50 transition-colors">
                How It Works <ChevronRight size={18} />
              </a>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-sky-500" />
                <span>Near Breeze Point • Student Center</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={16} className="text-sky-500" />
                <span>0793002308</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <WashingMachineIllustration />
          </div>
        </div>
        {/* Floating trust badge */}
        <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-3 bg-white rounded-2xl shadow-xl px-5 py-3 border border-sky-100">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#e0f2fe' }}>
            <Shield size={20} style={{ color: '#0369a1' }} />
          </div>
          <div>
            <div className="text-xs text-gray-500">Serving students since</div>
            <div className="font-bold text-sm" style={{ color: '#0c1f3a' }}>Breeze Point Area</div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-4" style={{ color: '#0c1f3a' }}>Our Services</h2>
            <p className="text-gray-500 max-w-md mx-auto">Everything your laundry needs — from washing to delivery.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="card-hover rounded-2xl border border-gray-100 p-6 bg-white shadow-sm group cursor-pointer"
                onClick={() => navigate('/booking')}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: s.bg }}>
                  <s.icon size={26} style={{ color: s.color }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0c1f3a' }}>{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                {s.price && (
                  <div className="font-bold text-base mb-4" style={{ color: s.color }}>{s.price}</div>
                )}
                <div className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: s.color }}>
                  Book Now <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20" style={{ background: '#f0f8ff' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-4" style={{ color: '#0c1f3a' }}>How It Works</h2>
            <p className="text-gray-500">Five simple steps to clean laundry.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {steps.map((step, i) => (
              <div key={step.n} className="flex flex-col items-center text-center group">
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-lg shadow-md"
                    style={{ background: 'linear-gradient(135deg, #0369a1, #06b6d4)', color: 'white' }}>
                    {step.n}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-14 w-full h-0.5"
                      style={{ background: 'linear-gradient(90deg, #0369a1, transparent)' }} />
                  )}
                </div>
                <h3 className="font-bold text-sm mb-2" style={{ color: '#0c1f3a' }}>{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => navigate('/booking')}
              className="text-white font-semibold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
              style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
              Get Started — Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Why Pinnacle */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-4" style={{ color: '#0c1f3a' }}>Why Choose Pinnacle?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: 'Convenient', desc: 'Book your laundry without unnecessary trips.', color: '#0369a1' },
              { icon: DollarSign, title: 'Transparent Pricing', desc: 'Standard laundry from KSh 50/kg.', color: '#059669' },
              { icon: Search, title: 'Easy Tracking', desc: 'Know what stage your laundry is at.', color: '#7c3aed' },
              { icon: Truck, title: 'Flexible Collection', desc: 'Pickup or manual retrieval.', color: '#d97706' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl p-6 border border-gray-100 bg-gray-50 text-center">
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: item.color + '15' }}>
                  <item.icon size={22} style={{ color: item.color }} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: '#0c1f3a' }}>{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20" style={{ background: 'linear-gradient(135deg, #0c1f3a 0%, #0369a1 100%)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-white">Simple, Fair Pricing</h2>
          <p className="text-sky-200 mb-14">No hidden fees. Final price confirmed after weighing.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 text-left">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                <Shirt size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">Standard Laundry</h3>
              <p className="text-sky-200 mb-4">Washing, drying, folding</p>
              <div className="text-5xl font-extrabold text-white mb-1">KSh 50<span className="text-2xl text-sky-300">/kg</span></div>
              <p className="text-sky-300 text-sm">Estimated — final amount after weighing</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 text-left">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                <Package size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">Blankets</h3>
              <p className="text-sky-200 mb-4">Full blanket cleaning</p>
              <div className="text-5xl font-extrabold text-white mb-1">KSh 250<span className="text-2xl text-sky-300">/each</span></div>
              <p className="text-sky-300 text-sm">Per blanket — any size</p>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/booking')}
              className="bg-white font-bold px-10 py-4 rounded-xl hover:bg-sky-50 transition-colors"
              style={{ color: '#0369a1' }}>
              Book Now
            </button>
            <div className="flex items-center gap-3 bg-white/10 rounded-xl px-6 py-4 border border-white/20">
              <Phone size={18} className="text-sky-300" />
              <div className="text-left">
                <div className="text-sky-300 text-xs">Call us</div>
                <div className="text-white font-bold">0793002308</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track Order CTA */}
      <section id="track" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl p-8 md:p-12 border border-sky-100 flex flex-col md:flex-row items-center gap-8"
            style={{ background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)' }}>
            <div className="flex-1">
              <h2 className="text-3xl font-extrabold mb-3" style={{ color: '#0c1f3a' }}>Track Your Laundry</h2>
              <p className="text-gray-500 mb-6">Enter your order ID or check the dashboard to see exactly where your laundry is.</p>
              <div className="flex gap-3">
                <input type="text" placeholder="Order ID — e.g. #PIN-1048"
                  className="flex-1 border border-sky-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white" />
                <button onClick={() => navigate('/dashboard')}
                  className="text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
                  Track
                </button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-xl"
                style={{ background: 'linear-gradient(135deg, #0369a1, #06b6d4)' }}>
                <Search size={40} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-4" style={{ color: '#0c1f3a' }}>What Students Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" stroke="none" />)}
                </div>
                <p className="text-gray-600 mb-5 leading-relaxed text-sm">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: 'linear-gradient(135deg, #0369a1, #06b6d4)' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: '#0c1f3a' }}>{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-4" style={{ color: '#0c1f3a' }}>Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-sm hover:bg-gray-50 transition-colors"
                  style={{ color: '#0c1f3a' }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <ChevronDown size={18} className={`text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16" style={{ background: '#f0f8ff' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold mb-4" style={{ color: '#0c1f3a' }}>Get in Touch</h2>
          <p className="text-gray-500 mb-8">Have questions? Reach us directly.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0793002308"
              className="flex items-center gap-3 bg-white rounded-2xl shadow-sm border border-sky-100 px-6 py-4 hover:shadow-md transition-all">
              <Phone size={20} style={{ color: '#0369a1' }} />
              <div className="text-left">
                <div className="text-xs text-gray-400">Call Us</div>
                <div className="font-bold text-sm" style={{ color: '#0c1f3a' }}>0793002308</div>
              </div>
            </a>
            <div className="flex items-center gap-3 bg-white rounded-2xl shadow-sm border border-sky-100 px-6 py-4">
              <MapPin size={20} style={{ color: '#0369a1' }} />
              <div className="text-left">
                <div className="text-xs text-gray-400">Location</div>
                <div className="font-bold text-sm" style={{ color: '#0c1f3a' }}>Near Breeze Point, Student Center</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #0369a1, #06b6d4)' }}>P</div>
                <span className="font-bold text-lg" style={{ fontFamily: 'Manrope' }}>Pinnacle Laundry</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">"Clean Clothes. Zero Hassle."</p>
              <div className="flex gap-3">
                {['X', 'IG', 'FB'].map(s => (
                  <a key={s} href="#" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-sky-600 transition-colors text-xs text-gray-400 font-bold">{s}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Services</h4>
              {['Washing', 'Ironing', 'Folding', 'Blankets', 'Pickup & Delivery'].map(s => (
                <a key={s} href="#services" className="block text-gray-400 text-sm mb-2 hover:text-white transition-colors">{s}</a>
              ))}
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Company</h4>
              {['Home', 'Services', 'Pricing', 'Track Order', 'Book Laundry', 'Contact'].map(s => (
                <a key={s} href="#" className="block text-gray-400 text-sm mb-2 hover:text-white transition-colors">{s}</a>
              ))}
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Contact</h4>
              <div className="flex items-start gap-2 text-gray-400 text-sm mb-3">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-sky-400" />
                <span>Near Breeze Point, near Student Center</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone size={14} className="text-sky-400" />
                <span>0793002308</span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <span>© 2024 Pinnacle Laundry. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile FAB */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <button onClick={() => navigate('/booking')}
          className="text-white font-bold px-6 py-3.5 rounded-2xl shadow-2xl shadow-sky-300 flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
          Book Laundry <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
