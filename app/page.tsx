"use client";
import {useEffect,useMemo,useRef,useState} from "react";
type Q={en:string;pt:string;o:string[];a:number;icon:string;hint?:string};
type World={icon:string;name:string;pt:string,place:string,color:string,questions:Q[]};
const W:World[]=[
 {icon:"🏝️",name:"Greetings Island",pt:"Ilha das Saudações",place:"Uma ilha tropical onde cada encontro começa com uma nova expressão!",color:"#15b75c",questions:[
  {en:"How do you greet someone?",pt:"Como você cumprimenta alguém?",o:["Hello","Goodbye","Sorry"],a:0,icon:"👋"},{en:"What do you say in the morning?",pt:"O que você diz pela manhã?",o:["Good night","Good afternoon","Good morning"],a:2,icon:"☀️"},{en:"Choose the farewell.",pt:"Escolha a despedida.",o:["Please","Welcome","Goodbye"],a:2,icon:"👋"},{en:"How are you?",pt:"Como você está?",o:["My name is Geovana.","I'm fine, thank you!","I live in Brazil."],a:1,icon:"😊"},{en:"Which sentence says that you are well?",pt:"Qual frase diz que você está bem?",o:["I am tired.","I am hungry.","I am fine, thank you."],a:2,icon:"💛"},{en:"Which question asks for someone's name?",pt:"Qual pergunta pede o nome de alguém?",o:["How are you?","What is your name?","How old are you?"],a:1,icon:"🪪"},{en:"What do you say after meeting someone?",pt:"O que você diz ao conhecer alguém?",o:["Excuse me.","See you tomorrow.","Nice to meet you!"],a:2,icon:"🤝"},{en:"Which expression means you will meet again later?",pt:"Qual expressão indica que vocês se encontrarão mais tarde?",o:["Good morning!","See you later!","You're welcome."],a:1,icon:"⏰"},{en:"When do you say 'Good night'?",pt:"Quando você diz “Good night”?",o:["At night","In the morning","At noon"],a:0,icon:"🌙"},{en:"What do you say when someone thanks you?",pt:"O que você diz quando alguém agradece?",o:["Please.","Sorry.","You're welcome."],a:2,icon:"✨"}]},
 {icon:"🐾",name:"Animal Forest",pt:"Floresta dos Animais",place:"Explore a floresta com Pudim e descubra os nomes dos animais!",color:"#8c35e8",questions:[
  {en:"Which animal says meow?",pt:"Qual animal faz miau?",o:["Cat","Dog","Bird"],a:0,icon:"🐱"},{en:"Which word means cachorro?",pt:"Qual palavra significa cachorro?",o:["Fish","Dog","Rabbit"],a:1,icon:"❓"},{en:"What animal can fly?",pt:"Qual animal pode voar?",o:["Bird","Horse","Lion"],a:0,icon:"🐦"},{en:"A fish lives in...",pt:"Um peixe vive...",o:["the sky","the water","the tree"],a:1,icon:"🐟"},{en:"Which animal has a long trunk?",pt:"Qual animal tem uma tromba longa?",o:["Elephant","Monkey","Frog"],a:0,icon:"🌳"},{en:"The king of the jungle is the...",pt:"O rei da selva é o...",o:["Rabbit","Lion","Duck"],a:1,icon:"🦁"},{en:"Which animal likes bananas?",pt:"Qual animal gosta de bananas?",o:["Monkey","Turtle","Cow"],a:0,icon:"🐒"},{en:"A rabbit has long...",pt:"Um coelho tem longas...",o:["wings","ears","fins"],a:1,icon:"🐰"},{en:"Choose the farm animal.",pt:"Escolha o animal da fazenda.",o:["Cow","Whale","Tiger"],a:0,icon:"🐮"},{en:"A turtle is usually...",pt:"Uma tartaruga geralmente é...",o:["fast","slow","loud"],a:1,icon:"🐢"}]},
 {icon:"🏙️",name:"London City",pt:"Cidade de Londres",place:"Passeie por Londres aprendendo cores, números e objetos!",color:"#1675d1",questions:[
  {en:"What color is a traditional London double-decker bus?",pt:"Qual é a cor tradicional do ônibus de dois andares de Londres?",o:["Red","Green","Purple"],a:0,icon:"🎨"},{en:"What number comes after nine?",pt:"Qual número vem depois de nove?",o:["Eight","Ten","Twenty"],a:1,icon:"🔟"},{en:"The sky is usually...",pt:"O céu geralmente é...",o:["Blue","Orange","Black"],a:0,icon:"🌤️"},{en:"How many fingers on one hand?",pt:"Quantos dedos em uma mão?",o:["Three","Five","Seven"],a:1,icon:"✋"},{en:"What tells the time?",pt:"O que informa as horas?",o:["Clock","Book","Chair"],a:0,icon:"🕰️"},{en:"Choose the yellow object.",pt:"Escolha o objeto amarelo.",o:["Banana","Bus","Cloud"],a:0,icon:"🍌"},{en:"You read a...",pt:"Você lê um...",o:["Table","Book","Door"],a:1,icon:"📕"},{en:"One plus two is...",pt:"Um mais dois é...",o:["Two","Three","Four"],a:1,icon:"3️⃣"},{en:"Grass is usually...",pt:"A grama geralmente é...",o:["Green","Pink","Gray"],a:0,icon:"🌿"},{en:"You sit on a...",pt:"Você senta em uma...",o:["Window","Chair","Pencil"],a:1,icon:"🪑"}]},
 {icon:"🗽",name:"New York Quest",pt:"Aventura em Nova York",place:"A missão final reúne família, alimentos e lugares da cidade!",color:"#ed287d",questions:[
  {en:"My mother's son is my...",pt:"O filho da minha mãe é meu...",o:["Brother","Uncle","Father"],a:0,icon:"👦"},{en:"Which food is a fruit?",pt:"Qual alimento é uma fruta?",o:["Bread","Apple","Cheese"],a:1,icon:"🍎"},{en:"Where do students learn?",pt:"Onde os estudantes aprendem?",o:["School","Hospital","Airport"],a:0,icon:"🏫"},{en:"How do you say 'mãe' in English?",pt:"Como se diz “mãe” em inglês?",o:["Sister","Mother","Aunt"],a:1,icon:"👩"},{en:"Where can you see a doctor?",pt:"Onde você encontra um médico?",o:["Park","Hospital","Cinema"],a:1,icon:"🏥"},{en:"Which drink is white?",pt:"Qual bebida é branca?",o:["Milk","Coffee","Juice"],a:0,icon:"🥛"},{en:"You can buy food at the...",pt:"Você compra alimentos no...",o:["Library","Supermarket","Museum"],a:1,icon:"🛒"},{en:"My mother's mother is my...",pt:"A mãe da minha mãe é minha...",o:["Grandmother","Cousin","Daughter"],a:0,icon:"👵"},{en:"Which food is made with cheese?",pt:"Qual alimento é feito com queijo?",o:["Pizza","Apple","Rice"],a:0,icon:"🍕"},{en:"The Statue of Liberty is in...",pt:"A Estátua da Liberdade fica em...",o:["London","New York","Paris"],a:1,icon:"🗽"}]}
];

