var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequired7c6=r);var a=r("iQIUW");const o={year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"},i=document.querySelector("#resin"),u=()=>parseInt(i.value)||0,l=()=>document.querySelector("#save").checked,s=document.querySelector("[data-20]"),c=document.querySelector("[data-40]"),d=document.querySelector("[data-60]"),m=document.querySelector("[data-date]"),g=document.querySelector("[data-plus]"),f=document.querySelector("[data-minus]"),v=document.querySelector("[data-warningFull]"),N=document.querySelector("#save"),S=document.querySelector("title");let y=0,w={date:Number(new Date-305e3),resin:u(),saving:!0};const b=()=>{if(S.innerHTML=u(),l()){const e={date:Number(new Date-305e3),resin:u(),saving:!0};console.log(e),localStorage.setItem("save",JSON.stringify(e)),a.Notify.success("Saving data.")}};w=JSON.parse(localStorage.getItem("save")),(()=>{w||(w={date:Number(new Date-305e3),resin:u(),saving:!1}),y=Number(new Date-305e3);const e=y-w.date,t=Math.floor(e/48e4)-0,n=0+Number(w.resin+t);w.resin!=n&&a.Notify.warning("Updated "+w.resin+" -> "+n+" (time= "+e+" )"),i.value=n})(),document.querySelector("#save").checked=JSON.parse(w.saving),l()&&a.Notify.warning("Data loaded.");let p=null,D=null;const h=()=>{console.log("tick: got one resin more"),i.value=Number(u())+1,b(),a.Notify.info(`Resin increased to ${i.value}`)};function M(e){const t=6e4,n=36e5,r=24*n;return{days:String(Math.floor(e/r)).padStart(2,0),hours:String(Math.floor(e%r/n)).padStart(2,0),minutes:String(Math.floor(e%r%n/t)).padStart(2,0),seconds:String(Math.floor(e%r%n%t/1e3)).padStart(2,0)}}const L=(e,t)=>48e4*(t-e%t)+y,q=(e,t="date")=>"date"==t?"date ":`${e.hours}h  ${e.minutes}min ${e.seconds}s`,I=()=>{const e=L(u(),160),t=new Date(e);M(Number(e)-Number(new Date));s.innerHTML=q(M(Number(L(u(),20))-Number(new Date)),"countdown"),c.innerHTML=q(M(Number(L(u(),40))-Number(new Date)),"countdown");const n=new Date(Number(L(u(),60))).toLocaleDateString("pl-PL",o);d.innerHTML=n,m.innerHTML=new Date(Number(L(u(),160))).toLocaleDateString("pl-PL",o),v.innerHTML=Number(t.getDay())==Number((new Date).getDay())?" Dzisiaj":t.getHours()<9?"Rano":" "};g.addEventListener("click",(()=>{u()+20<=160?(i.value=Number(i.value)+20,b()):i.value=160})),f.addEventListener("click",(()=>{u()-20>=0?(i.value=Number(i.value)-20,b()):i.value=0})),i.addEventListener("change",(()=>{b()})),N.addEventListener("change",(()=>{l()?b():(a.Notify.failure("Deleting data from local storage."),w={date:Number(new Date-305e3),resin:u(),saving:!1},localStorage.setItem("save",""))}));L(u(),160);I(),p=setInterval(I,1e3),D=setInterval((()=>{clearInterval(D),h(),D=setInterval(h,48e4)}),(()=>{const e=new Date,t=48e4-(36e5*e.getHours()+6e4*e.getMinutes()+1e3*e.getSeconds()+e.getMilliseconds()-305e3)%48e4,n=Math.floor(t/6e4)-0,r=Math.floor((t-6e4*n)/1e3)-0;return a.Notify.info(`Resin incease in ${n}m  ${r-1}s`),t})());
//# sourceMappingURL=04-resinTimer.9269b803.js.map
