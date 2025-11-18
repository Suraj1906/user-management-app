import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import UsersList from './components/UsersList'
import UserDetails from './components/UserDetails'
import CreateUser from './components/CreateUser'
import EditUser from './components/EditUser'
import Toasts from './components/Toasts'


export default function App(){
const [globalSearch, setGlobalSearch] = useState('')


return (
<BrowserRouter>
<div className="min-h-screen text-slate-900 dark:text-slate-100">
<Navbar setGlobalSearch={setGlobalSearch} />
<main className="max-w-6xl mx-auto p-6">
<Routes>
<Route path="/" element={<UsersList globalSearch={globalSearch} />} />
<Route path="/user/:id" element={<UserDetails />} />
<Route path="/create" element={<CreateUser />} />
<Route path="/edit/:id" element={<EditUser />} />
</Routes>
</main>
<Toasts />
</div>
</BrowserRouter>
)
}