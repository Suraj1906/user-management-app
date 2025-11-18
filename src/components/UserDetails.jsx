import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowLeft, Building2 } from "lucide-react";

const API = "https://jsonplaceholder.typicode.com/users";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(console.error);
  }, [id]);

  if (!user) return <div className="py-10 text-center">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div className="p-6 glass rounded-2xl card-shadow hover:shadow-xl transition-all">
        <div className="h-28 w-28 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          {user.name[0]}
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight">{user.name}</h2>
        <p className="text-slate-500 text-sm flex items-center gap-1 mt-1"><Building2 size={16} /> {user.company?.name}</p>

        <div className="mt-6 space-y-3 text-sm text-slate-600">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>

        <Link to="/" className="inline-flex items-center gap-2 mt-6 px-5 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-all">
          <ArrowLeft size={18} /> Back
        </Link>
      </motion.div>

      <div className="md:col-span-2 space-y-6">
        <motion.div className="p-6 glass rounded-2xl card-shadow hover:shadow-xl transition-all">
          <h3 className="font-semibold text-xl">Contact Information</h3>
          <div className="mt-3 space-y-2 text-slate-700">
            <p className="flex items-center gap-2"><Mail size={16} className="text-sky-600" /> <strong>Email:</strong> {user.email}</p>
            <p className="flex items-center gap-2"><Phone size={16} className="text-sky-600" /> <strong>Phone:</strong> {user.phone}</p>
            <p className="flex items-center gap-2"><MapPin size={16} className="text-sky-600" /> <strong>Address:</strong> {user.address?.street}, {user.address?.city}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
