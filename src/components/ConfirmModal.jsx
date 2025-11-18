import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'


export default function ConfirmModal({ open, onClose, onConfirm, title='Confirm', message='Are you sure?' }){
return (
<AnimatePresence>
{open && (
<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
<motion.div initial={{y:20}} animate={{y:0}} exit={{y:20}} className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-md card-shadow">
<h3 className="text-lg font-semibold mb-2">{title}</h3>
<p className="mb-4 text-slate-600 dark:text-gray-300">{message}</p>
<div className="flex justify-end gap-2">
<button onClick={onClose} className="px-3 py-1 rounded border">Cancel</button>
<button onClick={onConfirm} className="px-3 py-1 rounded bg-red-500 text-white">Delete</button>
</div>
</motion.div>
</motion.div>
)}
</AnimatePresence>
)
}