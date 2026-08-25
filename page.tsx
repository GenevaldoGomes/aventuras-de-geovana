"use client";
import {useEffect,useMemo,useState} from "react";

type Profile={name:string;age:number;avatar:string;stars:number;coins:number;xp:number;streak:number;correct:number;wrong:number;worlds:number[];themeScore:Record<string,{correct:number;wrong:number}>};
type Screen="home"|"profile"|"intro"|"map"|"lesson"|"achievements"|"parents"|"settings";
type MascotMood="idle"|"talk"|"correct"|"wrong"|"happy"|"walk";
type Question={type:string;prompt:string;speak:string;visual?:string;options:[string,string][];answer:string;tip:string;minAge?:number};
type World={icon:string;name:string;pt:string;color:string;questions:Question[]};
const Q=(type:string,prompt:string,speak:string,visual:string,answer:string,wrong1:string,wrong2:string,tip:string,minAge=7):Question=>({type,prompt,speak,visual,answer,tip,minAge,options:[[visual,answer],["✨",wrong1],["🌿",wrong2]]});

const worlds:World[]=[
 {icon:"👋",name:"Hello!",pt:"Saudações",color:"#e5f9ed",questions:[
  Q("🔊 Listen and Choose","Listen and choose the greeting!","Hello","👋","Hello","Good night","Goodbye","It begins with the sound ‘he’."),
  Q("🖼️ Look and Choose","Geovana is leaving. What does she say?","Goodbye","👋🏼","Goodbye","My name is","Good morning","We say it when we leave."),
  Q("🌅 What do you say?","It is morning. Choose the greeting.","Good morning","🌅","Good morning","Good afternoon","Goodbye","Morning is before midday."),
  Q("☀️ What do you say?","It is after lunch. Choose the greeting.","Good afternoon","🌤️","Good afternoon","Good morning","Hi cat","Afternoon is after midday.",9),
  Q("🧩 Build the Sentence","Complete Geovana's introduction.","My name is Geovana","👧🏽","My name is Geovana.","Goodbye name.","I Geovana hello.","Use ‘My name is...’ to introduce yourself.",9)
 ]},
 {icon:"🎨",name:"Colors",pt:"Cores",color:"#fff4c9",questions:[
  Q("🔊 Listen and Choose","Which color did you hear?","Red","🔴","Red","Blue","Green","It is the color of a ripe tomato."),
  Q("🖼️ Look and Choose","What color is the Amazon river card?","Blue","🔵","Blue","Yellow","Pink","Think about clear water."),
  Q("🦜 Look and Choose","What color is this parrot?","Green","🦜","Green","Black","Purple","Many forest leaves share this color."),
  Q("🌞 Listen and Find","Find the color of the sun.","Yellow","☀️","Yellow","White","Orange","It sounds like ‘yel-low’."),
  Q("🧩 Build the Sentence","Describe the flower.","The flower is pink","🌺","The flower is pink.","Pink the flower.","The is flower green.","Start with ‘The flower is...’.",9)
 ]},
 {icon:"🔢",name:"Numbers",pt:"Números",color:"#f2eaff",questions:[
  Q("🔊 Listen and Choose","Which number did you hear?","Three","3️⃣","Three","Five","Eight","Count: one, two..."),
  Q("🐒 Count!","How many monkeys?","Four","🐒🐒🐒🐒","Four","Two","Six","Count each monkey."),
  Q("🔊 Listen and Choose","Find number twelve.","Twelve","1️⃣2️⃣","Twelve","Twenty","Ten","It comes after eleven."),
  Q("🧮 Math Mission","Two parrots plus three parrots equals...","Five","🦜🦜➕🦜🦜🦜","Five","Four","Seven","Count all the parrots.",9),
  Q("🧩 Build the Sentence","Choose the correct sentence.","I have twenty coins","🪙","I have twenty coins.","I twenty have coins.","Coins have I twelve.","Use subject + verb + number + object.",11)
 ]},
 {icon:"🐆",name:"Animals",pt:"Animais",color:"#e5f9ed",questions:[
  Q("🔊 Listen and Choose","Which animal did you hear?","Dog","🐶","Dog","Cat","Fish","It barks: woof!"),
  Q("🖼️ What is this?","Name this animal.","Jaguar","🐆","Jaguar","Monkey","Bird","This spotted cat lives in the Amazon."),
  Q("🌳 Listen and Find","Find the monkey.","Monkey","🐒","Monkey","Parrot","Fish","It climbs trees."),
  Q("🦜 What is this?","Name this colorful bird.","Parrot","🦜","Parrot","Dog","Jaguar","It can imitate sounds."),
  Q("🧩 Build the Sentence","Choose the correct sentence.","The fish swims in the river","🐟","The fish swims in the river.","The fish flies in the sky.","River the fish climbs.","Fish use fins to swim.",9)
 ]},
 {icon:"🍎",name:"Food",pt:"Comidas",color:"#fff4c9",questions:[
  Q("🔊 Listen and Choose","Which food did you hear?","Apple","🍎","Apple","Bread","Milk","It is a red or green fruit."),
  Q("🖼️ What is this?","Name this Amazon fruit.","Banana","🍌","Banana","Orange","Bread","Monkeys love this yellow fruit."),
  Q("🥤 Listen and Find","Choose the drink.","Water","💧","Water","Apple","Bread","We drink it when thirsty."),
  Q("🧃 What is this?","Name this drink.","Juice","🧃","Juice","Milk","Banana","It can be made from fruit."),
  Q("🧩 Build the Sentence","What does Geovana like?","I like orange juice","🍊","I like orange juice.","Orange I juice like.","I drink bread orange.","Begin with ‘I like...’.",9)
 ]},
 {icon:"👨‍👩‍👧",name:"Family",pt:"Família",color:"#f2eaff",questions:[
  Q("🔊 Listen and Choose","Who did you hear?","Mother","👩","Mother","Father","Brother","She can also be called mom."),
  Q("🖼️ Look and Choose","Who is he?","Father","👨","Father","Sister","Grandmother","He can also be called dad."),
  Q("👧 What is this?","Choose the family word.","Sister","👧","Sister","Grandfather","Mother","A female sibling."),
  Q("👵 Listen and Find","Find the grandmother.","Grandmother","👵","Grandmother","Brother","Father","She is a parent's mother."),
  Q("🧩 Build the Sentence","Choose the correct sentence.","This is my family","👨‍👩‍👧","This is my family.","My this family is.","Family is this your.","Use ‘This is my...’.",9)
 ]},
 {icon:"🏫",name:"School",pt:"Escola",color:"#e5f9ed",questions:[
  Q("🔊 Listen and Choose","Which school object did you hear?","Book","📘","Book","Pencil","Desk","We open it to read."),
  Q("✏️ What is this?","Name this school object.","Pencil","✏️","Pencil","Notebook","Teacher","We use it to write."),
  Q("🧑‍🏫 Listen and Find","Who teaches the class?","Teacher","🧑‍🏫","Teacher","Student","Book","This person helps students learn."),
  Q("📓 What is this?","Choose the correct word.","Notebook","📓","Notebook","School","Desk","We write notes in it."),
  Q("🧩 Build the Sentence","Choose the correct classroom sentence.","The student reads a book","🧑‍🎓","The student reads a book.","The book reads a student.","Student a pencil drinks.","Who reads? The student.",9)
 ]},
 {icon:"👕",name:"Clothes",pt:"Roupas",color:"#fff4c9",questions:[
  Q("🔊 Listen and Choose","Which clothing item did you hear?","Shirt","👕","Shirt","Shoes","Hat","We wear it on the upper body."),
  Q("👗 What is this?","Name this clothing item.","Dress","👗","Dress","Pants","Shorts","It is one piece from shoulders down."),
  Q("👟 Listen and Find","What do we wear on our feet?","Shoes","👟","Shoes","Hat","Shirt","They protect our feet."),
  Q("🧢 What is this?","Choose the correct word.","Hat","🧢","Hat","Dress","Pants","We wear it on the head."),
  Q("🧩 Build the Sentence","Describe Geovana's clothes.","She is wearing orange pants","👧🏽","She is wearing orange pants.","She orange pants is.","Pants wearing he blue.","Use ‘She is wearing...’.",11)
 ]},
 {icon:"🏃",name:"Actions",pt:"Ações",color:"#f2eaff",questions:[
  Q("🔊 Listen and Choose","Which action did you hear?","Run","🏃","Run","Sleep","Read","Move fast with your legs."),
  Q("🖼️ Look and Choose","What is the child doing?","Jump","🤸","Jump","Drink","Write","The feet leave the ground."),
  Q("📖 Listen and Find","Choose the action.","Read","📖","Read","Walk","Eat","We do this with a book."),
  Q("😴 What action is this?","Choose the correct verb.","Sleep","😴","Sleep","Run","Write","We do it at night to rest."),
  Q("🧩 Build the Sentence","Choose the correct sentence.","The children are walking","🚶‍♀️🚶","The children are walking.","Walking children the are.","The children is drink.","More than one child uses ‘are’.",11)
 ]},
 {icon:"💬",name:"Let's Talk!",pt:"Conversação",color:"#e5f9ed",questions:[
  Q("💬 Dialogue","Geovana says: ‘Hello!’ What do you answer?","Hi Geovana","👋","Hi, Geovana!","Goodbye, apple!","Blue, please.","Reply with another greeting."),
  Q("💬 Dialogue","‘What is your name?’ Choose an answer.","My name is Ana","🙂","My name is Ana.","I am ten apples.","Good afternoon name.","Introduce yourself with ‘My name is...’."),
  Q("💬 Dialogue","‘How old are you?’ Choose an answer.","I am ten years old","🔟","I am ten years old.","I have yellow.","My name old is.","Use ‘I am... years old’.",9),
  Q("💬 At school","Ask politely for a pencil.","Can I have a pencil please","✏️","Can I have a pencil, please?","Pencil run orange.","I am a pencil.","A polite request starts with ‘Can I...’.",11),
  Q("🏆 Final Dialogue","Complete: ‘I like animals. What do you like?’","I like music","🎵","I like music.","My music ten.","Like is I music.","Answer using ‘I like...’.",9)
 ]}
];
const fresh:Profile={name:"",age:8,avatar:"🧒🏽",stars:0,coins:0,xp:0,streak:0,correct:0,wrong:0,worlds:[],themeScore:{}};

