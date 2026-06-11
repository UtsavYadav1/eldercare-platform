import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Clock, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CaregiverCard from '../components/shared/CaregiverCard';
import { caregivers } from '../data/mockData';

const roles = ['All', 'Registered Nurse', 'Physiotherapist', 'Elderly Attendant', 'Post-Hospital Care Nurse'];
const locations = ['All Locations', 'South Delhi', 'Gurgaon', 'Noida', 'West Delhi', 'East Delhi'];
const sortOptions = ['Best Match', 'Rating: High to Low', 'Price: Low to High', 'Price: High to Low', 'Experience'];

export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedLoc, setSelectedLoc] = useState('All Locations');
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState('Best Match');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = caregivers
    .filter(c => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.specializations.join(' ').toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedRole !== 'All' && c.role !== selectedRole) return false;
      if (selectedLoc !== 'All Locations' && c.location !== selectedLoc) return false;
      if (c.rating < minRating) return false;
      if (c.hourlyRate > maxPrice) return false;
      if (availableOnly && !c.available) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'Rating: High to Low') return b.rating - a.rating;
      if (sortBy === 'Price: Low to High') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'Price: High to Low') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'Experience') return b.experience - a.experience;
      return 0;
    });

  const clearFilters = () => {
    setSearch(''); setSelectedRole('All'); setSelectedLoc('All Locations');
    setMinRating(0); setMaxPrice(1000); setAvailableOnly(false);
  };

  const activeFiltersCount = [selectedRole !== 'All', selectedLoc !== 'All Locations', minRating > 0, maxPrice < 1000, availableOnly].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-10 bg-gradient-to-br from-primary-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-black font-display text-white mb-3">Find Your Perfect Caregiver</h1>
            <p className="text-primary-100 text-lg">Browse {caregivers.length} verified healthcare professionals near you</p>
          </motion.div>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or specialization…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                />
              </div>
              <button
                onClick={() => setShowFilters(f => !f)}
                className="relative flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/20 backdrop-blur text-white border border-white/30 hover:bg-white/30 transition-all font-semibold text-sm"
              >
                <SlidersHorizontal size={16} /> Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-400 text-slate-900 text-xs font-black flex items-center justify-center">{activeFiltersCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-6">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-slate-900 dark:text-white">Filters</h3>
                  <button onClick={clearFilters} className="text-sm text-red-500 hover:underline flex items-center gap-1"><X size={14} /> Clear all</button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Specialization</label>
                    <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)} className="input text-sm">
                      {roles.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Location</label>
                    <select value={selectedLoc} onChange={e => setSelectedLoc(e.target.value)} className="input text-sm">
                      {locations.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Min Rating: {minRating > 0 ? `${minRating}★` : 'Any'}</label>
                    <input type="range" min={0} max={5} step={0.5} value={minRating} onChange={e => setMinRating(Number(e.target.value))} className="w-full accent-primary-500" />
                    <div className="flex justify-between text-xs text-slate-400 mt-1"><span>Any</span><span>5★</span></div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Max Price: ₹{maxPrice}/hr</label>
                    <input type="range" min={200} max={1000} step={50} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-primary-500" />
                    <div className="flex justify-between text-xs text-slate-400 mt-1"><span>₹200</span><span>₹1000</span></div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <label className="flex items-center gap-3 cursor-pointer w-fit">
                    <input type="checkbox" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)} className="rounded accent-primary-500" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Show available caregivers only</span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Role tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
          {roles.map(r => (
            <button key={r} onClick={() => setSelectedRole(r)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedRole === r ? 'bg-primary-500 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-primary-300'}`}
            >{r}</button>
          ))}
        </div>

        {/* Results bar */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-900 dark:text-white">{filtered.length}</span> caregivers found
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 hidden sm:block">Sort by:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input text-sm py-1.5 w-auto pr-8">
              {sortOptions.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filtered.map((c, i) => (
                <motion.div key={c.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }}>
                  <CaregiverCard caregiver={c} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">No caregivers found</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-5">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="px-6 py-2.5 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors">Clear Filters</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
