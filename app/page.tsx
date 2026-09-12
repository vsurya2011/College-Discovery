import Link from 'next/link';
import { Search, Scale, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { CollegeSearch } from '@/components/college-search';

export default function HomePage(){return <main>
  <section style={{background:'linear-gradient(135deg,#0f172a,#1d4ed8)',color:'white',padding:'72px 0 54px'}}>
    <div className="container" style={{maxWidth:1180}}>
      <div style={{maxWidth:760}}><span className="badge" style={{background:'rgba(255,255,255,.14)',color:'white'}}>Database-backed college discovery</span><h1 style={{fontSize:'clamp(36px,6vw,64px)',lineHeight:1.05,margin:'18px 0'}}>Find the right college with data, not guesswork.</h1><p style={{fontSize:18,lineHeight:1.6,opacity:.9}}>Search colleges, compare the factors that matter, get rank-based recommendations and learn from student discussions.</p><div style={{display:'flex',gap:10,marginTop:22,flexWrap:'wrap'}}><Link href="/colleges" className="btn" style={{background:'white',color:'#0f172a',borderColor:'white'}}><Search size={17}/>Explore colleges</Link><Link href="/predictor" className="btn" style={{background:'transparent',color:'white',borderColor:'rgba(255,255,255,.35)'}}><Sparkles size={17}/>Try predictor</Link></div></div>
    </div>
  </section>
  <section className="container" style={{padding:'34px 0'}}><div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:28}}>
    {([['Search smarter','Filter by location, rating and fees.',Search],['Compare clearly','Side-by-side fees, placements, ratings.',Scale],['Ask real questions','Browse and contribute to student Q&A.',MessageCircle]] as const).map(([t,d,I])=><div key={t} className="card" style={{padding:20}}><I size={22} color="#2563eb"/><h3 style={{margin:'10px 0 5px'}}>{t}</h3><p className="muted" style={{margin:0}}>{d}</p></div>)}
  </div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',margin:'16px 0'}}><div><h2 style={{margin:0}}>Explore colleges</h2><p className="muted" style={{margin:'6px 0 0'}}>All results are fetched through the REST API from Neon PostgreSQL.</p></div><Link href="/colleges" className="btn btn-secondary">View all <ArrowRight size={15}/></Link></div><CollegeSearch/></section>
</main>}