function Pudin({mood="idle",small=false,home=false}:{mood?:MascotMood;small?:boolean;home?:boolean}){
 const[homeArrived,setHomeArrived]=useState(false);
 useEffect(()=>{
  if(home&&mood==="walk"){setHomeArrived(false);const t=setTimeout(()=>setHomeArrived(true),2500);return()=>clearTimeout(t)}
  setHomeArrived(false);
 },[mood,home]);
 const activeMood: MascotMood=home&&mood==="walk"&&homeArrived?"idle":mood;
 const bubble=activeMood==="correct"?"Great job! ⭐":activeMood==="wrong"?"Try again! 💛":activeMood==="talk"?"Listen! 🔊":activeMood==="walk"?"Come with me! 🐾":activeMood==="happy"?"Let’s go! 🚀":"Hi! 👋";
 return <div className={`pudin ${activeMood} ${small?"small":""} ${home?"homePudin":""}`} aria-label="Pudin, mascote do jogo"><span className="pudinBubble">{bubble}</span><span className="pudinSparkles" aria-hidden="true">✨⭐✨</span><img src="/pudin-mascot.png" alt="Pudin, gato mascote"/></div>
}

export default function Home(){
 const[screen,setScreen]=useState<Screen>("home"),[mascotMood,setMascotMood]=useState<MascotMood>("idle"),[profile,setProfile]=useState<Profile>(fresh),[loaded,setLoaded]=useState(false),[world,setWorld]=useState(0),[q,setQ]=useState(0),[feedback,setFeedback]=useState(""),[tries,setTries]=useState(0),[parentPass,setParentPass]=useState(""),[unlocked,setUnlocked]=useState(false),[sound,setSound]=useState(true);
 useEffect(()=>{const p=localStorage.getItem("geovana-profile");if(p){const old=JSON.parse(p);setProfile({...fresh,...old,themeScore:old.themeScore||{}})}setLoaded(true)},[]);
 useEffect(()=>{if(loaded)localStorage.setItem("geovana-profile",JSON.stringify(profile))},[profile,loaded]);
 const level=Math.floor(profile.xp/100)+1,accuracy=(profile.correct+profile.wrong)?Math.round(profile.correct/(profile.correct+profile.wrong)*100):0;
 const activeQuestions=useMemo(()=>{const eligible=worlds[world].questions.filter(x=>(x.minAge||7)<=profile.age);return eligible.length>=4?eligible:worlds[world].questions.slice(0,4)},[world,profile.age]);
 const speak=(text:string)=>{setMascotMood("talk");setTimeout(()=>setMascotMood("idle"),1400);if(!sound)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=profile.age<=8?.7:.82;speechSynthesis.speak(u)};
 const saveProfile=(e:React.FormEvent)=>{e.preventDefault();setScreen("intro");setTimeout(()=>speak("Hello! I'm Geovana! Welcome to Geovana's Adventures!"),350)};
 const playWorld=(i:number)=>{setWorld(i);setQ(0);setFeedback("");setTries(0);setScreen("lesson")};
 const answer=(value:string)=>{
  if(feedback)return;const item=activeQuestions[q],ok=value===item.answer,theme=worlds[world].name;
  if(ok){setMascotMood("correct");setTimeout(()=>setMascotMood("idle"),1600);setFeedback(["Great job!","Excellent!","Amazing!","You got it!"][(q+world)%4]);setProfile(p=>({...p,correct:p.correct+1,streak:p.streak+1,stars:p.stars+1,coins:p.coins+5,xp:p.xp+20,themeScore:{...p.themeScore,[theme]:{correct:(p.themeScore[theme]?.correct||0)+1,wrong:p.themeScore[theme]?.wrong||0}}}));if(sound){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance("Great job!");u.lang="en-US";speechSynthesis.speak(u)}}
  else{setMascotMood("wrong");setTimeout(()=>setMascotMood("idle"),1500);const n=tries+1;setTries(n);setFeedback(n>=2?`💡 ${item.tip}`:"Almost! Try again!");setProfile(p=>({...p,wrong:p.wrong+1,streak:0,themeScore:{...p.themeScore,[theme]:{correct:p.themeScore[theme]?.correct||0,wrong:(p.themeScore[theme]?.wrong||0)+1}}}));if(sound){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance("Good try! Let\'s try one more time!");u.lang="en-US";speechSynthesis.speak(u)};setTimeout(()=>setFeedback(""),n>=2?2800:1400)}
 };
 const next=()=>{if(q<activeQuestions.length-1){setQ(q+1);setFeedback("");setTries(0)}else{const completed=world+1;setProfile(p=>({...p,worlds:Array.from(new Set([...p.worlds,completed])),stars:p.stars+3,coins:p.coins+20,xp:p.xp+40}));setQ(0);setFeedback("");setScreen("map")}};
 const top=<header className="top"><button className="brand" onClick={()=>setScreen("home")}><span>🌟</span><b>GEOVANA'S<br/><small>ADVENTURES</small></b></button><div className="stats"><span>🏅 {level}</span><span>⭐ {profile.stars}</span><span>🪙 {profile.coins}</span><span>🔥 {profile.streak}</span><button className="round" onClick={()=>setSound(!sound)}>{sound?"🔊":"🔇"}</button></div></header>;
 if(!loaded)return <main className="loading">🌟 Loading adventure...</main>;
 if(screen==="home")return <main className="homeOnly"><section className="heroArt" aria-label="Tela principal de As Aventuras de Geovana"><img className="heroArtImage" src="/home-pudim-v71.png?v=71" alt="As Aventuras de Geovana com Geovana e seu amigo Pudim"/><div className="heroHotspots" aria-label="Menu principal"><button className="hotPlay" onClick={()=>setScreen(profile.name?"map":"profile")} aria-label={profile.name?"Continuar jogo":"Jogar"}></button><button className="hotWorlds" onClick={()=>setScreen("map")} aria-label="Mundos"></button><button className="hotRanking" onClick={()=>setScreen("achievements")} aria-label="Ranking e conquistas"></button><button className="hotLearn" onClick={()=>setScreen("settings")} aria-label="Aprender e configurações"></button></div></section></main>;
 const item=activeQuestions[q];
 return <main>{top}
 {screen==="profile"&&<section className="panel profile"><div className="miniMascot"><img src="/geovana.png" alt="Geovana"/></div><form onSubmit={saveProfile}><p className="eyebrow">YOUR EXPLORER PROFILE</p><h2>What's your name?</h2><label>Qual é o seu nome?<input autoFocus required maxLength={20} value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})} placeholder="Digite seu nome"/></label><h2>How old are you?</h2><label>Quantos anos você tem?<input type="range" min="7" max="12" value={profile.age} onChange={e=>setProfile({...profile,age:+e.target.value})}/><strong className="age">{profile.age} anos</strong></label><h2>Choose your avatar</h2><div className="avatars">{["🧒🏽","👧🏽","🧑🏼","👦🏾","👧🏻","🧑🏿"].map(a=><button type="button" className={profile.avatar===a?"selected":""} onClick={()=>setProfile({...profile,avatar:a})} key={a}>{a}</button>)}</div><button className="primary">🚀 START MY ADVENTURE!</button></form></section>}
 {screen==="intro"&&<section className="intro"><div className="introScene"><img src="/geovana.png" alt="Geovana"/><div className="dialog"><span>👋</span><h2>Hello! I'm Geovana!</h2><p>Welcome to Geovana's Adventures!</p><b>Are you ready to learn English and have fun?</b><button className="listen" onClick={()=>speak("Hello! I'm Geovana! Welcome to Geovana's Adventures! Are you ready to learn English and have fun?")}>🔊 Listen again</button><button className="primary" onClick={()=>setScreen("map")}>🚀 YES! LET'S GO!</button></div></div></section>}
 {screen==="map"&&<section className="mapPage"><div className="sectionHead"><div><p className="eyebrow">THE AMAZON ADVENTURE MAP</p><h2>Choose your next adventure!</h2><p>Escolha sua próxima aventura, {profile.name||"explorer"}!</p></div><div className="progress"><b>{profile.worlds.length}/10 mundos</b><span><i style={{width:`${profile.worlds.length*10}%`}}/></span></div></div><div className="mapGrid">{worlds.map((w,i)=>{const open=i===0||profile.worlds.includes(i);return <button key={w.name} disabled={!open} style={{background:w.color}} className={`world ${profile.worlds.includes(i+1)?"done":""}`} onClick={()=>playWorld(i)}><span className="worldNo">{profile.worlds.includes(i+1)?"✓":i+1}</span><i>{open?w.icon:"🔒"}</i><b>{w.name}</b><small>{w.pt}</small><em>{open?(profile.worlds.includes(i+1)?"PLAY AGAIN":"PLAY NOW"):"Complete previous world"}</em></button>})}</div></section>}
 {screen==="lesson"&&<section className="lesson"><div className="lessonTop"><button onClick={()=>setScreen("map")}>← Map</button><div><b>WORLD {world+1} · {worlds[world].name.toUpperCase()}</b><span>{activeQuestions.map((_,i)=><i key={i} className={i<=q?"on":""}/>)}</span></div><span>❤️ ❤️ ❤️</span></div><div className="questCard"><div className="guide"><img src="/geovana.png" alt="Geovana guia"/><Pudin mood={mascotMood} small/><div><small>{item.type}</small><h2>{item.prompt}</h2></div></div>{item.visual&&<div className="visual">{item.visual}</div>}<button className="listen big" onClick={()=>speak(item.speak)}>🔊 LISTEN</button><div className="options">{item.options.map(([icon,label])=><button key={label} onClick={()=>answer(label)}><span>{icon}</span><b>{label}</b><small>Tap to choose</small></button>)}</div>{feedback&&<div className={`feedback ${feedback.includes("Try")||feedback.includes("💡")?"try":"good"}`}><b>{feedback}</b>{!feedback.includes("Try")&&!feedback.includes("💡")&&<button onClick={next}>{q===activeQuestions.length-1?(world===9?"🏆 COMPLETE ADVENTURE":"🏆 FINISH WORLD"):"NEXT →"}</button>}</div>}</div></section>}
 {screen==="achievements"&&<section className="panel"><div className="sectionHead"><div><p className="eyebrow">MY TREASURE ROOM</p><h2>Conquistas — Achievements</h2></div></div><div className="badges">{[["🌟","First Star",profile.stars>0],["🔥","Hot Streak",profile.streak>=3],["👋","Hello Hero",profile.worlds.includes(1)],["🎨","Color Explorer",profile.worlds.includes(2)],["🐆","Amazon Friend",profile.worlds.includes(4)],["💯","Word Master",profile.correct>=25],["🪙","Treasure Hunter",profile.coins>=100],["🏆","Grand Explorer",profile.worlds.length===10]].map(([a,b,on])=><article className={on?"earned":""} key={String(b)}><i>{a}</i><b>{b}</b><small>{on?"Unlocked!":"Keep exploring"}</small></article>)}</div><button onClick={()=>setScreen("home")}>← Voltar</button></section>}
 {screen==="settings"&&<section className="panel settings"><p className="eyebrow">SETTINGS</p><h2>Configurações</h2><button onClick={()=>setSound(!sound)}>🔊 Áudio em inglês <b>{sound?"LIGADO":"DESLIGADO"}</b></button><button onClick={()=>setScreen("profile")}>👤 Editar perfil</button><button onClick={()=>setScreen("parents")}>🔐 Área dos pais/professor</button><button onClick={()=>setScreen("home")}>← Voltar ao início</button></section>}
 {screen==="parents"&&<section className="panel parents">{!unlocked?<div className="lock"><i>🔐</i><h2>Área dos pais/professor</h2><p>Digite a senha padrão <b>1234</b>.</p><input type="password" value={parentPass} onChange={e=>setParentPass(e.target.value)} placeholder="Senha"/><button className="primary" onClick={()=>setUnlocked(parentPass==="1234")}>ENTRAR</button><button onClick={()=>setScreen("settings")}>Cancelar</button></div>:<><div className="sectionHead"><div><p className="eyebrow">LEARNING REPORT</p><h2>Progresso de {profile.name}</h2><p>{profile.age} anos · Nível {level}</p></div><button onClick={()=>setScreen("settings")}>Sair</button></div><div className="report">{[["⭐",profile.stars,"Estrelas"],["✅",profile.correct,"Acertos"],["📊",`${accuracy}%`,"Precisão"],["🌍",profile.worlds.length,"Mundos"]].map(x=><article key={String(x[2])}><i>{x[0]}</i><b>{x[1]}</b><small>{x[2]}</small></article>)}</div><h3>Desempenho por tema</h3>{worlds.map(w=>{const s=profile.themeScore[w.name],pct=s&&s.correct+s.wrong?Math.round(s.correct/(s.correct+s.wrong)*100):0;return <div className="bar" key={w.name}><label>{w.icon} {w.name} <b>{pct}%</b></label><span><i style={{width:`${pct}%`}}/></span></div>})}<div className="teacherNote">💡 <b>Recomendação:</b> repita os mundos com menor percentual e use o botão de áudio livremente. O progresso é salvo automaticamente neste aparelho.</div></>}</section>}
 </main>
}
