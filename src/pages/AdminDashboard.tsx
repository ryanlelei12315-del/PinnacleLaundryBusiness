import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, Truck, Layers, Users,
  CreditCard, MapPin, Settings, BarChart2, Bell, LogOut,
  Menu, X, Check, Clock, ChevronRight, Phone,
  Package, Search, Filter, Eye, CheckCircle, AlertCircle,
  TrendingUp, RefreshCw, ArrowRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const STATUS_CONFIG: Record<string, { bg: string; color: string; label: string }> = {
  new: { bg: '#fef3c7', color: '#d97706', label: 'New' },
  pickup: { bg: '#dbeafe', color: '#1d4ed8', label: 'Pickup' },
  received: { bg: '#e0e7ff', color: '#4338ca', label: 'Received' },
  washing: { bg: '#cffafe', color: '#0e7490', label: 'Washing' },
  ironing: { bg: '#ede9fe', color: '#6d28d9', label: 'Ironing' },
  folding: { bg: '#fce7f3', color: '#9d174d', label: 'Folding' },
  ready: { bg: '#d1fae5', color: '#065f46', label: 'Ready' },
  completed: { bg: '#f3f4f6', color: '#374151', label: 'Completed' },
  cancelled: { bg: '#fee2e2', color: '#991b1b', label: 'Cancelled' },
};

const PAYMENT_STATUS: Record<string, { bg: string; color: string }> = {
  Pending: { bg: '#fef3c7', color: '#d97706' },
  Verified: { bg: '#d1fae5', color: '#065f46' },
  Rejected: { bg: '#fee2e2', color: '#991b1b' },
};

const orders = [
  { id: '#PIN-1048', customer: 'Brian Mwangi', phone: '0712345678', service: 'Wash + Fold', weight: '4kg', amount: 200, pickup: 'Pickup', status: 'washing', payment: 'Pending', date: '2024-12-10', location: 'Near Student Center' },
  { id: '#PIN-1047', customer: 'Amina Kariuki', phone: '0723456789', service: 'Washing', weight: '2kg', amount: 100, pickup: 'Manual', status: 'ready', payment: 'Verified', date: '2024-12-10', location: '' },
  { id: '#PIN-1046', customer: 'David Otieno', phone: '0734567890', service: 'Blankets', weight: '2', amount: 500, pickup: 'Pickup', status: 'ironing', payment: 'Verified', date: '2024-12-09', location: 'Block B' },
  { id: '#PIN-1045', customer: 'Grace Wanjiru', phone: '0745678901', service: 'Wash + Iron', weight: '3kg', amount: 150, pickup: 'Manual', status: 'completed', payment: 'Verified', date: '2024-12-09', location: '' },
  { id: '#PIN-1044', customer: 'Kevin Kipchoge', phone: '0756789012', service: 'Washing', weight: '5kg', amount: 250, pickup: 'Pickup', status: 'new', payment: 'Pending', date: '2024-12-10', location: 'Block A' },
  { id: '#PIN-1043', customer: 'Faith Mutua', phone: '0767890123', service: 'Folding', weight: '2kg', amount: 0, pickup: 'Manual', status: 'folding', payment: 'Pending', date: '2024-12-09', location: '' },
];

const pickupRequests = [
  { id: '#PIN-1048', customer: 'Brian Mwangi', location: 'Near Student Center', phone: '0712345678', time: '10:00 AM', status: 'Collected' },
  { id: '#PIN-1044', customer: 'Kevin Kipchoge', location: 'Block A, Room 108', phone: '0756789012', time: '2:00 PM', status: 'Assigned' },
  { id: '#PIN-1041', customer: 'Mary Njoroge', location: 'Hostel 3, Room 15', phone: '0778901234', time: '4:00 PM', status: 'Requested' },
];

const payments = [
  { txId: 'PAY-8821', orderId: '#PIN-1047', customer: 'Amina Kariuki', amount: 100, code: 'QJK8R7T5PL', date: '2024-12-10', status: 'Verified' },
  { txId: 'PAY-8820', orderId: '#PIN-1046', customer: 'David Otieno', amount: 500, code: 'MNP2Q3R8SK', date: '2024-12-09', status: 'Verified' },
  { txId: 'PAY-8819', orderId: '#PIN-1048', customer: 'Brian Mwangi', amount: 200, code: 'LKJ7H6G5FD', date: '2024-12-10', status: 'Pending' },
  { txId: 'PAY-8818', orderId: '#PIN-1043', customer: 'Faith Mutua', amount: 0, code: '—', date: '2024-12-09', status: 'Pending' },
];

