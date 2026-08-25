'use client';
import {useEffect,useState} from 'react';

type View='home'|'worlds'|'ranking'|'learn'|'game';
const worlds=[
 ['👋','Hello!','Saudações'],['🎨','Colors','Cores'],['🔢','Numbers','Números'],['🐆','Animals','Animais'],['🍎','Food','Comidas'],
 ['👨‍👩‍👧','Family','Família'],['🏫','School','Escola'],['👕','Clothes','Roupas'],['🏃','Actions','Ações'],['💬',"Let's Talk!",'Conversação']
];
const samples=[
 {q:'Choose the greeting:',opts:['Hello','Goodbye','Blue'],a:'Hello'},
 {q:'What color is this? 🔴',opts:['Red','Green','Yellow'],a:'Red'},
 {q:'Which number is 3?',opts:['Three','Five','Eight'],a:'Three'},
 {q:'What animal is this? 🐆',opts:['Jaguar','Dog','Fish'],a:'Jaguar'},
 {q:'What food is this? 🍎',opts:['Apple','Bread','Milk'],a:'Apple'}
];
export default function Page(){
 const[view,setView]=useState<View>('home'); const[world,setWorld]=useState(0); const[stars,setStars]=useState(0); const[msg,setMsg]=useState('');
 useEffect(()=>{const s=localStorage.getItem('geovana-v9-stars'); if(s)setStars(Number(s)||0)},[]);
 const choose=(x:string)=>{const item=samples[world%samples.length]; if(x===item.a){setMsg('Great job! ⭐');const n=stars+1;setStars(n);localStorage.setItem('geovana-v9-stars',String(n))}else setMsg('Try again! 💛')};
 if(view==='home')return <main className="home" data-version="V9-NOVO-CODIGO">
   <img src="/home-geovana-pudim.png" className="homeArt" alt="As Aventuras de Geovana com Pudim"/>
   <div className="hotspots" aria-label="Menu principal">
    <button className="play" aria-label="Jogar" onClick={()=>setView('worlds')}/>
    <button className="worldBtn" aria-label="Mundos" onClick={()=>setView('worlds')}/>
    <button className="rankBtn" aria-label="Ranking" onClick={()=>setView('ranking')}/>
    <button className="learnBtn" aria-label="Aprender" onClick={()=>setView('learn')}/>
   </div>
 </main>;
 const back=<button className="back" onClick={()=>setView('home')}>← Início</button>;
 if(view==='worlds')return <main className="page">{back}<h1>🗺️ Mundos — Worlds</h1><p>Escolha uma aventura com Geovana e Pudim.</p><div className="worldGrid">{worlds.map((w,i)=><button key={i} onClick={()=>{setWorld(i);setMsg('');setView('game')}}><span>{w[0]}</span><b>{i+1}. {w[1]}</b><small>{w[2]}</small></button>)}</div></main>;
 if(view==='ranking')return <main className="page center">{back}<h1>🏆 Ranking</h1><div className="score">⭐ {stars}</div><p>Estrelas conquistadas nas aventuras.</p></main>;
 if(view==='learn')return <main className="page">{back}<h1>📚 Aprender — Learn</h1><div className="learnCards"><article>👋<b>Hello!</b><p>Hello • Hi • Goodbye</p></article><article>🎨<b>Colors</b><p>Red • Blue • Green • Yellow</p></article><article>🔢<b>Numbers</b><p>One • Two • Three • Four</p></article><article>🐆<b>Animals</b><p>Cat • Dog • Jaguar • Parrot</p></article></div></main>;
 const item=samples[world%samples.length];
 return <main className="page game">{back}<div className="gameHead"><div><small>WORLD {world+1}</small><h1>{worlds[world][0]} {worlds[world][1]}</h1></div><div className="pudimBadge">🐱 Pudim</div></div><section className="question"><img src="/geovana.png" alt="Geovana"/><div><h2>{item.q}</h2><div className="answers">{item.opts.map(o=><button key={o} onClick={()=>choose(o)}>{o}</button>)}</div>{msg&&<div className={msg.startsWith('Great')?'ok':'no'}>{msg}</div>}</div></section></main>
}
