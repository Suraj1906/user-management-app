import React, { createContext, useContext, useState, useCallback } from 'react'


const ToastContext = createContext()
export const useToasts = () => useContext(ToastContext)


export function ToastProvider({ children }){
const [toasts, setToasts] = useState([])


const push = useCallback((msg, type='info') => {
const id = Date.now() + Math.random()
setToasts(t => [...t, { id, msg, type }])
setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
}, [])


const value = { toasts, push }
return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}