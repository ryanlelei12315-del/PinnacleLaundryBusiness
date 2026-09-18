import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, Plus, MapPin, CreditCard,
  User, HelpCircle, Bell, ChevronRight, CheckCircle,
  Clock, Truck, Package, Search, Shirt, LogOut,
  Menu, X, Phone, AlertCircle, Copy, Check, Home
} from 'lucide-react';

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  awaiting: { bg: '#fef3c7', color: '#d97706', label: 'Awaiting Collection' },
  pickup: { bg: '#dbeafe', color: '#1d4ed8', label: 'Pickup Scheduled' },
  received: { bg: '#e0e7ff', color: '#4338ca', label: 'Received' },
  washing: { bg: '#cffafe', color: '#0e7490', label: 'Washing' },
  ironing: { bg: '#ede9fe', color: '#6d28d9', label: 'Ironing' },
  folding: { bg: '#fce7f3', color: '#9d174d', label: 'Folding' },
  ready: { bg: '#d1fae5', color: '#065f46', label: 'Ready for Collection' },
  completed: { bg: '#f3f4f6', color: '#374151', label: 'Completed' },
  cancelled: { bg: '#fee2e2', color: '#991b1b', label: 'Cancelled' },
};

const orders = [
  { id: '#PIN-1048', service: 'Wash + Fold', weight: '4kg', amount: 200, status: 'washing', date: '2024-12-10', expected: '2024-12-12', pickup: 'Pickup', location: 'Near Student Center' },
  { id: '#PIN-1032', service: 'Washing', weight: '2kg', amount: 100, status: 'completed', date: '2024-12-05', expected: '2024-12-07', pickup: 'Manual', location: '' },
  { id: '#PIN-1021', service: 'Blankets', weight: '2 blankets', amount: 500, status: 'completed', date: '2024-12-01', expected: '2024-12-03', pickup: 'Manual', location: '' },
  { id: '#PIN-1009', service: 'Wash + Iron', weight: '3kg', amount: 150, status: 'completed', date: '2024-11-25', expected: '2024-11-27', pickup: 'Pickup', location: 'Block C' },
];

const TIMELINE = [
  { label: 'Booking Created', done: true },
  { label: 'Pickup Scheduled', done: true },
  { label: 'Laundry Received', done: true },
  { label: 'Washing', done: false, current: true },
  { label: 'Ironing / Folding', done: false },
  { label: 'Ready', done: false },
  { label: 'Collected / Delivered', done: false },
];

const notifications = [
  { text: 'Your laundry is currently being washed.', time: '2 hrs ago', read: false },
  { text: 'Your pickup request has been accepted.', time: '5 hrs ago', read: false },
  { text: 'Booking #PIN-1032 completed.', time: '5 days ago', read: true },
];

type Section = 'overview' | 'orders' | 'track' | 'payments' | 'profile' | 'help' | 'notifications';

const navItems: { id: Section; icon: typeof LayoutDashboard; label: string }[] = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'orders', icon: ShoppingBag, label: 'My Orders' },
  { id: 'track', icon: Search, label: 'Track Laundry' },
  { id: 'payments', icon: CreditCard, label: 'Payments' },
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'help', icon: HelpCircle, label: 'Help & Support' },
];

