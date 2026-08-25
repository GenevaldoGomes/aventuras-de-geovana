'use client';
import {useEffect,useState} from 'react';

type View='home'|'worlds'|'ranking'|'learn'|'game';
const worlds=[
 ['👋','Hello!','Saudações'],['🎨','Colors','Cores'],['🔢','Numbers','Números'],['🐆','Animals','Animais'],['🍎','Food','Comidas'],
 ['👨‍👩‍👧','Family','Família'],['🏫','School','Escola'],['👕','Clothes','Roupas'],['🏃','Actions','Ações'],['💬',"Let’s Talk!",'Conversação']
];
const activities=[
 {q:'Choose the greeting:',opts:['Hello','Goodbye','Blue'],a:'Hello'},
 {q:'What color is this? 🔴',opts:['Red','Green','Yellow'],a:'Red'},
 {q:'Which number is 3?',opts:['Three','Five','Eight'],a:'Three'},
 {q:'What animal is this? 🐆',opts:['Jaguar','Dog','Fish'],a:'Jaguar'},
 {q:'What food is this? 🍎',opts:['Apple','Bread','Milk'],a:'Apple'},
 {q:'Who is your mother’s daughter?',opts:['Sister','Teacher','Doctor'],a:'Sister'},
 {q:'Where do students study?',opts:['School','Beach','Zoo'],a:'School'},
 {q:'What do you wear on your feet?',opts:['Shoes','Hat','Shirt'],a:'Shoes'},
 {q:'Choose the action: 🏃',opts:['Run','Sleep','Read'],a:'Run'},
 {q:'Complete: “How are you?”',opts:["I’m fine, thanks!",'Red','Three'],a:"I’m fine, thanks!"}
];
export default function Page(){
 const[view,setView]=useState<View>('home');
 const[world,setWorld]=useState(0);
 const[stars,setStars]=useState(0);
 const[msg,setMsg]=useState('');
 useEffect(()=>{const s=window.localStorage.getItem('geovana-v91-stars');if(s)setStars(Number(s)||0)},[]);
 const go=(v:View)=>{setMsg('');setView(v)};
 const choose=(x:string)=>{const item=activities[world];if(x===item.a){setMsg('Great job! ⭐');setStars(s=>{const n=s+1;localStorage.setItem('geovana-v91-stars',String(n));return n})}else setMsg('Try again! 💛')};
 if(view==='home') return <main className="home" data-version="V9.1-FUNCIONAL">
   <div className="heroFrame">
    <img src="/home-geovana-pudim.png" className="homeArt" alt="As Aventuras de Geovana com Pudim"/>
    <button className="hot playHot" onClick={()=>go('worlds')} aria-label="Jogar"><span>JOGAR</span></button>
    <button className="hot worldsHot" onClick={()=>go('worlds')} aria-label="Mundos"><span>MUNDOS</span></button>
    <button className="hot rankHot" onClick={()=>go('ranking')} aria-label="Ranking"><span>RANKING</span></button>
    <button className="hot learnHot" onClick={()=>go('learn')} aria-label="Aprender"><span>APRENDER</span></button>
   </div>
   <nav className="mobileMenu" aria-label="Menu do jogo">
    <button className="primary" onClick={()=>go('worlds')}>▶ JOGAR <small>PLAY</small></button>
    <button onClick={()=>go('worlds')}>🗺️ MUNDOS <small>WORLDS</small></button>
    <button onClick={()=>go('ranking')}>🏆 RANKING <small>LEADERBOARD</small></button>
    <button onClick={()=>go('learn')}>📚 APRENDER <small>LEARN</small></button>
   </nav>
 </main>;
 const back=<button className="back" onClick={()=>go('home')}>← Início / Home</button>;
 if(view==='worlds')return <main className="page">{back}<h1>🗺️ Mundos — Worlds</h1><p>Escolha uma aventura com Geovana e Pudim.</p><div className="worldGrid">{worlds.map((w,i)=><button key={i} onClick={()=>{setWorld(i);setMsg('');setView('game')}}><span>{w[0]}</span><b>{i+1}. {w[1]}</b><small>{w[2]}</small></button>)}</div></main>;
 if(view==='ranking')return <main className="page center">{back}<h1>🏆 Ranking</h1><div className="score">⭐ {stars}</div><p>Estrelas conquistadas nas aventuras.</p><button className="action" onClick={()=>go('worlds')}>Continuar jogando</button></main>;
 if(view==='learn')return <main className="page">{back}<h1>📚 Aprender — Learn</h1><div className="learnCards">{worlds.map((w,i)=><article key={i}><span>{w[0]}</span><b>{w[1]}</b><p>{w[2]}</p><button className="action" onClick={()=>{setWorld(i);setView('game')}}>Praticar</button></article>)}</div></main>;
 const item=activities[world];
 return <main className="page game">{back}<div className="gameHead"><div><small>WORLD {world+1}</small><h1>{worlds[world][0]} {worlds[world][1]}</h1></div><div className="pudimBadge">🐱 Pudim · ⭐ {stars}</div></div><section className="question"><img src="/geovana.png" alt="Geovana"/><div><h2>{item.q}</h2><div className="answers">{item.opts.map(o=><button key={o} onClick={()=>choose(o)}>{o}</button>)}</div>{msg&&<div className={msg.startsWith('Great')?'ok':'no'}>{msg}</div>}<div className="gameActions"><button className="action" onClick={()=>go('worlds')}>Escolher outro mundo</button></div></div></section></main>;
}