const customers = [
  { name: 'Brian Mwangi', phone: '0712345678', orders: 4, spent: 750, currentOrder: '#PIN-1048', last: '2024-12-10', status: 'Active' },
  { name: 'Amina Kariuki', phone: '0723456789', orders: 6, spent: 1200, currentOrder: '#PIN-1047', last: '2024-12-10', status: 'Active' },
  { name: 'David Otieno', phone: '0734567890', orders: 3, spent: 1350, currentOrder: '#PIN-1046', last: '2024-12-09', status: 'Active' },
  { name: 'Grace Wanjiru', phone: '0745678901', orders: 8, spent: 1900, currentOrder: '—', last: '2024-12-09', status: 'Active' },
  { name: 'Kevin Kipchoge', phone: '0756789012', orders: 2, spent: 350, currentOrder: '#PIN-1044', last: '2024-12-10', status: 'Active' },
];

const revenueData = [
  { day: 'Mon', orders: 8, revenue: 1600 },
  { day: 'Tue', orders: 12, revenue: 2400 },
  { day: 'Wed', orders: 10, revenue: 2000 },
  { day: 'Thu', orders: 15, revenue: 3000 },
  { day: 'Fri', orders: 18, revenue: 3600 },
  { day: 'Sat', orders: 22, revenue: 4400 },
  { day: 'Sun', orders: 14, revenue: 2800 },
];

const serviceData = [
  { name: 'Washing', value: 45, color: '#0369a1' },
  { name: 'Wash+Fold', value: 30, color: '#06b6d4' },
  { name: 'Blankets', value: 15, color: '#d97706' },
  { name: 'Ironing', value: 10, color: '#059669' },
];

const KANBAN_COLS = ['new', 'received', 'washing', 'ironing', 'folding', 'ready', 'completed'];

type AdminSection = 'dashboard' | 'orders' | 'pickups' | 'queue' | 'customers' | 'payments' | 'analytics' | 'settings';

