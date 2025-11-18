import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchFilterSort from './SearchFilterSort';
import ConfirmModal from './ConfirmModal';
import { useToasts } from '../utils/ToastContext';

import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const API = "https://jsonplaceholder.typicode.com/users";

export default function UsersList({ globalSearch = '' }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  const [page, setPage] = useState(1);
  const perPage = 6;

  const [confirm, setConfirm] = useState({ open: false, user: null });
  const { push } = useToasts();

  useEffect(() => {
    let mounted = true;

    fetch(API)
      .then(res => res.json())
      .then(data => {
        if (mounted) {
          setUsers(data);
          setLoading(false);
        }
      })
      .catch(() => {
        setError('Failed to load');
        setLoading(false);
        push('Failed to load users', 'error');
      });

    return () => mounted = false;
  }, []);

  const mergedSearch = (globalSearch || search).toLowerCase();

  let filtered = users.filter(u =>
    (
      (u.name || "") +
      (u.email || "") +
      (u.company?.name || "")
    ).toLowerCase().includes(mergedSearch)
  );

  if (filter.startsWith('company:')) {
    const cmp = filter.split(':')[1];
    filtered = filtered.filter(u =>
      u.company?.name?.toLowerCase().includes(cmp)
    );
  }

  if (filter.startsWith('city:')) {
    const city = filter.split(':')[1];
    filtered = filtered.filter(u =>
      u.address?.city?.toLowerCase().includes(city)
    );
  }

  if (sortBy === 'name')
    filtered.sort((a, b) => (a.name).localeCompare(b.name));
  if (sortBy === 'email')
    filtered.sort((a, b) => a.email.localeCompare(b.email));

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = (user) => {
    setUsers(prev => prev.filter(u => u.id !== user.id));
    push('User deleted');
    setConfirm({ open: false, user: null });
  };

  if (loading) return <div className="flex justify-center py-20"><div className="loader" /></div>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Users</h2>
        <div className="text-sm text-slate-500">{filtered.length} results</div>
      </div>

      <SearchFilterSort
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filter={filter}
        setFilter={setFilter}
        users={users}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {paginated.map(u => (
          <motion.div
            key={u.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            className="p-5 rounded-xl glass card-shadow transition-all cursor-pointer hover:shadow-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 backdrop-blur-xl"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{u.name}</h3>
                <p className="text-sm text-slate-500">{u.company?.name}</p>
                <p className="mt-2 text-sm text-slate-600">{u.email}</p>
                <p className="text-sm text-slate-600">{u.phone}</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <Link to={`/user/${u.id}`} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-sky-600 text-white text-sm shadow hover:shadow-sky-400/50 hover:scale-105 transition-all">
                  <EyeIcon className="w-4 h-4" /> View
                </Link>

                <Link to={`/edit/${u.id}`} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-yellow-500 text-white text-sm shadow hover:shadow-yellow-400/50 hover:scale-105 transition-all">
                  <PencilSquareIcon className="w-4 h-4" /> Edit
                </Link>

                <button onClick={() => setConfirm({ open: true, user: u })} className="flex items-center gap-1 px-3 py-1 rounded-lg border border-red-500 text-red-500 text-sm shadow hover:bg-red-500 hover:text-white hover:scale-105 transition-all">
                  <TrashIcon className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-3">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 rounded border hover:scale-105 transition disabled:opacity-40">Prev</button>
        <div className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700">{page} / {totalPages}</div>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 rounded border hover:scale-105 transition disabled:opacity-40">Next</button>
      </div>

      <ConfirmModal
        open={confirm.open}
        onClose={() => setConfirm({ open: false, user: null })}
        onConfirm={() => handleDelete(confirm.user)}
        title="Delete user"
        message={`Are you sure you want to delete ${confirm.user?.name}?`}
      />
    </div>
  );
}
