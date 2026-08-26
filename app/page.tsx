"use client";
import {useEffect,useMemo,useRef,useState} from "react";
type Q={en:string;pt:string;o:string[];a:number;icon:string;hint?:string};
type World={icon:string;name:string;pt:string,place:string,color:string,questions:Q[]};
const W:World[]=[
 {icon:"🏝️",name:"Greetings Island",pt:"Ilha das Saudações",place:"Uma ilha tropical onde cada encontro começa com uma nova expressão!",color:"#15b75c",questions:[
  {en:"How do you greet someone?",pt:"Como você cumprimenta alguém?",o:["Hello","Goodbye","Sorry"],a:0,icon:"👋"},{en:"What do you say in the morning?",pt:"O que você diz pela manhã?",o:["Good night","Good morning","Good afternoon"],a:1,icon:"☀️"},{en:"Choose the farewell.",pt:"Escolha a despedida.",o:["Please","Goodbye","Welcome"],a:1,icon:"👋"},{en:"How are you?",pt:"Como você está?",o:["I'm fine, thank you!","My name is Geovana.","I live in Brazil."],a:0,icon:"😊"},{en:"I am fine, thank you.",pt:"Escolha a tradução correta.",o:["Estou cansado","Estou bem, obrigado","Estou com fome"],a:1,icon:"💛"},{en:"What is your name?",pt:"O que significa?",o:["Qual é seu nome?","Quantos anos você tem?","Como vai?"],a:0,icon:"🪪"},{en:"Nice to meet you!",pt:"Escolha a tradução.",o:["Até amanhã","Prazer em conhecer você","Com licença"],a:1,icon:"🤝"},{en:"See you later!",pt:"O que essa expressão significa?",o:["Até mais tarde","Bom dia","De nada"],a:0,icon:"⏰"},{en:"Good night!",pt:"Quando usamos essa expressão?",o:["Pela manhã","À noite","Ao meio-dia"],a:1,icon:"🌙"},{en:"You are welcome.",pt:"Escolha o significado.",o:["Por favor","De nada","Desculpe"],a:1,icon:"✨"}]},
 {icon:"🐾",name:"Animal Forest",pt:"Floresta dos Animais",place:"Explore a floresta com Pudim e descubra os nomes dos animais!",color:"#8c35e8",questions:[
  {en:"Which animal says meow?",pt:"Qual animal faz miau?",o:["Cat","Dog","Bird"],a:0,icon:"🐱"},{en:"Which word means cachorro?",pt:"Qual palavra significa cachorro?",o:["Fish","Dog","Rabbit"],a:1,icon:"❓"},{en:"What animal can fly?",pt:"Qual animal pode voar?",o:["Bird","Horse","Lion"],a:0,icon:"🐦"},{en:"A fish lives in...",pt:"Um peixe vive...",o:["the sky","the water","the tree"],a:1,icon:"🐟"},{en:"Which animal has a long trunk?",pt:"Qual animal tem uma tromba longa?",o:["Elephant","Monkey","Frog"],a:0,icon:"🌳"},{en:"The king of the jungle is the...",pt:"O rei da selva é o...",o:["Rabbit","Lion","Duck"],a:1,icon:"🦁"},{en:"Which animal likes bananas?",pt:"Qual animal gosta de bananas?",o:["Monkey","Turtle","Cow"],a:0,icon:"🐒"},{en:"A rabbit has long...",pt:"Um coelho tem longas...",o:["wings","ears","fins"],a:1,icon:"🐰"},{en:"Choose the farm animal.",pt:"Escolha o animal da fazenda.",o:["Cow","Whale","Tiger"],a:0,icon:"🐮"},{en:"A turtle is usually...",pt:"Uma tartaruga geralmente é...",o:["fast","slow","loud"],a:1,icon:"🐢"}]},
 {icon:"🏙️",name:"London City",pt:"Cidade de Londres",place:"Passeie por Londres aprendendo cores, números e objetos!",color:"#1675d1",questions:[
  {en:"What color is a traditional London double-decker bus?",pt:"Qual é a cor tradicional do ônibus de dois andares de Londres?",o:["Red","Green","Purple"],a:0,icon:"🎨"},{en:"What number comes after nine?",pt:"Qual número vem depois de nove?",o:["Eight","Ten","Twenty"],a:1,icon:"🔟"},{en:"The sky is usually...",pt:"O céu geralmente é...",o:["Blue","Orange","Black"],a:0,icon:"🌤️"},{en:"How many fingers on one hand?",pt:"Quantos dedos em uma mão?",o:["Three","Five","Seven"],a:1,icon:"✋"},{en:"What tells the time?",pt:"O que informa as horas?",o:["Clock","Book","Chair"],a:0,icon:"🕰️"},{en:"Choose the yellow object.",pt:"Escolha o objeto amarelo.",o:["Banana","Bus","Cloud"],a:0,icon:"🍌"},{en:"You read a...",pt:"Você lê um...",o:["Table","Book","Door"],a:1,icon:"📕"},{en:"One plus two is...",pt:"Um mais dois é...",o:["Two","Three","Four"],a:1,icon:"3️⃣"},{en:"Grass is usually...",pt:"A grama geralmente é...",o:["Green","Pink","Gray"],a:0,icon:"🌿"},{en:"You sit on a...",pt:"Você senta em uma...",o:["Window","Chair","Pencil"],a:1,icon:"🪑"}]},
 {icon:"🗽",name:"New York Quest",pt:"Aventura em Nova York",place:"A missão final reúne família, alimentos e lugares da cidade!",color:"#ed287d",questions:[
  {en:"My mother's son is my...",pt:"O filho da minha mãe é meu...",o:["Brother","Uncle","Father"],a:0,icon:"👦"},{en:"Which food is a fruit?",pt:"Qual alimento é uma fruta?",o:["Bread","Apple","Cheese"],a:1,icon:"🍎"},{en:"Where do students learn?",pt:"Onde os estudantes aprendem?",o:["School","Hospital","Airport"],a:0,icon:"🏫"},{en:"My father's wife is my...",pt:"A esposa do meu pai é minha...",o:["Sister","Mother","Aunt"],a:1,icon:"👩"},{en:"Where can you see a doctor?",pt:"Onde você encontra um médico?",o:["Park","Hospital","Cinema"],a:1,icon:"🏥"},{en:"Which drink is white?",pt:"Qual bebida é branca?",o:["Milk","Coffee","Juice"],a:0,icon:"🥛"},{en:"You can buy food at the...",pt:"Você compra alimentos no...",o:["Library","Supermarket","Museum"],a:1,icon:"🛒"},{en:"My mother's mother is my...",pt:"A mãe da minha mãe é minha...",o:["Grandmother","Cousin","Daughter"],a:0,icon:"👵"},{en:"Which food is made with cheese?",pt:"Qual alimento é feito com queijo?",o:["Pizza","Apple","Rice"],a:0,icon:"🍕"},{en:"The Statue of Liberty is in...",pt:"A Estátua da Liberdade fica em...",o:["London","New York","Paris"],a:1,icon:"🗽"}]}
];

