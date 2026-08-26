import fs from "node:fs";

const rate=44100,duration=16,samples=rate*duration;
const notes={C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392,A4:440,B4:493.88,C5:523.25,D5:587.33,E5:659.25,G5:783.99};
const melody=["C5","E5","G5","E5","D5","G5","B4","G5","A4","C5","E5","C5","F4","A4","C5","A4"];
const bass=[130.81,196,220,174.61];
const data=Buffer.alloc(samples*2);
const frac=x=>x-Math.floor(x);
const tri=x=>2*Math.abs(2*frac(x)-1)-1;
let seed=123456789;
const noise=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296*2-1};

for(let i=0;i<samples;i++){
 const t=i/rate,beat=t*160/60,eighth=Math.floor(beat*2),step=eighth%melody.length;
 const note=notes[melody[step]],within=frac(beat*2),gate=Math.exp(-3.2*within);
 const lead=(.20*Math.sin(2*Math.PI*note*t)+.07*tri(note*t*2))*gate;
 const chordIndex=Math.floor(beat/4)%4;
 const low=.13*Math.sin(2*Math.PI*bass[chordIndex]*t)*(0.7+0.3*Math.cos(2*Math.PI*frac(beat)));
 const beatPos=frac(beat),kick=Math.exp(-18*beatPos)*Math.sin(2*Math.PI*(78-35*beatPos)*t)*.30;
 const snarePos=frac(beat-.5),snare=(beatPos>.48?Math.exp(-24*snarePos)*noise()*.10:0);
 const hat=Math.exp(-38*frac(beat*2))*noise()*.045;
 const sparkle=.035*Math.sin(2*Math.PI*(1046.5+80*Math.sin(2*Math.PI*.25*t))*t)*Math.exp(-7*frac(beat/4));
 const fade=Math.min(1,t/.08,(duration-t)/.18);
 const sample=Math.max(-1,Math.min(1,(lead+low+kick+snare+hat+sparkle)*fade));
 data.writeInt16LE(Math.round(sample*32767),i*2);
}
const header=Buffer.alloc(44);header.write("RIFF",0);header.writeUInt32LE(36+data.length,4);header.write("WAVEfmt ",8);header.writeUInt32LE(16,16);header.writeUInt16LE(1,20);header.writeUInt16LE(1,22);header.writeUInt32LE(rate,24);header.writeUInt32LE(rate*2,28);header.writeUInt16LE(2,32);header.writeUInt16LE(16,34);header.write("data",36);header.writeUInt32LE(data.length,40);
fs.writeFileSync(new URL("../public/home-music.wav",import.meta.url),Buffer.concat([header,data]));
