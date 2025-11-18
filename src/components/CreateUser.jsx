import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, ArrowLeft, Plus } from "lucide-react";
import { useToasts } from "../utils/ToastContext";

export default function CreateUser() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const nav = useNavigate();
  const { push } = useToasts();

  const handle = (e) => {
    e.preventDefault();
    push("User created (simulated)");
    nav("/");
  };

  return (
    <motion.form onSubmit={handle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 space-y-6 glass rounded-2xl card-shadow max-w-xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Create User</h2>
          <p className="text-sm text-slate-500 dark:text-slate-300">Fill the details to add a new user</p>
        </div>
        <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:scale-105 transition-all text-sm">
          <ArrowLeft size={16} /> Back
        </Link>
      </div>

      <div className="relative">
        <User className="absolute left-3 top-3 text-slate-500" size={18} />
        <input className="w-full p-3 pl-10 border rounded-xl dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
        <input className="w-full p-3 pl-10 border rounded-xl dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      </div>

      <div className="relative">
        <Phone className="absolute left-3 top-3 text-slate-500" size={18} />
        <input className="w-full p-3 pl-10 border rounded-xl dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all">
          <Plus size={18} /> Create User
        </button>
      </div>
    </motion.form>
  );
}