type Screen="home"|"worlds"|"game"|"ranking"|"learn"|"speaking"|"result"|"profile";

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



const LEARN_CATEGORIES=[
 {name:"Animals",pt:"Animais",icon:"🐾",items:[["🐱","Cat","Gato"],["🐶","Dog","Cachorro"],["🐰","Rabbit","Coelho"],["🐟","Fish","Peixe"],["🐘","Elephant","Elefante"],["🦁","Lion","Leão"]]},
 {name:"Family",pt:"Família",icon:"👨‍👩‍👧‍👦",items:[["👩‍👧","Mother","Mãe"],["👨‍👧","Father","Pai"],["👧","Sister","Irmã"],["👦","Brother","Irmão"],["👵","Grandmother","Avó"],["👴","Grandfather","Avô"]]},
 {name:"Colors",pt:"Cores",icon:"🎨",items:[["🔴","Red","Vermelho"],["🔵","Blue","Azul"],["🟢","Green","Verde"],["🟡","Yellow","Amarelo"],["🟣","Purple","Roxo"],["🟠","Orange","Laranja"]]},
 {name:"Greetings",pt:"Saudações",icon:"👋",items:[["👋","Hello","Olá"],["🌅","Good morning","Bom dia"],["🌞","Good afternoon","Boa tarde"],["🌙","Good night","Boa noite"],["😊","How are you?","Como você está?"],["👋","Goodbye","Tchau"]]},
 {name:"Food",pt:"Comidas",icon:"🍎",items:[["🍎","Apple","Maçã"],["🍌","Banana","Banana"],["🍞","Bread","Pão"],["🥛","Milk","Leite"],["🍚","Rice","Arroz"],["🥚","Egg","Ovo"]]},
 {name:"School",pt:"Escola",icon:"🎒",items:[["📚","Book","Livro"],["✏️","Pencil","Lápis"],["🖊️","Pen","Caneta"],["📓","Notebook","Caderno"],["🎒","Backpack","Mochila"],["🏫","School","Escola"]]},
 {name:"Numbers",pt:"Números",icon:"🔢",items:[["1️⃣","One","Um"],["2️⃣","Two","Dois"],["3️⃣","Three","Três"],["4️⃣","Four","Quatro"],["5️⃣","Five","Cinco"],["6️⃣","Six","Seis"],["7️⃣","Seven","Sete"],["8️⃣","Eight","Oito"],["9️⃣","Nine","Nove"],["🔟","Ten","Dez"]]},
 {name:"Body",pt:"Corpo",icon:"🧒",items:[["👁️","Eyes","Olhos"],["👂","Ears","Orelhas"],["👃","Nose","Nariz"],["👄","Mouth","Boca"],["✋","Hand","Mão"],["🦶","Foot","Pé"]]}
];
const CHAT_STEPS=[
 {q:"Hi! What's your name?",pt:"Oi! Qual é o seu nome?",example:"My name is Geovana.",kind:"name"},
 {q:"How are you today?",pt:"Como você está hoje?",example:"I am fine, thank you.",kind:"feeling"},
 {q:"How old are you?",pt:"Quantos anos você tem?",example:"I am nine years old.",kind:"age"},
 {q:"Where are you from?",pt:"De onde você é?",example:"I am from Brazil.",kind:"place"},
 {q:"What's your favorite color?",pt:"Qual é a sua cor favorita?",example:"My favorite color is blue.",kind:"color"},
 {q:"What's your favorite animal?",pt:"Qual é o seu animal favorito?",example:"My favorite animal is a cat.",kind:"animal"},
 {q:"What's your favorite food?",pt:"Qual é a sua comida favorita?",example:"My favorite food is pizza.",kind:"food"},
 {q:"What do you like to do?",pt:"O que você gosta de fazer?",example:"I like to play and read.",kind:"hobby"}
];

