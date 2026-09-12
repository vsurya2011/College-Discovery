'use client';
import Link from 'next/link';
import { Heart, MapPin, Star, IndianRupee, Scale } from 'lucide-react';
import { CollegeImage } from '@/components/college-image';

export type CollegeCardData = { id: string; name: string; city: string; state: string; fees: number; rating: number; placementPct: number; avgPackage: number; imageUrl: string; exams: string[]; slug: string };
const money = (n:number) => `₹${(n/100000).toFixed(2)} L`;

export function CollegeCard({ college, selected, onToggleCompare }: { college: CollegeCardData; selected?: boolean; onToggleCompare?: () => void }) {
  return <article className="card" style={{overflow:'hidden'}}>
    <CollegeImage src={college.imageUrl} alt={`${college.name} campus`} name={college.name} height={155} />
    <div style={{padding:16}}>
      <div style={{display:'flex', justifyContent:'space-between', gap:12}}><Link href={`/colleges/${college.slug}`}><h3 style={{margin:'0 0 7px',fontSize:18}}>{college.name}</h3></Link><span className="badge"><Star size={13} fill="currentColor"/> {college.rating.toFixed(1)}</span></div>
      <div className="muted" style={{fontSize:13, display:'flex', gap:7, alignItems:'center'}}><MapPin size={14}/>{college.city}, {college.state}</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:14}}>
        <div><div className="muted" style={{fontSize:11}}>FEES / YEAR</div><strong style={{display:'flex',alignItems:'center',gap:3}}><IndianRupee size={14}/>{money(college.fees)}</strong></div>
        <div><div className="muted" style={{fontSize:11}}>PLACEMENT</div><strong>{college.placementPct}%</strong></div>
      </div>
      <div style={{fontSize:12,marginTop:12}} className="muted">Avg package: ₹{(college.avgPackage/100000).toFixed(1)}L</div>
      <div style={{display:'flex',gap:8,marginTop:15}}>
        {onToggleCompare && <button onClick={onToggleCompare} className={`btn ${selected?'btn-primary':'btn-secondary'}`} style={{flex:1}}><Scale size={15}/>{selected?'Added':'Compare'}</button>}
        <Link href={`/colleges/${college.slug}`} className="btn btn-secondary" style={{flex:1,textAlign:'center'}}>View details</Link>
      </div>
    </div>
  </article>
}
