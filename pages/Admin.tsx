
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Search, Plus, Filter, MoreHorizontal, Edit2, Trash2, Eye, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

// --- Shared Components ---

const ActionButton = ({ icon: Icon, onClick, className }: { icon: any, onClick?: () => void, className?: string }) => (
  <button onClick={onClick} className={`p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white ${className}`}>
    <Icon size={16} />
  </button>
);

const Badge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    published: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    draft: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    inactive: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300',
  };
  
  const statusKey = status.toLowerCase();
  const style = styles[statusKey] || styles.draft;

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${style}`}>
      {status}
    </span>
  );
};

const PageHeader = ({ title, actionLabel }: { title: string, actionLabel?: string }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
    <h1 className="text-2xl font-serif font-bold dark:text-white">{title}</h1>
    <div className="flex items-center gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
        <input 
          type="text" 
          placeholder="Search..." 
          className="pl-10 pr-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:ring-1 focus:ring-gold-500 outline-none dark:text-white w-full md:w-64"
        />
      </div>
      <button className="p-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-300 hover:border-gold-500 transition-colors">
        <Filter size={18} />
      </button>
      {actionLabel && (
        <button className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gold-500 dark:hover:bg-gold-400 transition-colors">
          <Plus size={18} />
          {actionLabel}
        </button>
      )}
    </div>
  </div>
);

// --- Dashboard ---

const dashboardData = [
  { name: 'Mon', visits: 4000, bookings: 2400 },
  { name: 'Tue', visits: 3000, bookings: 1398 },
  { name: 'Wed', visits: 2000, bookings: 9800 },
  { name: 'Thu', visits: 2780, bookings: 3908 },
  { name: 'Fri', visits: 1890, bookings: 4800 },
  { name: 'Sat', visits: 2390, bookings: 3800 },
  { name: 'Sun', visits: 3490, bookings: 4300 },
];

const StatCard = ({ title, value, change, positive }: { title: string, value: string, change: string, positive: boolean }) => (
    <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-100 dark:border-zinc-700">
        <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-2">{title}</h3>
        <div className="flex items-end justify-between">
            <span className="text-2xl font-bold dark:text-white">{value}</span>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {change}
            </span>
        </div>
    </div>
);

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold dark:text-white">Overview</h1>
        <p className="text-zinc-500 text-sm">Welcome back, Dr. Lumière. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value="1,284" change="+12.5%" positive={true} />
        <StatCard title="Appointments" value="42" change="+4.3%" positive={true} />
        <StatCard title="Revenue" value="$24,500" change="+8.2%" positive={true} />
        <StatCard title="Cancellations" value="3" change="-2.1%" positive={true} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-100 dark:border-zinc-700">
          <h3 className="font-serif text-lg mb-6 dark:text-white">Revenue Analytics</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C5A028" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#C5A028" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.2} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }} 
                    itemStyle={{ color: '#C5A028' }}
                />
                <Area type="monotone" dataKey="bookings" stroke="#C5A028" strokeWidth={2} fillOpacity={1} fill="url(#colorVisits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-100 dark:border-zinc-700">
           <h3 className="font-serif text-lg mb-6 dark:text-white">Top Treatments</h3>
           <div className="space-y-6">
              {[
                  { name: 'HydraFacial', count: 124, width: '80%' },
                  { name: 'Botox', count: 98, width: '65%' },
                  { name: 'Laser Hair Removal', count: 86, width: '50%' },
                  { name: 'Chemical Peel', count: 45, width: '30%' },
              ].map((item, i) => (
                  <div key={i}>
                      <div className="flex justify-between text-sm mb-2 dark:text-zinc-300">
                          <span>{item.name}</span>
                          <span className="font-bold">{item.count}</span>
                      </div>
                      <div className="h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gold-500 rounded-full" style={{ width: item.width }}></div>
                      </div>
                  </div>
              ))}
           </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-100 dark:border-zinc-700">
         <div className="flex justify-between items-center mb-6">
             <h3 className="font-serif text-lg dark:text-white">Recent Appointments</h3>
             <button className="text-xs text-gold-500 font-bold uppercase tracking-widest hover:text-gold-400">View All</button>
         </div>
         <div className="overflow-x-auto">
             <table className="w-full text-left">
                 <thead>
                     <tr className="border-b border-zinc-100 dark:border-zinc-700 text-xs uppercase tracking-wider text-zinc-500">
                         <th className="pb-4 font-medium">Patient</th>
                         <th className="pb-4 font-medium">Service</th>
                         <th className="pb-4 font-medium">Date</th>
                         <th className="pb-4 font-medium">Status</th>
                         <th className="pb-4 font-medium text-right">Amount</th>
                     </tr>
                 </thead>
                 <tbody className="text-sm dark:text-zinc-300">
                     {[1,2,3,4,5].map(i => (
                         <tr key={i} className="border-b border-zinc-50 dark:border-zinc-700/50 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-700/20 transition-colors">
                             <td className="py-4">
                                 <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs font-bold">JD</div>
                                     <span className="font-medium">Jane Doe</span>
                                 </div>
                             </td>
                             <td className="py-4">HydraFacial Elite</td>
                             <td className="py-4 text-zinc-500">Oct 24, 2024</td>
                             <td className="py-4"><Badge status="active" /></td>
                             <td className="py-4 text-right font-medium">$250.00</td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
      </div>
    </div>
  );
};

// --- Patients List ---

export const PatientsList = () => {
  const patients = [
    { id: 1, name: "Emma Thompson", email: "emma.t@example.com", phone: "+1 (555) 123-4567", lastVisit: "Oct 22, 2024", totalSpend: "$1,250", status: "Active" },
    { id: 2, name: "Liam Wilson", email: "liam.w@example.com", phone: "+1 (555) 987-6543", lastVisit: "Oct 18, 2024", totalSpend: "$450", status: "Active" },
    { id: 3, name: "Sophia Davis", email: "sophia.d@example.com", phone: "+1 (555) 456-7890", lastVisit: "Sep 30, 2024", totalSpend: "$2,800", status: "Inactive" },
    { id: 4, name: "Noah Miller", email: "noah.m@example.com", phone: "+1 (555) 789-0123", lastVisit: "Oct 24, 2024", totalSpend: "$150", status: "Active" },
    { id: 5, name: "Olivia Taylor", email: "olivia.t@example.com", phone: "+1 (555) 234-5678", lastVisit: "Aug 12, 2024", totalSpend: "$5,400", status: "Active" },
  ];

  return (
    <div>
      <PageHeader title="Patients" actionLabel="Add Patient" />
      <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-700 text-xs uppercase tracking-wider text-zinc-500">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Last Visit</th>
                <th className="px-6 py-4 font-medium">Total Spend</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700/50">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gold-100 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-sm font-bold">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium dark:text-white">{patient.name}</div>
                        <div className="text-xs text-zinc-500">ID: #{patient.id + 1000}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm dark:text-zinc-300">{patient.email}</div>
                    <div className="text-xs text-zinc-500">{patient.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{patient.lastVisit}</td>
                  <td className="px-6 py-4 text-sm font-medium dark:text-white">{patient.totalSpend}</td>
                  <td className="px-6 py-4">
                    <Badge status={patient.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <ActionButton icon={Eye} />
                      <ActionButton icon={Edit2} />
                      <ActionButton icon={MoreHorizontal} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-700 flex justify-between items-center text-xs text-zinc-500">
          <span>Showing 5 of 1,284 patients</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-zinc-200 dark:border-zinc-700 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800">Previous</button>
            <button className="px-3 py-1 border border-zinc-200 dark:border-zinc-700 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Orders List ---

export const OrdersList = () => {
  const orders = [
    { id: "ORD-7829", date: "Oct 24, 2024", customer: "Emma Thompson", items: 3, total: "$245.00", status: "Completed" },
    { id: "ORD-7828", date: "Oct 24, 2024", customer: "Liam Wilson", items: 1, total: "$85.00", status: "Pending" },
    { id: "ORD-7827", date: "Oct 23, 2024", customer: "Guest User", items: 2, total: "$120.00", status: "Completed" },
    { id: "ORD-7826", date: "Oct 23, 2024", customer: "Noah Miller", items: 4, total: "$450.00", status: "Cancelled" },
    { id: "ORD-7825", date: "Oct 22, 2024", customer: "Olivia Taylor", items: 1, total: "$65.00", status: "Completed" },
  ];

  return (
    <div>
      <PageHeader title="Product Orders" actionLabel="Create Order" />
      <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-700 text-xs uppercase tracking-wider text-zinc-500">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Items</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Total</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700/50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/20 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium dark:text-white">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{order.date}</td>
                  <td className="px-6 py-4 text-sm dark:text-zinc-300">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{order.items} items</td>
                  <td className="px-6 py-4">
                    <Badge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium dark:text-white">{order.total}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <ActionButton icon={Eye} />
                      <ActionButton icon={MoreHorizontal} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Posts List ---

export const PostsList = () => {
  const posts = [
    { id: 1, title: "The Ultimate Guide to Retinols in Winter", author: "Dr. Sarah Lumière", date: "Oct 24, 2024", views: "2.4k", status: "Published", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=300" },
    { id: 2, title: "Understanding Laser Resurfacing", author: "Dr. James Chen", date: "Oct 20, 2024", views: "1.8k", status: "Published", image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=300" },
    { id: 3, title: "5 Tips for Post-Treatment Care", author: "Nurse Jessica", date: "Oct 15, 2024", views: "3.1k", status: "Published", image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=300" },
    { id: 4, title: "New Technology Arriving This Fall", author: "Admin", date: "-", views: "-", status: "Draft", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=300" },
  ];

  return (
    <div>
      <PageHeader title="Blog Posts" actionLabel="New Post" />
      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-zinc-800 p-4 rounded-xl border border-zinc-100 dark:border-zinc-700 hover:border-gold-500/50 transition-all">
            <div className="w-full md:w-48 h-32 bg-zinc-200 dark:bg-zinc-700 rounded-lg overflow-hidden flex-shrink-0">
               <img src={post.image} alt="Blog Thumbnail" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 w-full text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
                 <Badge status={post.status} />
                 <span className="text-xs text-zinc-500">{post.date}</span>
              </div>
              <h3 className="text-lg font-bold font-serif dark:text-white mb-1">{post.title}</h3>
              <p className="text-sm text-zinc-500 mb-4">By {post.author} • {post.views} views</p>
              <div className="flex gap-2 justify-center md:justify-start">
                <button className="text-xs font-medium text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">Preview</button>
                <button className="text-xs font-medium text-gold-600 dark:text-gold-400 border border-gold-200 dark:border-gold-900/50 px-3 py-1.5 rounded hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-colors">Edit</button>
              </div>
            </div>
            <div className="flex gap-2">
               <ActionButton icon={Trash2} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Services List ---

export const ServicesList = () => {
  const services = [
    { id: 1, name: "Laser Resurfacing", category: "Clinical", price: "$500", duration: "60 min", active: true },
    { id: 2, name: "HydraFacial Elite", category: "Aesthetic", price: "$250", duration: "45 min", active: true },
    { id: 3, name: "Dermal Fillers", category: "Clinical", price: "$700+", duration: "30 min", active: true },
    { id: 4, name: "Botox / Dysport", category: "Clinical", price: "$15/unit", duration: "15 min", active: true },
    { id: 5, name: "Chemical Peels", category: "Aesthetic", price: "$200", duration: "30 min", active: false },
  ];

  return (
    <div>
      <PageHeader title="Services" actionLabel="Add Service" />
      <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-700 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-700 text-xs uppercase tracking-wider text-zinc-500">
              <th className="px-6 py-4 font-medium">Service Name</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Duration</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700/50">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/20 transition-colors">
                <td className="px-6 py-4 font-medium dark:text-white">{service.name}</td>
                <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-700 text-xs">{service.category}</span>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{service.duration}</td>
                <td className="px-6 py-4 text-sm font-medium dark:text-white">{service.price}</td>
                <td className="px-6 py-4">
                  {service.active ? (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div> Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                   <div className="flex items-center justify-end gap-1">
                      <ActionButton icon={Edit2} />
                      <ActionButton icon={Trash2} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20" />
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Settings ---

export const AdminSettings = () => {
  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-serif font-bold dark:text-white mb-8">Settings</h1>
      
      <div className="space-y-6">
        {/* General Section */}
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-100 dark:border-zinc-700">
          <h2 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gold-500 rounded-full"></div>
            General Information
          </h2>
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Clinic Name</label>
                <input type="text" defaultValue="Lumière Dermatology" className="w-full p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg dark:text-white focus:ring-1 focus:ring-gold-500 outline-none" />
              </div>
               <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Contact Email</label>
                <input type="email" defaultValue="admin@lumierederm.com" className="w-full p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg dark:text-white focus:ring-1 focus:ring-gold-500 outline-none" />
              </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Address</label>
                <input type="text" defaultValue="123 Luxury Avenue, Suite 400, Beverly Hills, CA 90210" className="w-full p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg dark:text-white focus:ring-1 focus:ring-gold-500 outline-none" />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-100 dark:border-zinc-700">
          <h2 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gold-500 rounded-full"></div>
            Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
              <div>
                <p className="font-medium dark:text-white">Email Notifications</p>
                <p className="text-xs text-zinc-500">Receive daily summaries and booking alerts</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle1" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-gold-500 right-6 border-zinc-300" defaultChecked/>
                  <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-6 rounded-full bg-zinc-300 cursor-pointer checked:bg-gold-500"></label>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
              <div>
                <p className="font-medium dark:text-white">Public Profile</p>
                <p className="text-xs text-zinc-500">Allow search engines to index the clinic website</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle2" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-gold-500 right-6 border-zinc-300" defaultChecked/>
                  <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-6 rounded-full bg-zinc-300 cursor-pointer checked:bg-gold-500"></label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
           <button className="px-6 py-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Cancel</button>
           <button className="px-6 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors shadow-lg shadow-gold-500/20">Save Changes</button>
        </div>
      </div>
    </div>
  );
};
