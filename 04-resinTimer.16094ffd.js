var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequired7c6=r);var a=r("iQIUW");const o={year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"},i=document.querySelector("#resin"),u=()=>parseInt(i.value)||0,s=()=>document.querySelector("#save").checked,l=document.querySelector("[data-20]"),d=document.querySelector("[data-40]"),c=document.querySelector("[data-60]"),m=document.querySelector("[data-date]"),g=document.querySelector("[data-plus]"),v=document.querySelector("[data-minus]"),f=document.querySelector("[data-warningFull]"),N=document.querySelector("#save");let S=0,y={date:Number(new Date-3e5),resin:u(),saving:!0};const b=()=>{if(s()){const e={date:Number(new Date-3e5),resin:u(),saving:!0};console.log(e),localStorage.setItem("save",JSON.stringify(e)),a.Notify.success("Saving data.")}};y=JSON.parse(localStorage.getItem("save")),(()=>{y||(y={date:Number(new Date-3e5),resin:u(),saving:!1}),S=Number(new Date-3e5);const e=S-y.date,t=Number(e/48e4).toFixed(0)-0,n=0+Number(y.resin+t);y.resin!=n&&a.Notify.warning("Updated "+y.resin+" -> "+n+" (time= "+e+" )"),i.value=n})(),document.querySelector("#save").checked=JSON.parse(y.saving),s()&&a.Notify.warning("Data loaded.");let w=null,p=null;const D=()=>{console.log("tick: got one resin more"),i.value=Number(u())+1,b(),a.Notify.info(`Resin increased to ${i.value}`)};function h(e){const t=6e4,n=36e5,r=24*n;return{days:String(Math.floor(e/r)).padStart(2,0),hours:String(Math.floor(e%r/n)).padStart(2,0),minutes:String(Math.floor(e%r%n/t)).padStart(2,0),seconds:String(Math.floor(e%r%n%t/1e3)).padStart(2,0)}}const L=(e,t)=>48e4*(t-e%t)+S,q=(e,t="date")=>"date"==t?"date ":`${e.hours}h  ${e.minutes}min ${e.seconds}s`,M=()=>{const e=L(u(),160),t=new Date(e);h(Number(e)-Number(new Date));l.innerHTML=q(h(Number(L(u(),20))-Number(new Date)),"countdown"),d.innerHTML=q(h(Number(L(u(),40))-Number(new Date)),"countdown");const n=new Date(Number(L(u(),60))).toLocaleDateString("pl-PL",o);c.innerHTML=n,m.innerHTML=new Date(Number(L(u(),160))).toLocaleDateString("pl-PL",o),f.innerHTML=Number(t.getDay())==Number((new Date).getDay())?" Dzisiaj":t.getHours()<9?"Rano":" "};g.addEventListener("click",(()=>{u()+20<=160?(i.value=Number(i.value)+20,b()):i.value=160})),v.addEventListener("click",(()=>{u()-20>=0?(i.value=Number(i.value)-20,b()):i.value=0})),i.addEventListener("change",(()=>{b()})),N.addEventListener("change",(()=>{s()?b():(a.Notify.failure("Deleting data from local storage."),y={date:Number(new Date-3e5),resin:u(),saving:!1},localStorage.setItem("save",""))}));L(u(),160);M(),w=setInterval(M,1e3),p=setInterval((()=>{clearInterval(p),D(),p=setInterval(D,48e4)}),(()=>{const e=new Date,t=36e5*e.getHours()+6e4*e.getMinutes()+1e3*e.getSeconds()+e.getMilliseconds()-3e5,n=48e4-t%48e4;return a.Notify.info(`Resin incease in ${(n/6e4).toFixed(0)}m  ${(n%6e4/1e3).toFixed(0)-1}s`),48e4-t%48e4})());
//# sourceMappingURL=04-resinTimer.16094ffd.js.map