type Screen="home"|"worlds"|"game"|"ranking"|"learn"|"result"|"profile";

const vocab=[
 ["👋","Hello","Olá"],["☀️","Good morning","Bom dia"],["🐱","Cat","Gato"],
 ["🐶","Dog","Cachorro"],["🔴","Red","Vermelho"],["🔵","Blue","Azul"],
 ["👩","Mother","Mãe"],["🍎","Apple","Maçã"],["🏫","School","Escola"]
];

function speak(text:string,lang="en-US",pitch=1){
 if(typeof window==="undefined"||!("speechSynthesis" in window))return;
 const u=new SpeechSynthesisUtterance(text);u.lang=lang;u.rate=.9;u.pitch=pitch;
 speechSynthesis.cancel();speechSynthesis.speak(u);
}
function hintFor(q:Q){
 const a=q.o[q.a], clean=a.replace(/[^A-Za-zÀ-ÿ]/g,"");
 return `A resposta começa com "${clean.charAt(0).toUpperCase()}" e tem ${clean.length} letras. Ouça as opções e pense com atenção.`;
}

function Pudim({q,reaction,sound}:{q:Q;reaction:"walk"|"correct"|"wrong";sound:boolean}){
 const [x,setX]=useState(8),[dir,setDir]=useState(1),[hint,setHint]=useState(false),[frame,setFrame]=useState(0);
 const walkFrames=[
  "/sprites/walk-clean-0.png","/sprites/walk-clean-1.png","/sprites/walk-clean-2.png","/sprites/walk-clean-3.png",
  "/sprites/walk-clean-4.png","/sprites/walk-clean-5.png","/sprites/walk-clean-6.png","/sprites/walk-clean-7.png"
 ];
 const idleFrames=["/sprites/idle.png"];
 const correctFrames=["/sprites/correct.png","/sprites/happy.png"];
 const wrongFrames=["/sprites/wrong.png"];
 const frames=reaction==="correct"?correctFrames:reaction==="wrong"?wrongFrames:hint?idleFrames:walkFrames;

 useEffect(()=>{
  const id=setInterval(()=>setFrame(v=>(v+1)%frames.length),115);
  return()=>clearInterval(id);
 },[reaction,hint]);

 useEffect(()=>{
  if(reaction!=="walk"||hint)return;
  const id=setInterval(()=>setX(v=>{
   let n=v+dir*.42;
   if(n>80){setDir(-1);n=80}
   if(n<3){setDir(1);n=3}
   return n;
  }),45);
  return()=>clearInterval(id);
 },[reaction,dir,hint]);

 const click=()=>{
  if(reaction!=="walk")return;
  setHint(true);
  if(sound){
   speak("Miau!","pt-BR",1.75);
   setTimeout(()=>speak(hintFor(q),"pt-BR",1.45),450);
  }
  setTimeout(()=>setHint(false),6500);
 };

 const text=hint?["💡 Pudim's hint",hintFor(q)]
  :reaction==="correct"?["Great job!","Muito bem!"]
  :reaction==="wrong"?["Think carefully!","Pense com atenção!"]
  :["Keep going!","Continue!"];

 return <div className="trail">
   <div className="walker" style={{left:`${x}%`}} onClick={click} role="button" tabIndex={0} aria-label="Pudim - clique para uma dica">
    <div className="bubble"><b>{text[0]}</b><span>{text[1]}</span></div>
    <img key={frames[frame%frames.length]} src={frames[frame%frames.length]} className={dir<0?"flip":""} alt="Pudim animado"/>
   </div>
   {reaction==="walk"&&<div className="hint-note">🐾 Clique no Pudim para uma dica!</div>}
 </div>
}

