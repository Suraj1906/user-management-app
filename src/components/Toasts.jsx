import React from 'react'
import { useToasts } from '../utils/ToastContext'


export default function Toasts(){
const { toasts } = useToasts()
return (
<div className="fixed right-4 top-6 z-50 flex flex-col gap-2">
{toasts.map(t => (
<div key={t.id} className={`px-4 py-2 rounded shadow-lg max-w-xs ${t.type==='error' ? 'bg-red-500 text-white' : 'bg-sky-600 text-white'}`}>
{t.msg}
</div>
))}
</div>
)
}