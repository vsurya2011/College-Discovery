'use client';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { CollegeCard, CollegeCardData } from './college-card';

const fetcher = (u:string) => fetch(u).then(r=>r.json());
export function CollegeSearch() {
  const [q,setQ]=useState(''); const [city,setCity]=useState(''); const [minRating,setMinRating]=useState(''); const [minFees,setMinFees]=useState(''); const [maxFees,setMaxFees]=useState(''); const [page,setPage]=useState(1);
  const [compare,setCompare]=useState<string[]>([]); const [showFilters,setShowFilters]=useState(false);
  const params=useMemo(()=>{const p=new URLSearchParams({q,city,page:String(page),limit:'6'}); if(minRating)p.set('minRating',minRating); if(minFees)p.set('minFees',minFees); if(maxFees)p.set('maxFees',maxFees); return `/api/colleges?${p}`},[q,city,minRating,minFees,maxFees,page]);
  const {data,isLoading}=useSWR(params,fetcher,{keepPreviousData:true});
  useEffect(()=>{setPage(1)},[q,city,minRating,minFees,maxFees]);
  const colleges:(CollegeCardData[]) = data?.data ?? [];
  const pages=data?.pagination?.pages ?? 1;
  return <div>
    <div className="card" style={{padding:14,marginBottom:18}}>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr auto',gap:10}}>
        <div style={{position:'relative'}}><Search size={16} style={{position:'absolute',left:12,top:13}}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search college, city, course..." className="input" style={{paddingLeft:35}}/></div>
        <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Location" className="input"/>
        <select value={minRating} onChange={e=>setMinRating(e.target.value)} className="select"><option value="">Any rating</option><option value="4.5">4.5+</option><option value="4">4.0+</option><option value="3.5">3.5+</option></select>
        <button className="btn btn-secondary" onClick={()=>setShowFilters(v=>!v)}><SlidersHorizontal size={16}/>Filters</button>
      </div>
      {showFilters && <div style={{marginTop:12,paddingTop:12,borderTop:'1px solid #e2e8f0'}} className="muted">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr auto',gap:10,alignItems:'center'}}><input value={minFees} onChange={e=>setMinFees(e.target.value)} placeholder="Min fees / year" type="number" className="input"/><input value={maxFees} onChange={e=>setMaxFees(e.target.value)} placeholder="Max fees / year" type="number" className="input"/><button onClick={()=>{setQ('');setCity('');setMinRating('');setMinFees('');setMaxFees('')}} className="btn btn-secondary"><X size={14}/>Clear</button></div><div style={{marginTop:8,fontSize:13}}>Fees filter uses yearly fee values stored in the database.</div>
      </div>}
    </div>
    {compare.length>0 && <div className="card" style={{padding:12,marginBottom:18,display:'flex',justifyContent:'space-between',alignItems:'center',gap:10,flexWrap:'wrap'}}><span><strong>{compare.length}/3</strong> colleges selected for comparison.</span><a href={`/compare?ids=${compare.join(',')}`} className="btn btn-primary">Open comparison</a></div>}
    {isLoading?<div className="muted">Loading colleges…</div>:colleges.length===0?<div className="card" style={{padding:32,textAlign:'center'}}>No colleges found. Try a broader search.</div>:<div className="grid-auto">{colleges.map(c=><CollegeCard key={c.id} college={c} selected={compare.includes(c.id)} onToggleCompare={()=>setCompare(prev=>prev.includes(c.id)?prev.filter(x=>x!==c.id):prev.length<3?[...prev,c.id]:prev)}/>)}</div>}
    <div style={{display:'flex',justifyContent:'center',gap:8,marginTop:22}}>{Array.from({length:pages},(_,i)=>i+1).map(n=><button key={n} className={`btn ${n===page?'btn-primary':'btn-secondary'}`} onClick={()=>setPage(n)}>{n}</button>)}</div>
  </div>
}