function Speaking({onBack}:{onBack:()=>void}){
 const [step,setStep]=useState(0);
 const [messages,setMessages]=useState<{who:"pudim"|"user";text:string;pt?:string}[]>([{who:"pudim",text:CHAT_STEPS[0].q,pt:CHAT_STEPS[0].pt}]);
 const [listening,setListening]=useState(false),[supported,setSupported]=useState(true),[finished,setFinished]=useState(false);
 const [typing,setTyping]=useState(false);
 const [pudimChatState,setPudimChatState]=useState<"walk"|"front"|"talk">("walk");
 const [pudimChatTip,setPudimChatTip]=useState("");
 const chatBodyRef=useRef<HTMLDivElement|null>(null);
 const item=CHAT_STEPS[Math.min(step,CHAT_STEPS.length-1)];

 useEffect(()=>{setSupported(typeof window!=="undefined"&&!!((window as any).SpeechRecognition||(window as any).webkitSpeechRecognition));setTimeout(()=>speak(CHAT_STEPS[0].q,"en-US",1.18),350)},[]);
 useEffect(()=>{const el=chatBodyRef.current;if(el)el.scrollTo({top:el.scrollHeight,behavior:"smooth"})},[messages,typing,finished]);

 const translatePudim=(en:string)=>{
  if(en.startsWith("Please answer in English"))return "Responda em inglês. Use o exemplo mostrado abaixo para ajudar.";
  if(en.startsWith("Nice to meet you"))return en.replace(/Nice to meet you,\s*([^!]+)!.*/i,"Prazer em conhecer você, $1! Eu sou o Pudim. Como você está hoje?");
  if(en.startsWith("Hmm... I didn't understand your name"))return "Hmm... Eu não entendi seu nome. Tente dizer: My name is Geovana.";
  if(en.startsWith("That's good to hear"))return "Que bom saber disso! Quantos anos você tem?";
  if(en.startsWith("I hope you feel better soon"))return "Espero que você se sinta melhor logo. Quantos anos você tem?";
  if(en.startsWith("I didn't understand how you feel"))return "Eu não entendi como você está se sentindo. Você pode dizer: I am fine, I am happy ou I am tired.";
  if(en.includes("years old! Cool!"))return "Que legal! De onde você é?";
  if(en.startsWith("I didn't catch your age"))return "Eu não entendi sua idade. Tente dizer: I am nine years old.";
  if(en.startsWith("Brazil! What a wonderful place"))return "Brasil! Que lugar maravilhoso! Qual é a sua cor favorita?";
  if(en.startsWith("Thanks for telling me where you're from"))return "Obrigado por me contar de onde você é! Qual é a sua cor favorita?";
  if(en.startsWith("I didn't understand where you're from"))return "Não entendi de onde você é. Tente dizer: I am from Brazil.";
  if(en.includes("is a beautiful color!"))return "É uma cor linda! Eu gosto de amarelo. Qual é o seu animal favorito?";
  if(en.startsWith("Hmm... I didn't hear a color"))return "Hmm... Eu não ouvi uma cor. Tente: My favorite color is blue.";
  if(en.includes("Great choice! I love animals too"))return "Ótima escolha! Eu também adoro animais. Você pode usar a frase completa mostrada pelo Pudim. Qual é a sua comida favorita?";
  if(en.startsWith("I didn't understand the animal"))return "Eu não entendi o animal. Tente dizer: My favorite animal is a cat.";
  if(en.startsWith("Yummy! You can say"))return "Que delícia! Você pode dizer a frase completa mostrada pelo Pudim. O que você gosta de fazer?";
  if(en.startsWith("I didn't understand the food"))return "Eu não entendi a comida. Tente dizer: My favorite food is pizza.";
  if(en.startsWith("That sounds fun! You can say"))return "Parece divertido! Você pode usar a frase completa. Adorei conversar com você. Até logo!";
  if(en.startsWith("Tell me an activity you enjoy"))return "Conte uma atividade de que você gosta. Tente dizer: I like to play.";
  if(en.startsWith("Almost! Do not use 'you'"))return "Quase! Não use “you” entre “like” e “to”. Diga: I like to play the guitar.";
  if(en.startsWith("I understood the activity"))return "Eu entendi a atividade, mas tente responder com uma frase completa: I like to play the guitar.";
  if(en.startsWith("Great correction!"))return "Ótima correção! Agora a frase está correta. Adorei conversar com você. Continue praticando inglês!";
  return "";
 };

 const looksPortuguese=(text:string)=>{
  const t=(" "+text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")+" ");
  const ptWords=[" meu "," minha "," nome "," eu "," sou "," estou "," tenho "," anos "," bem "," feliz "," triste "," cansado "," cansada "," azul "," vermelho "," verde "," amarelo "," roxo "," rosa "," gato "," cachorro "," coelho "," peixe "," leao "," elefante "," macaco "," cavalo "," e "," favorito "," favorita "];
  return ptWords.some(w=>t.includes(w));
 };

 const understand=(text:string)=>{
  const t=text.toLowerCase().trim();
  if(looksPortuguese(t)){
   return {ok:false,reply:`Please answer in English. Try saying: ${item.example}`};
  }
  if(item.kind==="name"){
   const m=t.match(/(?:my name is|i am|i'm)\s+([a-z]+)/i);
   if(m)return {ok:true,value:m[1],reply:`Nice to meet you, ${m[1]}! I'm Pudim. How are you today?`};
   if(/^[a-z]{2,18}$/i.test(t))return {ok:true,value:t,reply:`Nice to meet you, ${t}! I'm Pudim. How are you today?`};
   return {ok:false,reply:"Hmm... I didn't understand your name. Try saying: My name is Geovana."};
  }
  if(item.kind==="feeling"){
   const feelings=["fine","good","great","happy","okay","ok","sad","tired","excited"];
   const f=feelings.find(x=>t.includes(x));
   if(f)return {ok:true,value:f,reply:f==="sad"||f==="tired"?`I hope you feel better soon. How old are you?`:`That's good to hear! How old are you?`};
   return {ok:false,reply:"I didn't understand how you feel. You can say: I am fine, I am happy, or I am tired."};
  }
  if(item.kind==="age"){
   const nums:any={one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15};
   const digit=t.match(/\b([5-9]|1[0-5])\b/); const word=Object.keys(nums).find(n=>t.includes(n));
   const age=digit?digit[1]:(word?String(nums[word]):"");
   if(age)return {ok:true,value:age,reply:`${age} years old! Cool! Where are you from?`};
   return {ok:false,reply:"I didn't catch your age. Try saying: I am nine years old."};
  }
  if(item.kind==="place"){
   const placeMatch=t.match(/(?:i am|i'm) from\s+([a-z ]{2,30})/i);
   const place=(placeMatch?.[1]||(/\bbrazil\b/i.test(t)?"Brazil":"")).trim();
   if(place){const label=place.replace(/\b\w/g,c=>c.toUpperCase());return {ok:true,value:label,reply:label==="Brazil"?"Brazil! What a wonderful place! What's your favorite color?":`Thanks for telling me where you're from! What's your favorite color?`}}
   return {ok:false,reply:"I didn't understand where you're from. Try saying: I am from Brazil."};
  }
  if(item.kind==="color"){
   const colors=["red","blue","green","yellow","purple","orange","pink","black","white","brown"];
   const c=colors.find(x=>t.includes(x));
   if(c)return {ok:true,value:c,reply:`${c.charAt(0).toUpperCase()+c.slice(1)} is a beautiful color! You can say: My favorite color is ${c}. I like yellow. What's your favorite animal?`};
   return {ok:false,reply:"Hmm... I didn't hear a color. Try: My favorite color is blue."};
  }
  if(item.kind==="animal"){
   const animals=["cat","dog","rabbit","fish","bird","lion","tiger","elephant","monkey","horse"];
   const animal=animals.find(x=>t.includes(x));
   if(animal)return {ok:true,value:animal,reply:`A ${animal}! Great choice! I love animals too. You can say: My favorite animal is a ${animal}. What's your favorite food?`};
   return {ok:false,reply:"I didn't understand the animal. Try saying: My favorite animal is a cat."};
  }
  if(item.kind==="food"){
   const foods=["pizza","apple","banana","rice","bread","cheese","egg","cake","pasta","chicken","fish"];
   const food=foods.find(x=>t.includes(x));
   if(food)return {ok:true,value:food,reply:`Yummy! You can say: My favorite food is ${food}. What do you like to do?`};
   return {ok:false,reply:"I didn't understand the food. Try saying: My favorite food is pizza."};
  }
  if(/\bi like you to\b/i.test(t))return {ok:false,reply:"Almost! Do not use 'you' between 'like' and 'to'. Say: I like to play the guitar."};
  const infinitives=["play","read","dance","draw","sing","swim","study","run","ride","cook"];
  const gerunds:{[key:string]:string}={playing:"play",reading:"read",dancing:"dance",drawing:"draw",singing:"sing",swimming:"swim",studying:"study",running:"run",riding:"ride",cooking:"cook"};
  const infinitive=infinitives.find(x=>new RegExp(`\\bi (?:really )?like to ${x}\\b`,"i").test(t));
  const gerund=Object.keys(gerunds).find(x=>new RegExp(`\\bi (?:really )?like ${x}\\b`,"i").test(t));
  const activity=infinitive||(gerund?gerunds[gerund]:"");
  if(activity)return {ok:true,value:activity,reply:`Great correction! “I like to ${activity}” is correct. I loved talking with you today. Keep practicing English. See you soon!`};
  const understood=infinitives.find(x=>t.includes(x))||Object.keys(gerunds).find(x=>t.includes(x));
  if(understood)return {ok:false,reply:"I understood the activity, but please use a complete sentence. Try: I like to play the guitar."};
  return {ok:false,reply:"Tell me an activity you enjoy. Try saying: I like to play."};
 };

 const respond=(text:string)=>{
  const clean=text.trim();if(!clean)return;
  const display=clean.charAt(0).toUpperCase()+clean.slice(1)+( /[.!?]$/.test(clean)?"":".");
  setMessages(m=>[...m,{who:"user",text:display}]);
  const result=understand(clean);
  setTyping(true);
  setTimeout(()=>{
   setTyping(false);
   setMessages(m=>[...m,{who:"pudim",text:result.reply,pt:translatePudim(result.reply)}]);
   setPudimChatState("talk");
   speak(result.reply,"en-US",1.18);
   setTimeout(()=>setPudimChatState("walk"),2600);
   if(result.ok){
    if(step>=CHAT_STEPS.length-1)setFinished(true);
    else setStep(v=>v+1);
   }
   // resposta inválida: permanece na mesma pergunta
  },900);
 };

 const interactPudim=()=>{
  setPudimChatState("front");
  const hints=[
   `Need help? Try: ${item.example}`,
   "Are you okay? You can tap the microphone and answer me.",
   "Do you have a question? Listen to the example and try again!"
  ];
  const hint=hints[Math.floor(Math.random()*hints.length)];
  setPudimChatTip(hint);
  speak(hint,"en-US",1.16);
  setTimeout(()=>{setPudimChatTip("");setPudimChatState("walk")},3600);
 };

 const listen=()=>{
  const SR=(window as any).SpeechRecognition||(window as any).webkitSpeechRecognition;
  if(!SR){setSupported(false);return}
  const rec=new SR();rec.lang="en-US";rec.interimResults=false;rec.maxAlternatives=4;setListening(true);
  rec.onresult=(e:any)=>respond(String(e.results[0][0].transcript||""));
  rec.onerror=()=>setListening(false);rec.onend=()=>setListening(false);rec.start();
 };
 const restart=()=>{setStep(0);setFinished(false);setTyping(false);setMessages([{who:"pudim",text:CHAT_STEPS[0].q,pt:CHAT_STEPS[0].pt}]);speak(CHAT_STEPS[0].q,"en-US",1.18)};

 return <main className="screen"><header className="top"><button onClick={onBack}>←</button><h1>💬 Conversation</h1><span/></header>
  <section className="chat-scene">
   <div className="conversation-landmarks" aria-hidden="true"><span>🇬🇧</span><span>🕰️</span><span>🌎</span><span>🗽</span><span>🇺🇸</span></div>
   <div className="chat-geovana"><div className="geovana-welcome"><b>Let's talk!</b><small>Vamos conversar!</small></div><img src="/geovana-learn.png" alt="Geovana"/></div>
   <div className="chat-phone">
    <div className="chat-head"><img src="/sprites/pudim-front.png" alt="Pudim"/><div><b>Pudim</b><small>{typing?"● typing...":listening?"● listening...":"● online • English coach"}</small></div><em>{Math.min(step+1,CHAT_STEPS.length)}/{CHAT_STEPS.length}</em></div>
    <div className="chat-body" ref={chatBodyRef}>
     {messages.map((m,i)=><div key={i} className={`chat-row ${m.who}`}><div className="chat-bubble"><b className="chat-en">{m.text}</b>{m.who==="pudim"&&m.pt&&<span className="chat-pt">🇧🇷 {m.pt}</span>}<small>{m.who==="pudim"?"Pudim":"You"}</small></div></div>)}
     {typing&&<div className="chat-row pudim"><div className="chat-typing" aria-label="Pudim está digitando"><i/><i/><i/></div></div>}
     {!finished&&<div className="chat-help"><b>💡 Your turn — answer in English</b><span>Example: {item.example}</span><span className="translation">{item.pt}</span></div>}
    </div>
    <div className="chat-compose">{!finished?<><button className={`chat-mic ${listening?"listening":""}`} onClick={listen} disabled={listening||!supported}>🎤</button><button className="chat-example" onClick={()=>speak(item.example,"en-US",1.12)}>🔊 Ouvir exemplo</button></>:<button className="chat-restart" onClick={restart}>🔄 Conversar novamente</button>}</div>
    {!supported&&<div className="speech-warning">Use Chrome ou Edge e permita o microfone.</div>}
   </div>
   <div className={`chat-pudim-walk ${pudimChatState}`} onClick={interactPudim} role="button" tabIndex={0}>
    {pudimChatTip&&<div className="chat-pudim-tip">{pudimChatTip}<span>{pudimChatTip.startsWith("Need")?"Precisa de ajuda?":"Clique no Pudim para receber ajuda."}</span></div>}
    <img src={pudimChatState==="walk"?"/sprites/walk-clean-2.png":"/sprites/pudim-front.png"} alt="Pudim interativo"/>
   </div>
  </section>
 </main>
}


function PronunciationTrainer({word,onClose}:{word:string;onClose:()=>void}){
 const [listening,setListening]=useState(false);
 const [heard,setHeard]=useState("");
 const [status,setStatus]=useState<"idle"|"good"|"retry">("idle");
 const normalize=(v:string)=>v.toLowerCase().replace(/[^a-z0-9 ]/g,"").trim();

 const listen=()=>{
  const SR=(window as any).SpeechRecognition||(window as any).webkitSpeechRecognition;
  if(!SR){setHeard("Microfone indisponível neste navegador.");setStatus("retry");return}
  const rec=new SR();rec.lang="en-US";rec.interimResults=false;rec.maxAlternatives=5;
  setListening(true);setHeard("");setStatus("idle");
  rec.onresult=(e:any)=>{
   const alternatives=Array.from(e.results[0]||[]).map((x:any)=>String(x.transcript||""));
   const first=alternatives[0]||"";setHeard(first);
   const target=normalize(word);
   const ok=alternatives.some(v=>{const n=normalize(v);return n===target||n.includes(target)||target.includes(n)});
   setStatus(ok?"good":"retry");
   if(ok)speak("Excellent! Great pronunciation!","en-US",1.2);
   else speak(`Try again. Listen carefully: ${word}.`,"en-US",1.12);
  };
  rec.onerror=()=>{setListening(false);setStatus("retry");setHeard("Não consegui ouvir claramente.")};
  rec.onend=()=>setListening(false);rec.start();
 };
 return <div className="pronounce-overlay" onClick={onClose}>
  <div className="pronounce-card" onClick={e=>e.stopPropagation()}>
   <button className="pronounce-close" onClick={onClose}>×</button>
   <div className={`pronounce-pudim ${status}`}><img src={status==="retry"?"/sprites/pudim-front.png":"/sprites/pudim-front.png"} alt="Pudim"/></div>
   <h2>🐱 Treine com o Pudim</h2>
   <p>Diga esta palavra em inglês:</p>
   <strong className="pronounce-word">{word}</strong>
   <button className="pronounce-listen" onClick={()=>speak(word,"en-US",1.05)}>🔊 Ouvir Pudim</button>
   <button className={`pronounce-mic ${listening?"listening":""}`} onClick={listen} disabled={listening}>🎤 {listening?"Listening...":"Treinar minha fala"}</button>
   {heard&&<div className="pronounce-heard"><small>I heard:</small><b>“{heard}”</b></div>}
   {status==="good"&&<div className="pronounce-good">⭐ Excellent! Great pronunciation!<span>Excelente! Muito boa pronúncia!</span></div>}
   {status==="retry"&&<div className="pronounce-retry">🐾 Try again! Listen to Pudim.<span>Tente novamente. Ouça o Pudim e repita.</span></div>}
  </div>
 </div>
}

function Pudim({q,reaction,sound}:{q:Q;reaction:"walk"|"correct"|"wrong";sound:boolean}){
 const [x,setX]=useState(8),[dir,setDir]=useState(1),[hint,setHint]=useState(false),[frame,setFrame]=useState(0);
 const [companion,setCompanion]=useState<{en:string;pt:string;hint?:boolean}|null>(null);
 const companionTimer=useRef<ReturnType<typeof setTimeout>|null>(null);

 const walkFrames=[
  "/sprites/walk-clean-0.png","/sprites/walk-clean-1.png","/sprites/walk-clean-2.png","/sprites/walk-clean-3.png",
  "/sprites/walk-clean-4.png","/sprites/walk-clean-5.png","/sprites/walk-clean-6.png","/sprites/walk-clean-7.png"
 ];
 const frames=walkFrames;

 const phrases=[
  {en:"Are you okay?",pt:"Está tudo bem?"},
  {en:"Do you have any questions?",pt:"Você tem alguma dúvida?"},
  {en:"Do you need help?",pt:"Você precisa de ajuda?"},
  {en:"Would you like a hint?",pt:"Você quer uma dica?",hint:true},
  {en:"Take your time!",pt:"Faça com calma!"},
  {en:"You can do it!",pt:"Você consegue!"}
 ];

 useEffect(()=>{
  const id=setInterval(()=>setFrame(v=>(v+1)%frames.length),115);
  return()=>clearInterval(id);
 },[]);

 useEffect(()=>{
  if(reaction!=="walk"||hint||companion)return;
  const id=setInterval(()=>setX(v=>{
   let n=v+dir*.42;
   if(n>80){setDir(-1);n=80}
   if(n<3){setDir(1);n=3}
   return n;
  }),45);
  return()=>clearInterval(id);
 },[reaction,dir,hint,companion]);

 useEffect(()=>{
  if(companionTimer.current) clearTimeout(companionTimer.current);
  if(reaction!=="walk"||hint||companion)return;
  const delay=9000+Math.floor(Math.random()*7000);
  companionTimer.current=setTimeout(()=>{
   const p=phrases[Math.floor(Math.random()*phrases.length)];
   setCompanion(p);
   if(sound){
    speak(p.en,"en-US",1.28);
   }
   setTimeout(()=>setCompanion(null),5500);
  },delay);
  return()=>{if(companionTimer.current)clearTimeout(companionTimer.current)};
 },[q,reaction,hint,companion,sound]);

 const giveHint=()=>{
  if(reaction!=="walk")return;
  setCompanion(null);
  setHint(true);
  const answer=q.o[q.a];
  const clean=answer.replace(/[^A-Za-zÀ-ÿ]/g,"");
  const first=clean.charAt(0).toUpperCase();
  const msg=`A resposta começa com a letra ${first} e tem ${clean.length} letras. Ouça as alternativas com atenção.`;
  if(sound){
   const spokenHint=`Meow! I have a hint for you. The answer starts with the letter ${first} and has ${clean.length} letters. Listen to the choices carefully.`;
   speak(spokenHint,"en-US",1.35);
  }
  setTimeout(()=>setHint(false),8000);
 };

 const click=()=>{
   if(companion?.hint || reaction==="walk") giveHint();
 };

 let text:{en:string;pt:string};
 if(hint){
   const answer=q.o[q.a].replace(/[^A-Za-zÀ-ÿ]/g,"");
   text={en:"💡 Pudim's hint",pt:`A resposta começa com "${answer.charAt(0).toUpperCase()}" e tem ${answer.length} letras.`};
 }else if(reaction==="correct") text={en:"Great job!",pt:"Muito bem!"};
 else if(reaction==="wrong") text={en:"Think carefully!",pt:"Pense com atenção!"};
 else if(companion) text={en:companion.en,pt:companion.pt};
 else text={en:"Keep going!",pt:"Continue!"};

 return <div className="trail">
   <button type="button" className={`walker ${hint||companion?"pudim-paused":""}`} style={{left:`${x}%`}} onClick={click}
    aria-label={companion?.hint?"Pudim pergunta se você quer uma dica":"Pudim - clique para receber uma dica"}>
    <div className={`bubble ${hint?"hint-bubble":""}`}>
      <b>{text.en}</b><span>{text.pt}</span>
      {companion?.hint&&!hint&&<small>🐾 Toque no Pudim / Tap Pudim</small>}
    </div>
    {reaction==="correct"&&<div className="pudim-stars" aria-hidden="true">
      <i>⭐</i><i>✨</i><i>⭐</i><i>🌟</i><i>✨</i><i>⭐</i>
    </div>}
    <img
      src={reaction==="correct"?"/sprites/pudim-positive.png":
           reaction==="wrong"?"/sprites/pudim-sad.png":
           (hint||companion)?"/sprites/pudim-front.png":frames[frame%frames.length]}
      className={reaction==="correct"?"front-facing pudim-positive":
                 reaction==="wrong"?"front-facing pudim-sad":
                 (hint||companion)?"front-facing":(dir<0?"flip":"")}
      alt={reaction==="correct"?"Pudim comemorando":
           reaction==="wrong"?"Pudim triste":
           (hint||companion)?"Pudim olhando para o aluno":"Pudim caminhando"}
    />
   </button>
   {reaction==="walk"&&!hint&&!companion&&<div className="hint-note">🐾 Clique no Pudim para uma dica!</div>}
 </div>
}

function HomePudim({name,completed}:{name:string;completed:number}){
 const frames=[0,1,2,3,4,5,6,7].map(i=>`/sprites/walk-clean-${i}.png`);
 const [x,setX]=useState(7),[dir,setDir]=useState(1),[frame,setFrame]=useState(0);
 const [paused,setPaused]=useState(false);
 const [message,setMessage]=useState<{en:string;pt:string}|null>(null);
 const talking=useRef(false);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);

 const phrases=completed===0?[
  {en:`Hi, ${name}! Ready for your first English adventure?`,pt:`Olá, ${name}! Preparado para sua primeira aventura em inglês?`},
  {en:"Every new word is a new superpower!",pt:"Cada palavra nova é um novo superpoder!"},
  {en:"Let's learn, play, and speak English together!",pt:"Vamos aprender, jogar e falar inglês juntos!"}
 ]:completed<4?[
  {en:`Great to see you again, ${name}!`,pt:`Que bom ver você novamente, ${name}!`},
  {en:`You have completed ${completed} ${completed===1?"world":"worlds"}. Keep going!`,pt:`Você concluiu ${completed} ${completed===1?"mundo":"mundos"}. Continue!`},
  {en:"Practice a little every day and English gets easier!",pt:"Pratique um pouco todos os dias e o inglês ficará mais fácil!"}
 ]:[
  {en:`Amazing, ${name}! You explored every world!`,pt:`Incrível, ${name}! Você explorou todos os mundos!`},
  {en:"A great explorer keeps practicing. Let's speak English!",pt:"Um grande explorador continua praticando. Vamos falar inglês!"},
  {en:"Visit Learn and practice a new word with me!",pt:"Visite Aprender e pratique uma palavra nova comigo!"}
 ];

 const talk=(index?:number)=>{
  if(timer.current)clearTimeout(timer.current);
  talking.current=true;setPaused(true);
  const chosen=phrases[index??Math.floor(Math.random()*phrases.length)];
  setMessage(chosen);speak(chosen.en,"en-US",1.2);
  timer.current=setTimeout(()=>{setMessage(null);setPaused(false);talking.current=false},4300);
 };

 useEffect(()=>{
  const animation=setInterval(()=>{
   if(talking.current)return;
   setFrame(v=>(v+1)%frames.length);
   setX(v=>{
    let next=v+dir*.55;
    if(next>79){setDir(-1);next=79}
    if(next<4){setDir(1);next=4}
    return next;
   });
  },105);
  return()=>clearInterval(animation);
 },[dir]);

 useEffect(()=>{
  const invitation=setInterval(()=>{if(!talking.current)talk()},12000);
  return()=>{clearInterval(invitation);if(timer.current)clearTimeout(timer.current)};
 },[completed,name]);

 return <button type="button" className={`home-pudim ${paused?"talking":"walking"}`} style={{left:`${x}%`}}
  onClick={()=>talk(completed===0?0:1)} aria-label="Clique no Pudim para ouvir uma mensagem de incentivo"
  onKeyDown={e=>{if(e.key==="Enter"||e.key===" ")talk()}}>
   {message&&<span className="home-pudim-bubble"><b>{message.en}</b><small>🇧🇷 {message.pt}</small></span>}
   <span className="home-pudim-sparkles" aria-hidden="true">✨ ⭐ ✨</span>
   <img src={paused?"/sprites/pudim-front.png":frames[frame]} className={!paused&&dir<0?"flip":""} alt={paused?"Pudim conversando":"Pudim caminhando"}/>
  </button>;
}
export default function Home(){
 const [screen,setScreen]=useState<Screen>("home");
 const sound=true; const [english,setEnglish]=useState(false);
 const [name,setName]=useState("Geovana"),[draft,setDraft]=useState("Geovana");
 const [world,setWorld]=useState(0),[qi,setQi]=useState(0),[score,setScore]=useState(0),[coins,setCoins]=useState(0),[lives,setLives]=useState(3),[selected,setSelected]=useState<number|null>(null);
 const [completed,setCompleted]=useState<number[]>([]);
 const [voiceListening,setVoiceListening]=useState(false);
 const [voiceHeard,setVoiceHeard]=useState("");
 const [voiceMessage,setVoiceMessage]=useState("");
 const [reaction,setReaction]=useState<"walk"|"correct"|"wrong">("walk");
 const [learnCategory,setLearnCategory]=useState<number|null>(null);
 const [practiceWord,setPracticeWord]=useState<string|null>(null);
 const selectedLearnCategory = learnCategory !== null ? (LEARN_CATEGORIES[learnCategory] ?? null) : null;
 useEffect(()=>{try{const n=localStorage.getItem("geovana-player");if(n){setName(n);setDraft(n)}const c=JSON.parse(localStorage.getItem("geovana-completed")||"[]");setCompleted(c)}catch{}},[]);
 useEffect(()=>{
  if(screen!=="home")return;
  const audio=new Audio("/home-music.wav");audio.loop=true;audio.volume=.34;
  const start=()=>audio.play().catch(()=>{});
  start();
  const unlock=()=>start();
  window.addEventListener("pointerdown",unlock,{once:true});
  window.addEventListener("keydown",unlock,{once:true});
  return()=>{audio.pause();audio.currentTime=0;window.removeEventListener("pointerdown",unlock);window.removeEventListener("keydown",unlock)};
 },[screen]);
 const q=W[world].questions[qi];
 const unlocked=Math.min(4,Math.max(1,completed.length+1));
 const goWorld=(i:number)=>{if(i>=unlocked)return;setWorld(i);setQi(0);setScore(0);setCoins(0);setLives(3);setSelected(null);setVoiceHeard("");setVoiceMessage("");setReaction("walk");setScreen("game")};
 const normalizeSpeech=(text:string)=>text
   .toLowerCase()
   .normalize("NFD")
   .replace(/[\u0300-\u036f]/g,"")
   .replace(/[^a-z0-9' ]/g,"")
   .trim();

 const answerByVoice=()=>{
  if(selected!==null||voiceListening)return;
  const SR=(window as any).SpeechRecognition||(window as any).webkitSpeechRecognition;
  if(!SR){
   setVoiceMessage("O reconhecimento de voz não está disponível. Use Chrome ou Edge e permita o microfone.");
   return;
  }
  const rec=new SR();
  rec.lang="en-US";
  rec.interimResults=false;
  rec.maxAlternatives=5;
  setVoiceListening(true);
  setVoiceHeard("");
  setVoiceMessage("Listening... Fale uma das alternativas em inglês.");

  rec.onresult=(e:any)=>{
   const heard=String(e.results?.[0]?.[0]?.transcript||"").trim();
   setVoiceHeard(heard);
   const h=normalizeSpeech(heard);

   let matched=q.o.findIndex(opt=>{
    const o=normalizeSpeech(opt);
    return h===o || h.includes(o) || o.includes(h);
   });

   if(matched<0){
    // Pequena tolerância para respostas curtas reconhecidas com palavras extras.
    matched=q.o.findIndex(opt=>{
      const words=normalizeSpeech(opt).split(/\s+/).filter(Boolean);
      return words.length>0 && words.every(w=>h.includes(w));
    });
   }

   if(matched>=0){
    setVoiceMessage(`I heard: "${heard}"`);
    answer(matched);
   }else{
    setVoiceMessage(`I heard: "${heard}". Não identifiquei uma das alternativas. Tente novamente.`);
    if(sound)speak("Try again. Say one of the answer choices.","en-US",1.2);
   }
  };
  rec.onerror=(e:any)=>{
   setVoiceMessage(e?.error==="not-allowed"
     ?"Permita o acesso ao microfone para responder falando."
     :"Não consegui ouvir claramente. Tente novamente.");
  };
  rec.onend=()=>setVoiceListening(false);
  try{rec.start()}catch{setVoiceListening(false)}
 };

 const answer=(i:number)=>{
  if(selected!==null)return;
  if(i===q.a){
   setSelected(i);setReaction("correct");setScore(v=>v+10);setCoins(v=>v+5);
   speak("Excellent! Great job!","en-US",1.35);
  }else{
   setReaction("wrong");setLives(v=>Math.max(0,v-1));
   speak("Try again!","en-US",1.35);
   setTimeout(()=>setReaction(r=>r==="wrong"?"walk":r),1800);
  }
 };
 const saveProfile=()=>{
  const clean=draft.trim();
  if(!clean)return;
  setName(clean);
  try{localStorage.setItem("geovana-player",clean)}catch{}
  setScreen("home");
 };

 const next=()=>{
  if(selected!==q.a)return;
  if(qi<W[world].questions.length-1){
   setSelected(null);
   setVoiceHeard("");
   setVoiceMessage("");
   setVoiceListening(false);
   setReaction("walk");
   setQi(v=>v+1);
  }else{
   const done=[...new Set([...completed,world])];
   setCompleted(done);
   localStorage.setItem("geovana-completed",JSON.stringify(done));
   setSelected(null);
   setVoiceHeard("");
   setVoiceMessage("");
   setVoiceListening(false);
   setReaction("walk");
   setScreen("result");
  }
 };

 if(screen==="home")return <main className="home">
   <div className="poster">
    <img src="/home-main-v125.png" alt="As Aventuras de Geovana"/>
    <HomePudim name={name} completed={completed.length}/>
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

 if(screen==="learn")return <Shell title="Aprender" back={()=>{if(learnCategory!==null)setLearnCategory(null);else setScreen("home")}}>
   <div className="learn-speaking"><button onClick={()=>setScreen("speaking")}><span>💬</span><b>CONVERSAÇÃO COM PUDIM</b><small>Converse em inglês como em um chat</small><em>🎤 COMEÇAR</em></button></div>
   {learnCategory===null || !selectedLearnCategory?
    <div className="category-grid">{LEARN_CATEGORIES.map((c,i)=><button key={c.name} className="category-card" onClick={()=>setLearnCategory(i)}><span>{c.icon}</span><b>{c.name}</b><small>{c.pt}</small><em>Explorar →</em></button>)}</div>
    :
    <div className="category-view"><div className="category-title"><button onClick={()=>setLearnCategory(null)}>← Categorias</button><h2>{selectedLearnCategory?.icon} {selectedLearnCategory?.name}</h2></div><div className="vocab learn-vocab">{(selectedLearnCategory?.items ?? []).map(v=><div className="word learn-word" key={v[1]}><span>{v[0]}</span><b>{v[1]}</b><small>{v[2]}</small><div className="word-actions"><button onClick={()=>speak(v[1])}>🔊 Ouvir</button><button className="practice-speech" onClick={()=>setPracticeWord(v[1])}>🎤 Treinar fala</button></div></div>)}</div>{practiceWord&&<PronunciationTrainer word={practiceWord} onClose={()=>setPracticeWord(null)}/>}</div>}
  </Shell>;

 if(screen==="speaking")return <Speaking onBack={()=>setScreen("learn")}/>;

 if(screen==="result")return <Shell title="Missão concluída!" back={()=>setScreen("home")}><div className="card result"><h1>🎉 Parabéns, {name}!</h1><p>Você concluiu <b>{W[world].name}</b>.</p><div className="big-score">⭐ {score} pontos</div><button className="primary" onClick={()=>setScreen("worlds")}>Próximo mundo</button></div></Shell>;

 return <main className="game">
   <header className="game-head"><button onClick={()=>setScreen("worlds")}>←</button><div><b>{W[world].icon} {W[world].name}</b><small>Desafio {qi+1} de {W[world].questions.length}</small></div><div className="stats">❤️ {lives}　🪙 {coins}　⭐ {score}</div></header>
   <div className="progress"><i style={{width:`${((qi+1)/W[world].questions.length)*100}%`}}/></div>
   <section className="question-card">
    <div className="question"><span className="qicon">{q.icon}</span><div><h1>{q.en}</h1><p>{q.pt}</p></div><button className="listen" onClick={()=>sound&&speak(q.en)}>🔊 Ouvir</button></div>
    <div className="answers">{q.o.map((o,i)=><div key={o} className={`answer ${selected===i?(i===q.a?"ok":"bad"):""}`}><button onClick={()=>answer(i)} disabled={selected!==null}><span>{String.fromCharCode(65+i)}</span>{o}</button><button className="listen small" onClick={()=>sound&&speak(o)}>🔊 Ouvir</button></div>)}</div>

    <div className="voice-answer-box">
      <button
        type="button"
        className={`voice-answer-button ${voiceListening?"is-listening":""}`}
        onClick={answerByVoice}
        disabled={selected!==null||voiceListening}
      >
        <span className="voice-mic">{voiceListening?"🎙️":"🎤"}</span>
        <span>
          <b>{voiceListening?"Listening...":"Responder falando"}</b>
          <small>Say your answer in English</small>
        </span>
      </button>
      {(voiceMessage||voiceHeard)&&<div className="voice-answer-feedback">
        {voiceListening&&<span className="voice-wave">● ● ●</span>}
        <strong>{voiceMessage}</strong>
      </div>}
    </div>

    {selected===q.a&&<button className="next" onClick={next}>{qi===W[world].questions.length-1?"Concluir":"Próximo →"}</button>}
   </section>
   <Pudim key={`pudim-${world}-${qi}`} q={q} reaction={reaction} sound={sound}/>
 </main>
}

function Shell({title,back,children}:{title:string;back:()=>void;children:React.ReactNode}){
 return <main className="screen"><header className="top"><button onClick={back}>←</button><h1>{title}</h1><span/></header><section className="content">{children}</section></main>
}