const navItems: { id: AdminSection; icon: typeof LayoutDashboard; label: string }[] = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'orders', icon: ShoppingBag, label: 'Orders' },
  { id: 'pickups', icon: Truck, label: 'Pickup Requests' },
  { id: 'queue', icon: Layers, label: 'Laundry Queue' },
  { id: 'customers', icon: Users, label: 'Customers' },
  { id: 'payments', icon: CreditCard, label: 'Payments' },
  { id: 'analytics', icon: BarChart2, label: 'Analytics' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

const StatusBadge = ({ status }: { status: string }) => {
  const s = STATUS_CONFIG[status] || STATUS_CONFIG.new;
  return <span className="badge text-xs" style={{ background: s.bg, color: s.color }}>{s.label}</span>;
};

export default function AdminDashboard() {
  const [section, setSection] = useState<AdminSection>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderFilter, setOrderFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [orderStatuses, setOrderStatuses] = useState<Record<string, string>>(
    Object.fromEntries(orders.map(o => [o.id, o.status]))
  );
  const navigate = useNavigate();

  const filteredOrders = orders.filter(o => {
    const matchFilter = orderFilter === 'all' || o.status === orderFilter;
    const matchSearch = !searchQuery || o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  const kanbanCols = KANBAN_COLS.map(col => ({
    col,
    orders: orders.filter(o => (orderStatuses[o.id] || o.status) === col),
  }));

  const todayRevenue = 1850;
  const todayOrders = 6;

  const nextStatus: Record<string, string> = {
    new: 'received', received: 'washing', washing: 'ironing', ironing: 'folding', folding: 'ready', ready: 'completed'
  };
  const nextLabel: Record<string, string> = {
    new: 'Accept Order', received: 'Start Washing', washing: 'Complete Wash', ironing: 'Start Folding', folding: 'Mark Ready', ready: 'Mark Collected'
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#f0f8ff' }}>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 h-screen z-50 lg:z-auto flex flex-col border-r border-gray-800 transition-all duration-300 w-60
        ${sidebarOpen ? 'left-0' : '-left-72 lg:left-0'}`}
        style={{ background: '#0c1f3a' }}>
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #0369a1, #06b6d4)' }}>P</div>
            <div>
              <div className="font-bold text-sm text-white" style={{ fontFamily: 'Manrope' }}>Pinnacle Laundry</div>
              <div className="text-xs text-sky-400">Admin Panel</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setSection(item.id); setSidebarOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left
                ${section === item.id ? 'bg-sky-600 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white text-xs font-bold">A</div>
            <div>
              <div className="text-xs text-white font-medium">Admin User</div>
              <div className="text-xs text-gray-400">admin@pinnacle.co.ke</div>
            </div>
          </div>
          <button onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-400 w-full transition-colors">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 px-6 py-3.5 flex items-center gap-4">
          <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="font-bold text-base flex-1" style={{ color: '#0c1f3a' }}>
            {navItems.find(n => n.id === section)?.label}
          </h1>
          <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
            <AlertCircle size={13} /> Demo Data
          </div>
          <button className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 relative">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">3</span>
          </button>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {/* Dashboard Overview */}
          {section === 'dashboard' && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                {[
                  { label: "Today's Orders", value: todayOrders, icon: ShoppingBag, color: '#0369a1', bg: '#e0f2fe' },
                  { label: 'Active Laundry', value: 4, icon: RefreshCw, color: '#7c3aed', bg: '#ede9fe' },
                  { label: 'Ready Collection', value: 1, icon: CheckCircle, color: '#059669', bg: '#d1fae5' },
                  { label: 'Pickup Requests', value: 3, icon: Truck, color: '#0ea5e9', bg: '#e0f9ff' },
                  { label: "Today's Revenue", value: `KSh ${todayRevenue}`, icon: TrendingUp, color: '#d97706', bg: '#fef3c7' },
                ].map(stat => (
                  <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs text-gray-400">{stat.label}</div>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: stat.bg }}>
                        <stat.icon size={16} style={{ color: stat.color }} />
                      </div>
                    </div>
                    <div className="text-2xl font-extrabold" style={{ color: stat.color }}>{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Revenue chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-bold mb-4 text-sm" style={{ color: '#0c1f3a' }}>Revenue This Week</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={revenueData} barSize={28}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
                      <Tooltip formatter={(v: number) => [`KSh ${v}`, 'Revenue']} />
                      <Bar dataKey="revenue" fill="#0369a1" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Service breakdown */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-bold mb-4 text-sm" style={{ color: '#0c1f3a' }}>Service Mix</h3>
                  <ResponsiveContainer width="100%" height={140}>
                    <PieChart>
                      <Pie data={serviceData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={4} dataKey="value">
                        {serviceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col gap-2 mt-2">
                    {serviceData.map(s => (
                      <div key={s.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                          <span className="text-gray-600">{s.name}</span>
                        </div>
                        <span className="font-semibold text-gray-700">{s.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Today's queue */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm" style={{ color: '#0c1f3a' }}>Today's Laundry Queue — Orders Requiring Action</h3>
                  <button onClick={() => setSection('orders')} className="text-sky-600 text-xs font-medium">View All</button>
                </div>
                <div className="flex flex-col gap-3">
                  {orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').map(order => (
                    <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-sky-700">{order.id}</span>
                          <span className="text-xs text-gray-400">{order.customer}</span>
                          <StatusBadge status={orderStatuses[order.id] || order.status} />
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">{order.service} · {order.weight}</div>
                      </div>
                      {nextLabel[orderStatuses[order.id] || order.status] && (
                        <button
                          onClick={() => {
                            const curr = orderStatuses[order.id] || order.status;
                            if (nextStatus[curr]) setOrderStatuses(s => ({ ...s, [order.id]: nextStatus[curr] }));
                          }}
                          className="text-xs font-semibold text-white px-3 py-1.5 rounded-lg whitespace-nowrap"
                          style={{ background: '#0369a1' }}>
                          {nextLabel[orderStatuses[order.id] || order.status]}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders */}
          {section === 'orders' && (
            <div className="animate-fade-in">
              {/* Filters */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-3 py-2.5 flex-1 max-w-xs">
                  <Search size={16} className="text-gray-400" />
                  <input type="text" placeholder="Search order or customer..."
                    value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="text-sm flex-1 outline-none bg-transparent" />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['all', 'new', 'pickup', 'washing', 'ready', 'completed', 'cancelled'].map(f => (
                    <button key={f} onClick={() => setOrderFilter(f)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all capitalize
                        ${orderFilter === f ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-gray-600 border-gray-200 hover:border-sky-300'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders table */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead style={{ background: '#f8fafc' }}>
                      <tr className="text-xs text-gray-400 font-medium">
                        {['Order ID', 'Customer', 'Phone', 'Service', 'Weight', 'Amount', 'Method', 'Status', 'Payment', 'Actions'].map(h => (
                          <th key={h} className="text-left px-4 py-3 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map(order => (
                        <tr key={order.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-semibold text-sky-700 whitespace-nowrap">{order.id}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{order.customer}</td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{order.phone}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{order.service}</td>
                          <td className="px-4 py-3 text-gray-500">{order.weight}</td>
                          <td className="px-4 py-3 font-semibold">KSh {order.amount}</td>
                          <td className="px-4 py-3">
                            <span className={`badge text-xs ${order.pickup === 'Pickup' ? 'text-sky-700' : 'text-gray-600'}`}
                              style={{ background: order.pickup === 'Pickup' ? '#e0f2fe' : '#f3f4f6' }}>
                              {order.pickup}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <StatusBadge status={orderStatuses[order.id] || order.status} />
                          </td>
                          <td className="px-4 py-3">
                            <span className="badge text-xs"
                              style={{ background: PAYMENT_STATUS[order.payment]?.bg, color: PAYMENT_STATUS[order.payment]?.color }}>
                              {order.payment}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button onClick={() => setSelectedOrder(order)}
                              className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center hover:bg-sky-100 transition-colors">
                              <Eye size={14} className="text-sky-600" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order detail drawer */}
              {selectedOrder && (
                <div className="fixed inset-0 z-50 flex justify-end">
                  <div className="flex-1 bg-black/40" onClick={() => setSelectedOrder(null)} />
                  <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                      <div>
                        <div className="font-bold text-base" style={{ color: '#0c1f3a' }}>{selectedOrder.id}</div>
                        <StatusBadge status={orderStatuses[selectedOrder.id] || selectedOrder.status} />
                      </div>
                      <button onClick={() => setSelectedOrder(null)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="p-5 flex flex-col gap-5 flex-1">
                      {/* Customer */}
                      <div>
                        <div className="text-xs text-gray-400 font-medium mb-2">Customer</div>
                        <div className="font-semibold">{selectedOrder.customer}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Phone size={13} /> {selectedOrder.phone}
                        </div>
                        {selectedOrder.location && (
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <MapPin size={13} /> {selectedOrder.location}
                          </div>
                        )}
                      </div>

                      {/* Map */}
                      {selectedOrder.pickup === 'Pickup' && (
                        <div>
                          <div className="text-xs text-gray-400 font-medium mb-2">Pickup Location</div>
                          <div className="rounded-xl overflow-hidden border border-gray-200 relative"
                            style={{ height: 120, background: 'linear-gradient(135deg, #e0f2fe, #bfdbfe)' }}>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-xs text-sky-600 font-semibold">Google Maps Integration</div>
                                <MapPin size={24} className="mx-auto text-sky-500 mt-1" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Order details */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-xs text-gray-400 font-medium mb-3">Order Details</div>
                        {[
                          ['Service', selectedOrder.service],
                          ['Weight', selectedOrder.weight],
                          ['Amount', `KSh ${selectedOrder.amount}`],
                          ['Collection', selectedOrder.pickup],
                          ['Booked', selectedOrder.date],
                          ['Payment', selectedOrder.payment],
                        ].map(([k, v]) => (
                          <div key={k} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                            <span className="text-xs text-gray-400">{k}</span>
                            <span className="text-xs font-semibold text-gray-700">{v}</span>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div>
                        <div className="text-xs text-gray-400 font-medium mb-2">Admin Actions</div>
                        <div className="grid grid-cols-2 gap-2">
                          {['Accept Order', 'Assign Pickup', 'Mark Received', 'Start Washing', 'Complete Washing', 'Mark Ready', 'Mark Collected'].map(action => (
                            <button key={action}
                              className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-sky-200 text-sky-700 hover:bg-sky-50 transition-colors text-left">
                              {action}
                            </button>
                          ))}
                          <button className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
                            Cancel Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pickups */}
          {section === 'pickups' && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Pickup map */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-bold mb-3 text-sm" style={{ color: '#0c1f3a' }}>Pickup Locations Map</h3>
                  <div className="rounded-xl overflow-hidden border border-gray-200 relative"
                    style={{ height: 220, background: 'linear-gradient(135deg, #e0f2fe, #bfdbfe)' }}>
                    <div className="absolute inset-0 flex items-center justify-center text-center">
                      <div>
                        <div className="text-sky-600 text-sm font-semibold mb-2">Google Maps Integration</div>
                        <div className="flex gap-3 justify-center">
                          {pickupRequests.map(r => (
                            <div key={r.id} className="flex flex-col items-center">
                              <MapPin size={20} style={{ color: r.status === 'Collected' ? '#059669' : r.status === 'Assigned' ? '#0369a1' : '#d97706' }} />
                              <span className="text-xs text-gray-600 mt-0.5">{r.id}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Requested', count: 1, color: '#d97706', bg: '#fef3c7' },
                    { label: 'Assigned', count: 1, color: '#0369a1', bg: '#e0f2fe' },
                    { label: 'Collected', count: 1, color: '#059669', bg: '#d1fae5' },
                  ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">{s.label}</span>
                      <span className="text-2xl font-extrabold" style={{ color: s.color }}>{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {pickupRequests.map(r => (
                  <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-sky-700">Pickup {r.id}</span>
                          <span className="badge text-xs"
                            style={{
                              background: r.status === 'Collected' ? '#d1fae5' : r.status === 'Assigned' ? '#e0f2fe' : '#fef3c7',
                              color: r.status === 'Collected' ? '#065f46' : r.status === 'Assigned' ? '#1d4ed8' : '#d97706'
                            }}>
                            {r.status}
                          </span>
                        </div>
                        <div className="text-sm font-medium mb-1" style={{ color: '#0c1f3a' }}>{r.customer}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-400 mb-0.5"><MapPin size={11} /> {r.location}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-400 mb-0.5"><Phone size={11} /> {r.phone}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-400"><Clock size={11} /> {r.time}</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="text-xs font-semibold text-sky-700 border border-sky-200 rounded-xl px-3 py-2 hover:bg-sky-50 flex items-center gap-1">
                          <MapPin size={12} /> View Route
                        </button>
                        <a href={`tel:${r.phone}`} className="text-xs font-semibold text-green-700 border border-green-200 rounded-xl px-3 py-2 hover:bg-green-50 flex items-center gap-1 justify-center">
                          <Phone size={12} /> Call
                        </a>
                        {r.status !== 'Collected' && (
                          <button className="text-xs font-semibold text-white rounded-xl px-3 py-2"
                            style={{ background: '#0369a1' }}>
                            Update Status
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Kanban Queue */}
          {section === 'queue' && (
            <div className="animate-fade-in">
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-max">
                  {kanbanCols.map(({ col, orders: colOrders }) => {
                    const cfg = STATUS_CONFIG[col];
                    return (
                      <div key={col} className="w-56 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="badge text-xs" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                          </div>
                          <span className="text-xs font-bold text-gray-400">{colOrders.length}</span>
                        </div>
                        <div className="flex flex-col gap-2 min-h-24">
                          {colOrders.map(order => (
                            <div key={order.id} className="kanban-card bg-white rounded-xl border border-gray-100 shadow-sm p-3">
                              <div className="font-semibold text-xs text-sky-700 mb-1">{order.id}</div>
                              <div className="text-xs text-gray-600 mb-1">{order.customer}</div>
                              <div className="text-xs text-gray-400">{order.service} · {order.weight}</div>
                              {order.pickup === 'Pickup' && (
                                <div className="flex items-center gap-1 mt-1.5">
                                  <Truck size={10} className="text-sky-400" />
                                  <span className="text-xs text-sky-500">Pickup</span>
                                </div>
                              )}
                              {nextStatus[col] && (
                                <button
                                  onClick={() => setOrderStatuses(s => ({ ...s, [order.id]: nextStatus[col] }))}
                                  className="mt-2 w-full text-xs font-semibold text-white py-1.5 rounded-lg"
                                  style={{ background: '#0369a1' }}>
                                  → {STATUS_CONFIG[nextStatus[col]]?.label}
                                </button>
                              )}
                            </div>
                          ))}
                          {colOrders.length === 0 && (
                            <div className="text-center text-xs text-gray-300 py-6 border-2 border-dashed border-gray-200 rounded-xl">
                              Empty
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Customers */}
          {section === 'customers' && (
            <div className="animate-fade-in">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead style={{ background: '#f8fafc' }}>
                      <tr className="text-xs text-gray-400 font-medium">
                        {['Name', 'Phone', 'Orders', 'Total Spent', 'Current Order', 'Last Order', 'Status'].map(h => (
                          <th key={h} className="text-left px-4 py-3 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map(c => (
                        <tr key={c.name} className="border-t border-gray-50 hover:bg-gray-50 cursor-pointer">
                          <td className="px-4 py-3 font-semibold" style={{ color: '#0c1f3a' }}>
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                style={{ background: 'linear-gradient(135deg, #0369a1, #06b6d4)' }}>
                                {c.name[0]}
                              </div>
                              {c.name}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-500">{c.phone}</td>
                          <td className="px-4 py-3 font-semibold">{c.orders}</td>
                          <td className="px-4 py-3 font-semibold text-sky-700">KSh {c.spent}</td>
                          <td className="px-4 py-3 text-sky-600 font-medium">{c.currentOrder}</td>
                          <td className="px-4 py-3 text-gray-400">{c.last}</td>
                          <td className="px-4 py-3">
                            <span className="badge text-xs" style={{ background: '#d1fae5', color: '#065f46' }}>{c.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Payments */}
          {section === 'payments' && (
            <div className="animate-fade-in">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead style={{ background: '#f8fafc' }}>
                      <tr className="text-xs text-gray-400 font-medium">
                        {['Tx ID', 'Order', 'Customer', 'Amount', 'M-Pesa Code', 'Date', 'Status', 'Actions'].map(h => (
                          <th key={h} className="text-left px-4 py-3 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map(p => (
                        <tr key={p.txId} className="border-t border-gray-50 hover:bg-gray-50">
                          <td className="px-4 py-3 font-mono text-xs text-gray-500">{p.txId}</td>
                          <td className="px-4 py-3 font-semibold text-sky-700">{p.orderId}</td>
                          <td className="px-4 py-3">{p.customer}</td>
                          <td className="px-4 py-3 font-semibold">KSh {p.amount}</td>
                          <td className="px-4 py-3 font-mono text-xs text-gray-600">{p.code}</td>
                          <td className="px-4 py-3 text-gray-400">{p.date}</td>
                          <td className="px-4 py-3">
                            <span className="badge text-xs"
                              style={{ background: PAYMENT_STATUS[p.status]?.bg, color: PAYMENT_STATUS[p.status]?.color }}>
                              {p.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {p.status === 'Pending' && (
                              <div className="flex gap-1">
                                <button className="text-xs font-semibold text-green-700 border border-green-200 rounded-lg px-2 py-1 hover:bg-green-50">
                                  Verify
                                </button>
                                <button className="text-xs font-semibold text-red-600 border border-red-200 rounded-lg px-2 py-1 hover:bg-red-50">
                                  Reject
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Analytics */}
          {section === 'analytics' && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Today's Orders", value: todayOrders, suffix: 'orders' },
                  { label: 'This Week', value: '89', suffix: 'orders' },
                  { label: 'Revenue (Week)', value: 'KSh 19,800', suffix: '' },
                  { label: 'Avg Order Value', value: 'KSh 222', suffix: '' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="text-xs text-gray-400 mb-2">{s.label}</div>
                    <div className="text-2xl font-extrabold" style={{ color: '#0369a1' }}>{s.value}</div>
                    {s.suffix && <div className="text-xs text-gray-400">{s.suffix}</div>}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-bold mb-4 text-sm" style={{ color: '#0c1f3a' }}>Orders Over Time</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="orders" stroke="#0369a1" strokeWidth={3} dot={{ fill: '#0369a1', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-bold mb-4 text-sm" style={{ color: '#0c1f3a' }}>Revenue Over Time</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={revenueData} barSize={24}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
                      <Tooltip formatter={(v: number) => [`KSh ${v}`, 'Revenue']} />
                      <Bar dataKey="revenue" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Settings */}
          {section === 'settings' && (
            <div className="animate-fade-in max-w-xl">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold mb-4 text-sm" style={{ color: '#0c1f3a' }}>Business Settings</h3>
                {[
                  { label: 'Business Name', value: 'Pinnacle Laundry' },
                  { label: 'Phone', value: '0793002308' },
                  { label: 'Location', value: 'Near Breeze Point, Student Center' },
                  { label: 'M-Pesa Till Number', value: 'XXXXX (Placeholder)' },
                  { label: 'Standard Laundry Price', value: 'KSh 50/kg' },
                  { label: 'Blanket Price', value: 'KSh 250 each' },
                ].map(f => (
                  <div key={f.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-500">{f.label}</span>
                    <span className="text-sm font-semibold" style={{ color: '#0c1f3a' }}>{f.value}</span>
                  </div>
                ))}
                <button className="mt-6 w-full text-white font-semibold py-3 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
