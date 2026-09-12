'use client';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from './auth-provider';
import { Search, Heart, Scale, MessageCircle, LogIn, LogOut, User } from 'lucide-react';

export function Header() {
  const { session, refresh } = useContext(AuthContext);
  async function logout() { await fetch('/api/auth/logout', { method: 'POST' }); refresh(); window.location.href = '/'; }
  return <header style={{background:'white', borderBottom:'1px solid #e2e8f0', position:'sticky', top:0, zIndex:40}}>
    <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:18, minHeight:68}}>
      <Link href="/" style={{fontWeight:900, letterSpacing:-.4}}>🎓 College<span style={{color:'#2563eb'}}>Find</span></Link>
      <nav style={{display:'flex', gap:14, alignItems:'center', flexWrap:'wrap'}}>
        <Link href="/colleges" className="btn btn-secondary"><Search size={16}/>Colleges</Link>
        <Link href="/compare" className="btn btn-secondary"><Scale size={16}/>Compare</Link>
        <Link href="/predictor" className="btn btn-secondary">Predictor</Link>
        <Link href="/discussions" className="btn btn-secondary"><MessageCircle size={16}/>Q&A</Link>
        {session ? <>
          <Link href="/saved" className="btn btn-secondary"><Heart size={16}/>Saved</Link>
          <button onClick={logout} className="btn btn-secondary"><LogOut size={16}/>Logout</button>
        </> : <Link href="/login" className="btn btn-primary"><LogIn size={16}/>Login</Link>}
      </nav>
    </div>
  </header>
}