export default function CustomerDashboard() {
  const [section, setSection] = useState<Section>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mpesaCode, setMpesaCode] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const activeOrder = orders[0];
  const unreadCount = notifications.filter(n => !n.read).length;

  const copyTill = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const s = STATUS_COLORS[status] || STATUS_COLORS.awaiting;
    return <span className="badge" style={{ background: s.bg, color: s.color }}>{s.label}</span>;
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#f0f8ff' }}>
      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 h-screen z-50 lg:z-auto flex flex-col bg-white border-r border-gray-100 shadow-sm transition-all duration-300
        ${sidebarOpen ? 'left-0 w-64' : '-left-72 lg:left-0 w-64'}`}>
        <div className="p-5 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #0369a1, #06b6d4)' }}>P</div>
            <span className="font-bold text-sm" style={{ fontFamily: 'Manrope', color: '#0c1f3a' }}>Pinnacle Laundry</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setSection(item.id); setSidebarOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left
                ${section === item.id ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={() => navigate('/')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 w-full transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 px-6 py-3.5 flex items-center gap-4">
          <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex-1">
            <div className="text-xs text-gray-400">Welcome back,</div>
            <div className="font-bold text-sm" style={{ color: '#0c1f3a' }}>Brian Mwangi</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors relative">
                <Bell size={18} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <div className="font-bold text-sm" style={{ color: '#0c1f3a' }}>Notifications</div>
                  </div>
                  {notifications.map((n, i) => (
                    <div key={i} className={`p-4 border-b border-gray-50 ${!n.read ? 'bg-sky-50' : ''}`}>
                      <p className="text-sm text-gray-700 mb-1">{n.text}</p>
                      <p className="text-xs text-gray-400">{n.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #0369a1, #06b6d4)' }}>B</div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {/* Overview */}
          {section === 'overview' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-extrabold" style={{ color: '#0c1f3a' }}>Dashboard</h1>
                <button onClick={() => navigate('/booking')}
                  className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg transition-all"
                  style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
                  <Plus size={16} /> Book Laundry
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Active Order', value: '1', color: '#0369a1', bg: '#e0f2fe', icon: Shirt },
                  { label: 'Ready Orders', value: '0', color: '#059669', bg: '#d1fae5', icon: CheckCircle },
                  { label: 'Total Orders', value: '4', color: '#7c3aed', bg: '#ede9fe', icon: Package },
                  { label: 'Outstanding', value: 'KSh 200', color: '#d97706', bg: '#fef3c7', icon: CreditCard },
                ].map(stat => (
                  <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: stat.bg }}>
                        <stat.icon size={16} style={{ color: stat.color }} />
                      </div>
                    </div>
                    <div className="text-2xl font-extrabold" style={{ color: stat.color }}>{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Current laundry */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
                <h2 className="font-bold mb-4" style={{ color: '#0c1f3a' }}>Current Laundry</h2>
                <div className="flex items-start gap-4 p-4 rounded-xl border border-sky-100 bg-sky-50">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#e0f2fe' }}>
                    <Shirt size={22} style={{ color: '#0369a1' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <span className="font-bold text-sm" style={{ color: '#0c1f3a' }}>{activeOrder.id}</span>
                      <StatusBadge status={activeOrder.status} />
                    </div>
                    <div className="text-sm text-gray-500 mb-1">{activeOrder.service} · {activeOrder.weight} · KSh {activeOrder.amount}</div>
                    <div className="text-xs text-gray-400">Expected: {activeOrder.expected}</div>
                  </div>
                  <button onClick={() => setSection('track')}
                    className="flex-shrink-0 text-sky-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    Track <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Quick actions */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
                <h2 className="font-bold mb-4" style={{ color: '#0c1f3a' }}>Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { icon: Plus, label: 'Book Laundry', action: () => navigate('/booking'), color: '#0369a1', bg: '#e0f2fe' },
                    { icon: Search, label: 'Track Order', action: () => setSection('track'), color: '#059669', bg: '#d1fae5' },
                    { icon: Truck, label: 'Request Pickup', action: () => navigate('/booking'), color: '#7c3aed', bg: '#ede9fe' },
                    { icon: Package, label: 'Upload Photos', action: () => navigate('/booking'), color: '#d97706', bg: '#fef3c7' },
                  ].map(qa => (
                    <button key={qa.label} onClick={qa.action}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all bg-gray-50 hover:bg-white">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: qa.bg }}>
                        <qa.icon size={18} style={{ color: qa.color }} />
                      </div>
                      <span className="text-xs font-semibold text-center text-gray-600">{qa.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent orders */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold" style={{ color: '#0c1f3a' }}>Recent Orders</h2>
                  <button onClick={() => setSection('orders')} className="text-sky-600 text-sm font-medium">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-gray-400 font-medium border-b border-gray-100">
                        <th className="text-left pb-3">Order</th>
                        <th className="text-left pb-3">Service</th>
                        <th className="text-left pb-3">Amount</th>
                        <th className="text-left pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 4).map(order => (
                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                          <td className="py-3 font-semibold text-sky-700">{order.id}</td>
                          <td className="py-3 text-gray-600">{order.service}</td>
                          <td className="py-3 font-semibold">KSh {order.amount}</td>
                          <td className="py-3"><StatusBadge status={order.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders */}
          {section === 'orders' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-extrabold" style={{ color: '#0c1f3a' }}>My Orders</h1>
                <button onClick={() => navigate('/booking')}
                  className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
                  <Plus size={16} /> New Order
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                          <span className="font-bold" style={{ color: '#0c1f3a' }}>{order.id}</span>
                          <StatusBadge status={order.status} />
                        </div>
                        <div className="text-sm text-gray-500">{order.service} · {order.weight} · KSh {order.amount}</div>
                        <div className="text-xs text-gray-400 mt-1">Booked: {order.date} · Expected: {order.expected}</div>
                        {order.location && (
                          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                            <MapPin size={12} /> {order.location}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {order.status !== 'completed' && order.status !== 'cancelled' && (
                          <button onClick={() => setSection('track')}
                            className="text-sky-600 text-sm font-semibold border border-sky-200 rounded-xl px-4 py-2 hover:bg-sky-50 transition-colors">
                            Track
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Track */}
          {section === 'track' && (
            <div className="animate-fade-in max-w-xl">
              <h1 className="text-2xl font-extrabold mb-2" style={{ color: '#0c1f3a' }}>Track Your Laundry</h1>
              <p className="text-gray-500 text-sm mb-6">Real-time status for your order.</p>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div className="font-bold text-lg" style={{ color: '#0c1f3a' }}>{activeOrder.id}</div>
                    <div className="text-sm text-gray-500">{activeOrder.service} · {activeOrder.weight}</div>
                  </div>
                  <StatusBadge status={activeOrder.status} />
                </div>
                <p className="text-xs text-gray-400 mt-2">Pinnacle crew is processing your laundry.</p>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold mb-5 text-sm" style={{ color: '#0c1f3a' }}>Order Timeline</h3>
                <div className="flex flex-col gap-0">
                  {TIMELINE.map((t, i) => (
                    <div key={t.label} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all
                          ${t.done ? 'bg-green-500 text-white' : t.current ? 'bg-sky-500 text-white shadow-md shadow-sky-200 animate-pulse' : 'bg-gray-200 text-gray-400'}`}>
                          {t.done ? <Check size={14} /> : t.current ? <Clock size={14} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                        </div>
                        {i < TIMELINE.length - 1 && (
                          <div className={`w-0.5 h-8 ${t.done ? 'bg-green-300' : 'bg-gray-200'}`} />
                        )}
                      </div>
                      <div className="pt-1.5 pb-6">
                        <div className={`text-sm font-semibold ${t.done ? 'text-green-700' : t.current ? 'text-sky-700' : 'text-gray-400'}`}>
                          {t.label}
                        </div>
                        {t.current && <div className="text-xs text-sky-500 mt-0.5">In progress...</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map panel for pickup */}
              {activeOrder.pickup === 'Pickup' && (
                <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-bold mb-3 text-sm" style={{ color: '#0c1f3a' }}>Pickup Status</h3>
                  <div className="rounded-xl overflow-hidden border border-gray-200 mb-4 relative"
                    style={{ height: 140, background: 'linear-gradient(135deg, #e0f2fe, #bfdbfe)' }}>
                    <div className="absolute inset-0 flex items-center justify-center text-center">
                      <div>
                        <div className="text-sky-600 text-xs font-semibold mb-1">Google Maps Integration</div>
                        <Truck size={28} className="mx-auto text-sky-500" />
                        <div className="text-xs text-sky-700 mt-1 font-medium">Crew location shown here</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
                      <Truck size={16} className="text-sky-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Crew Status</div>
                      <div className="font-semibold text-sm" style={{ color: '#0c1f3a' }}>Laundry collected — now at facility</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Payments */}
          {section === 'payments' && (
            <div className="animate-fade-in max-w-xl">
              <h1 className="text-2xl font-extrabold mb-6" style={{ color: '#0c1f3a' }}>Payment</h1>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold" style={{ color: '#0c1f3a' }}>Order {activeOrder.id}</h3>
                  <div className="text-2xl font-extrabold text-sky-700">KSh {activeOrder.amount}</div>
                </div>
                <div className="text-xs text-amber-600 flex items-center gap-1 mb-5">
                  <AlertCircle size={12} /> Estimated — final amount confirmed after weighing.
                </div>

                <div className="p-4 rounded-xl bg-green-50 border border-green-200 mb-5">
                  <div className="text-xs text-gray-500 mb-1">Pay via M-Pesa</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xl text-green-700">XXXXX</div>
                      <div className="text-xs text-amber-600 mt-0.5">Placeholder Till Number</div>
                    </div>
                    <button onClick={copyTill}
                      className="flex items-center gap-1.5 text-xs font-semibold text-green-700 border border-green-300 rounded-lg px-3 py-2 hover:bg-green-100 transition-colors">
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <ol className="text-xs text-gray-500 flex flex-col gap-2 mb-5">
                  {['Open M-Pesa', 'Select Lipa na M-Pesa', 'Select Buy Goods and Services', 'Enter the Pinnacle Till Number', 'Enter the amount', 'Confirm payment'].map((s, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>

                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">Enter M-Pesa Transaction Code</label>
                  <input type="text" placeholder="e.g. QJK8R7T5PL" value={mpesaCode}
                    onChange={e => setMpesaCode(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 mb-4 uppercase tracking-wider" />
                  <button className="w-full text-white font-semibold py-3.5 rounded-xl"
                    style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
                    Submit Payment
                  </button>
                  <div className="flex items-center gap-1.5 text-xs text-amber-600 mt-3 justify-center">
                    <Clock size={12} /> Payment pending verification by Pinnacle team
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile */}
          {section === 'profile' && (
            <div className="animate-fade-in max-w-xl">
              <h1 className="text-2xl font-extrabold mb-6" style={{ color: '#0c1f3a' }}>Profile</h1>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold"
                    style={{ background: 'linear-gradient(135deg, #0369a1, #06b6d4)' }}>B</div>
                  <div>
                    <div className="font-bold text-lg" style={{ color: '#0c1f3a' }}>Brian Mwangi</div>
                    <div className="text-sm text-gray-400">Customer · Member since Dec 2024</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Full Name', value: 'Brian Mwangi' },
                    { label: 'Phone Number', value: '07XXXXXXXX' },
                    { label: 'Email', value: 'brian@example.com' },
                    { label: 'Default Pickup Location', value: 'Near Student Center, Block C' },
                    { label: 'Pickup Instructions', value: 'Room 204, second floor' },
                  ].map(field => (
                    <div key={field.label} className="border-b border-gray-100 pb-4">
                      <label className="text-xs text-gray-400 font-medium block mb-1">{field.label}</label>
                      <input type="text" defaultValue={field.value}
                        className="w-full text-sm font-medium text-gray-700 bg-transparent focus:outline-none border-b border-transparent focus:border-sky-400 pb-0.5 transition-colors" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                    Change Password
                  </button>
                  <button className="flex-1 py-3 rounded-xl text-white text-sm font-semibold"
                    style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Help */}
          {section === 'help' && (
            <div className="animate-fade-in max-w-xl">
              <h1 className="text-2xl font-extrabold mb-6" style={{ color: '#0c1f3a' }}>Help & Support</h1>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
                <h3 className="font-bold mb-4 text-sm" style={{ color: '#0c1f3a' }}>Contact Us</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                    <Phone size={18} className="text-sky-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Call / WhatsApp</div>
                    <a href="tel:0793002308" className="font-bold text-sky-700">0793002308</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                    <MapPin size={18} className="text-sky-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Location</div>
                    <div className="font-medium text-sm">Near Breeze Point, Student Center</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold mb-4 text-sm" style={{ color: '#0c1f3a' }}>Quick Help</h3>
                {[
                  'How do I book laundry?',
                  'How do I pay with M-Pesa?',
                  'How do I request a pickup?',
                  'Can I cancel my order?',
                ].map(q => (
                  <div key={q} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-600">{q}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 flex">
        {[
          { id: 'overview', icon: Home, label: 'Home' },
          { id: 'orders', icon: ShoppingBag, label: 'Orders' },
          { id: 'track', icon: Search, label: 'Track' },
          { id: 'payments', icon: CreditCard, label: 'Pay' },
          { id: 'profile', icon: User, label: 'Profile' },
        ].map(item => (
          <button key={item.id} onClick={() => setSection(item.id as Section)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-3 transition-colors ${section === item.id ? 'text-sky-600' : 'text-gray-400'}`}>
            <item.icon size={20} />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile book FAB */}
      <div className="lg:hidden fixed bottom-20 right-4 z-50">
        <button onClick={() => navigate('/booking')}
          className="w-14 h-14 rounded-2xl shadow-xl text-white flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
