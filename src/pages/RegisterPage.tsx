import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#f0f8ff' }}>
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, #0369a1, #06b6d4)' }}>P</div>
          <span className="font-bold" style={{ fontFamily: 'Manrope', color: '#0c1f3a' }}>Pinnacle Laundry</span>
        </Link>

        <h1 className="text-3xl font-extrabold mb-2" style={{ color: '#0c1f3a' }}>Create account</h1>
        <p className="text-gray-500 mb-8">Start booking laundry in minutes.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#0c1f3a' }}>Full Name</label>
            <input type="text" placeholder="Brian Mwangi" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#0c1f3a' }}>Phone Number</label>
            <input type="tel" placeholder="07XXXXXXXX" value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#0c1f3a' }}>Email <span className="text-gray-400 font-normal">(optional)</span></label>
            <input type="email" placeholder="you@example.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#0c1f3a' }}>Password</label>
            <input type="password" placeholder="••••••••" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white" />
          </div>
          <div className="rounded-xl p-4 bg-sky-50 border border-sky-100 text-xs text-sky-700">
            Your laundry photos and location are used only to process your order and are visible only to Pinnacle staff.
          </div>
          <button type="submit"
            className="w-full text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
            Create Account <ArrowRight size={18} />
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-sky-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