export default function Home(){
 const [screen,setScreen]=useState<Screen>("home");
 const [sound,setSound]=useState(true),[english,setEnglish]=useState(false);
 const [name,setName]=useState("Geovana"),[draft,setDraft]=useState("Geovana");
 const [world,setWorld]=useState(0),[qi,setQi]=useState(0),[score,setScore]=useState(0),[coins,setCoins]=useState(0),[lives,setLives]=useState(3),[selected,setSelected]=useState<number|null>(null);
 const [completed,setCompleted]=useState<number[]>([]);
 useEffect(()=>{try{const n=localStorage.getItem("geovana-player");if(n){setName(n);setDraft(n)}const c=JSON.parse(localStorage.getItem("geovana-completed")||"[]");setCompleted(c)}catch{}},[]);
 const q=W[world].questions[qi];
 const unlocked=Math.min(4,Math.max(1,completed.length+1));
 const goWorld=(i:number)=>{if(i>=unlocked)return;setWorld(i);setQi(0);setScore(0);setCoins(0);setLives(3);setSelected(null);setScreen("game")};
 const answer=(i:number)=>{
  if(selected!==null)return;setSelected(i);
  if(i===q.a){setScore(v=>v+10);setCoins(v=>v+5);if(sound)speak("Excellent! Great job!","en-US",1.35)}
  else{setLives(v=>Math.max(0,v-1));if(sound)speak("Try again!","en-US",1.35)}
 };
 const next=()=>{
  if(qi<W[world].questions.length-1){setQi(v=>v+1);setSelected(null)}
  else{const c=[...new Set([...completed,world])];setCompleted(c);localStorage.setItem("geovana-completed",JSON.stringify(c));setScreen("result")}
 };
 const saveProfile=()=>{const n=draft.trim()||"Geovana";setName(n);localStorage.setItem("geovana-player",n);setScreen("home")};

 if(screen==="home")return <main className="home">
   <div className="poster">
    <img src="/home-main-v125.png" alt="As Aventuras de Geovana"/>
    <button className="hit sound" onClick={()=>setSound(v=>!v)} aria-label="Som">{sound?"🔊":"🔇"}</button>
    <button className="hit lang" onClick={()=>setEnglish(v=>!v)} aria-label="Idioma">{english?"EN":"PT"}</button>
    <button className="hit profile" onClick={()=>setScreen("profile")} aria-label="Perfil">Perfil</button>
    <button className="hit play" onClick={()=>setScreen("worlds")} aria-label="Jogar">Jogar</button>
    <button className="hit worlds" onClick={()=>setScreen("worlds")} aria-label="Mundos">Mundos</button>
    <button className="hit ranking" onClick={()=>setScreen("ranking")} aria-label="Ranking">Ranking</button>
    <button className="hit learn" onClick={()=>setScreen("learn")} aria-label="Aprender">Aprender</button>
   </div>
 </main>;

 if(screen==="profile")return <Shell title="Perfil" back={()=>setScreen("home")}><div className="card profile-card"><h2>👤 Perfil do jogador</h2><label>Nome<input value={draft} onChange={e=>setDraft(e.target.value)}/></label><button className="primary" onClick={saveProfile}>Salvar</button></div></Shell>;

 if(screen==="worlds")return <Shell title="Mundos" back={()=>setScreen("home")}><div className="world-grid">{W.map((w,i)=><button key={w.name} className={`world-card ${i>=unlocked?"locked":""}`} onClick={()=>goWorld(i)}><span>{w.icon}</span><b>{w.name}</b><small>{w.pt}</small><em>{i<unlocked?"Jogar":"🔒 Bloqueado"}</em></button>)}</div></Shell>;

 if(screen==="ranking")return <Shell title="Ranking" back={()=>setScreen("home")}><div className="card"><h2>🏆 Seu progresso</h2><p><b>{name}</b></p><p>Mundos concluídos: {completed.length}/4</p><p>Continue jogando para conquistar novas estrelas!</p></div></Shell>;

 if(screen==="learn")return <Shell title="Aprender" back={()=>setScreen("home")}><div className="vocab">{vocab.map(v=><button key={v[1]} onClick={()=>sound&&speak(v[1],"en-US",1.25)}><span>{v[0]}</span><b>{v[1]}</b><small>{v[2]}</small><em>🔊 Ouvir</em></button>)}</div></Shell>;

 if(screen==="result")return <Shell title="Missão concluída!" back={()=>setScreen("home")}><div className="card result"><h1>🎉 Parabéns, {name}!</h1><p>Você concluiu <b>{W[world].name}</b>.</p><div className="big-score">⭐ {score} pontos</div><button className="primary" onClick={()=>setScreen("worlds")}>Próximo mundo</button></div></Shell>;

 return <main className="game">
   <header className="game-head"><button onClick={()=>setScreen("worlds")}>←</button><div><b>{W[world].icon} {W[world].name}</b><small>Desafio {qi+1} de {W[world].questions.length}</small></div><div className="stats">❤️ {lives}　🪙 {coins}　⭐ {score}</div></header>
   <div className="progress"><i style={{width:`${((qi+1)/W[world].questions.length)*100}%`}}/></div>
   <section className="question-card">
    <div className="question"><span className="qicon">{q.icon}</span><div><h1>{q.en}</h1><p>{q.pt}</p></div><button className="listen" onClick={()=>sound&&speak(q.en)}>🔊 Ouvir</button></div>
    <div className="answers">{q.o.map((o,i)=><div key={o} className={`answer ${selected===i?(i===q.a?"ok":"bad"):""}`}><button onClick={()=>answer(i)} disabled={selected!==null}><span>{String.fromCharCode(65+i)}</span>{o}</button><button className="listen small" onClick={()=>sound&&speak(o)}>🔊 Ouvir</button></div>)}</div>
    {selected!==null&&<button className="next" onClick={next}>{qi===W[world].questions.length-1?"Concluir":"Próximo →"}</button>}
   </section>
   <Pudim q={q} reaction={selected===null?"walk":selected===q.a?"correct":"wrong"} sound={sound}/>
 </main>
}

function Shell({title,back,children}:{title:string;back:()=>void;children:React.ReactNode}){
 return <main className="screen"><header className="top"><button onClick={back}>←</button><h1>{title}</h1><span/></header><section className="content">{children}</section></main>
}
