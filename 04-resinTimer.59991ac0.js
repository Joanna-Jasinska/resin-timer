var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequired7c6=r);var a=r("iQIUW");const o={year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"},l=document.querySelector("#resin"),i=()=>parseInt(l.value)||0,c=()=>document.querySelector("#save").checked,u=document.querySelector("[data-20]"),s=document.querySelector("[data-40]"),d=document.querySelector("[data-60]"),f=document.querySelector("[data-120]"),m=document.querySelector("[data-date]"),g=document.querySelector("[data-plus]"),v=document.querySelector("[data-minus]"),S=document.querySelector("[data-warningFull]"),y=document.querySelector("#save"),N=document.querySelector("title");let p=0,h={date:Number(new Date-305e3),resin:i(),saving:!0};const w=()=>{if(E(),c()){const e={date:Number(new Date-305e3),resin:i(),saving:!0};console.log(e),localStorage.setItem("save",JSON.stringify(e)),a.Notify.success("Saving data.")}};h=JSON.parse(localStorage.getItem("save")),(()=>{h||(h={date:Number(new Date-305e3),resin:i(),saving:!1}),p=Number(new Date-305e3);const e=p-h.date,t=Math.floor(e/48e4)-0,n=0+Number(h.resin+t);h.resin!=n&&a.Notify.warning("Updated "+h.resin+" -> "+n+" (time= "+e+" )"),l.value=n})(),document.querySelector("#save").checked=JSON.parse(h.saving),c()&&a.Notify.warning("Data loaded.");let b=null,D=null;const L=()=>{console.log("tick: got one resin more"),l.value=Number(i())+1,w(),a.Notify.info(`Resin increased to ${l.value}`)};function M(e){const t=6e4,n=36e5,r=24*n;return{days:String(Math.floor(e/r)).padStart(2,0),hours:String(Math.floor(e%r/n)).padStart(2,0),minutes:String(Math.floor(e%r%n/t)).padStart(2,0),seconds:String(Math.floor(e%r%n%t/1e3)).padStart(2,0)}}const q=(e,t)=>48e4*(t-e%t)+p,x=(e,t="date")=>"date"==t?"date ":`${e.hours}h  ${e.minutes}min ${e.seconds}s`,T=()=>{const e=q(i(),160),t=new Date(e);M(Number(e)-Number(new Date));u.innerHTML=x(M(Number(q(i(),20))-Number(new Date)),"countdown"),s.innerHTML=x(M(Number(q(i(),40))-Number(new Date)),"countdown");const n=new Date(Number(q(i(),60))).toLocaleDateString("pl-PL",o);d.innerHTML=n;const r=new Date(Number(q(i(),120))).toLocaleDateString("pl-PL",o);f.innerHTML=r,m.innerHTML=new Date(Number(q(i(),160))).toLocaleDateString("pl-PL",o),S.innerHTML=Number(t.getDay())==Number((new Date).getDay())?" Dzisiaj":t.getHours()<9?"Rano":" "};const E=()=>{N.innerHTML=i();!function(e){const t=document.createElement("canvas");t.height=64,t.width=64;const n=t.getContext("2d");n.fillStyle="#99ccff",n.font="124px serif",n.fillText("●",-10,70),n.fillStyle="white",n.font="102px serif",n.fillText("●",8,61),n.fillStyle="#ffffe6",n.font="64px serif",n.fillText(e,4,54),n.fillStyle="black",n.font="64px serif",n.fillText(e,0,50),n.fillText(e,1,51);const r=document.createElement("link");document.querySelectorAll('link[rel="icon"]').forEach((e=>e.parentNode.removeChild(e))),r.id="dynamic-favicon",r.rel="icon",r.href=t.toDataURL(),document.head.appendChild(r)}(i())};g.addEventListener("click",(()=>{i()+20<=160?(l.value=Number(l.value)+20,w()):l.value=160})),v.addEventListener("click",(()=>{i()-20>=0?(l.value=Number(l.value)-20,w()):l.value=0})),l.addEventListener("change",(()=>{w()})),y.addEventListener("change",(()=>{c()?w():(a.Notify.failure("Deleting data from local storage."),h={date:Number(new Date-305e3),resin:i(),saving:!1},localStorage.setItem("save",""))}));q(i(),160);T(),b=setInterval(T,1e3),D=setInterval((()=>{clearInterval(D),L(),D=setInterval(L,48e4)}),(()=>{const e=new Date,t=48e4-(36e5*e.getHours()+6e4*e.getMinutes()+1e3*e.getSeconds()+e.getMilliseconds()-305e3)%48e4,n=Math.floor(t/6e4)-0,r=Math.floor((t-6e4*n)/1e3)-0;return a.Notify.info(`Resin incease in ${n}m  ${r-1}s`),t})()),E();
//# sourceMappingURL=04-resinTimer.59991ac0.js.map