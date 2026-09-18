import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'admin') navigate('/admin');
    else navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#f0f8ff' }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-96 p-10 text-white"
        style={{ background: 'linear-gradient(160deg, #0c1f3a 0%, #0369a1 100%)' }}>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold bg-white/20">P</div>
          <span className="font-bold text-lg" style={{ fontFamily: 'Manrope' }}>Pinnacle Laundry</span>
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold mb-4" style={{ fontFamily: 'Manrope' }}>
            "Clean Clothes.<br />Zero Hassle."
          </h2>
          <p className="text-sky-200 text-sm leading-relaxed">
            Professional laundry service near Breeze Point and the Student Center.
          </p>
        </div>
        <div className="text-sky-300 text-xs">Near Breeze Point • Student Center • 0793002308</div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #0369a1, #06b6d4)' }}>P</div>
            <span className="font-bold" style={{ fontFamily: 'Manrope', color: '#0c1f3a' }}>Pinnacle Laundry</span>
          </Link>

          <h1 className="text-3xl font-extrabold mb-2" style={{ color: '#0c1f3a' }}>Welcome back</h1>
          <p className="text-gray-500 mb-8">Sign in to your account.</p>

          {/* Role toggle */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-8">
            {(['customer', 'admin'] as const).map((r) => (
              <button key={r} onClick={() => setRole(r)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === r ? 'bg-white shadow text-sky-700' : 'text-gray-500 hover:text-gray-700'}`}>
                {r === 'customer' ? 'Customer' : 'Admin / Crew'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#0c1f3a' }}>
                {role === 'admin' ? 'Admin Email' : 'Email or Phone'}
              </label>
              <input
                type="text" value={email} onChange={e => setEmail(e.target.value)}
                placeholder={role === 'admin' ? 'admin@pinnaclelaundry.co.ke' : 'you@example.com or 07XXXXXXXX'}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium" style={{ color: '#0c1f3a' }}>Password</label>
                <a href="#" className="text-xs text-sky-600 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit"
              className="w-full text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all mt-2"
              style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
              Sign In <ArrowRight size={18} />
            </button>
          </form>

          {role === 'customer' && (
            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-sky-600 font-semibold hover:underline">Create one</Link>
            </p>
          )}

          {role === 'admin' && (
            <div className="mt-6 p-4 rounded-xl border border-amber-200 bg-amber-50 text-xs text-amber-700">
              Admin access is restricted to authorized Pinnacle Laundry staff only.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
