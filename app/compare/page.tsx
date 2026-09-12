'use client';
import {useEffect,useState,useContext} from 'react';
import type {ReactNode} from 'react';
import {useSearchParams} from 'next/navigation';
import useSWR from 'swr';
import Link from 'next/link';
import {ArrowLeft,Heart,Star} from 'lucide-react';
import {AuthContext} from '@/components/auth-provider';

type College = {
  id: string; name: string; slug: string; city: string; state: string; fees: number; rating: number;
  placementPct: number; avgPackage: number; highestPackage: number; exams: string[];
};
type Metric = {label: string; render: (college: College) => ReactNode};
const fetcher=(u:string)=>fetch(u).then(r=>r.json());

const metrics: Metric[] = [
  {label:'Location', render:(c)=>`${c.city}, ${c.state}`},
  {label:'Fees/year', render:(c)=>`₹${(c.fees/100000).toFixed(2)} L / year`},
  {label:'Rating', render:(c)=><span style={{display:'inline-flex',gap:4,alignItems:'center'}}><Star size={14} fill="currentColor"/>{c.rating.toFixed(1)}</span>},
  {label:'Placement', render:(c)=>`${c.placementPct}%`},
  {label:'Average package', render:(c)=>`₹${(c.avgPackage/100000).toFixed(1)} LPA`},
  {label:'Highest package', render:(c)=>`₹${(c.highestPackage/100000).toFixed(1)} LPA`},
  {label:'Accepted exams', render:(c)=>c.exams.join(', ')},
  {label:'Details', render:(c)=><Link href={`/colleges/${c.slug}`} style={{color:'#2563eb',fontWeight:700}}>Open college</Link>},
];

export default function Compare(){
  const params=useSearchParams();
  const initial=(params.get('ids')||'').split(',').filter(Boolean);
  const [ids,setIds]=useState(initial);
  const [saveMsg,setSaveMsg]=useState('');
  const {session}=useContext(AuthContext);
  useEffect(()=>setIds(initial),[params]);
  const url=ids.length?`/api/colleges/compare?ids=${ids.join(',')}`:'/api/colleges?limit=6';
  const {data,isLoading}=useSWR(url,fetcher);
  const colleges: College[]=data?.data||data?.colleges||[];
  async function save(){
    if(!session){window.location.href='/login?next='+encodeURIComponent(`/compare?ids=${ids.join(',')}`);return;}
    const r=await fetch('/api/saved-comparisons',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({collegeIds:ids,label:'My comparison'})});
    setSaveMsg(r.ok?'Comparison saved.':'Could not save.');
  }
  return <main className="container" style={{padding:'34px 0'}}>
    <Link href="/colleges" className="muted" style={{display:'inline-flex',gap:6,alignItems:'center'}}><ArrowLeft size={15}/>Back</Link>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10,margin:'18px 0',flexWrap:'wrap'}}>
      <div><h1 style={{margin:0}}>Compare colleges</h1><p className="muted">Choose 2–3 colleges for a side-by-side view.</p></div>
      <div style={{display:'flex',gap:8}}><button className="btn btn-secondary" onClick={save}><Heart size={15}/>Save comparison</button><span className="muted" style={{alignSelf:'center'}}>{saveMsg}</span></div>
    </div>
    {isLoading?<div>Loading comparison…</div>:ids.length<2?
      <div className="card" style={{padding:24}}>Select at least two colleges from <Link href="/colleges" style={{color:'#2563eb'}}>College listings</Link>.</div>:
      <div className="card" style={{overflowX:'auto'}}><table style={{width:'100%',minWidth:780,borderCollapse:'collapse'}}><thead><tr><th style={{textAlign:'left',padding:18}}>Metric</th>{colleges.map((c)=><th key={c.id} style={{textAlign:'left',padding:18}}>{c.name}</th>)}</tr></thead><tbody>{metrics.map(({label,render})=><tr key={label} style={{borderTop:'1px solid #e2e8f0'}}><td style={{padding:16,fontWeight:700}}>{label}</td>{colleges.map((c)=><td key={c.id} style={{padding:16}}>{render(c)}</td>)}</tr>)}</tbody></table></div>}
  </main>
}
