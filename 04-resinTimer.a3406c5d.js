!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequired7c6=r);var a=r("h6c0i"),o=48e4,i=3e5,u={year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"},c=document.querySelector("#resin"),l=function(){return parseInt(c.value)||0},d=function(){return document.querySelector("#save").checked},s=document.querySelector("[data-20]"),f=document.querySelector("[data-40]"),m=document.querySelector("[data-60]"),v=document.querySelector("[data-date]"),g=document.querySelector("[data-plus]"),N=document.querySelector("[data-minus]"),S=document.querySelector("[data-warningFull]"),y=document.querySelector("#save"),w=0,b={date:Number(new Date-i),resin:l(),saving:!0},p=function(){if(d()){var e={date:Number(new Date-i),resin:l(),saving:!0};console.log(e),localStorage.setItem("save",JSON.stringify(e)),a.Notify.success("Saving data.")}};b=JSON.parse(localStorage.getItem("save")),function(){b||(b={date:Number(new Date-i),resin:l(),saving:!1});var e=(w=Number(new Date-i))-b.date,t=Math.floor(e/o)-0,n=0+Number(b.resin+t);b.resin!=n&&a.Notify.warning("Updated "+b.resin+" -> "+n+" (time= "+e+" )"),c.value=n}(),document.querySelector("#save").checked=JSON.parse(b.saving),d()&&a.Notify.warning("Data loaded.");var D=null,h=function(){console.log("tick: got one resin more"),c.value=Number(l())+1,p(),a.Notify.info("Resin increased to ".concat(c.value))};function M(e){var t=6e4,n=36e5,r=24*n;return{days:String(Math.floor(e/r)).padStart(2,0),hours:String(Math.floor(e%r/n)).padStart(2,0),minutes:String(Math.floor(e%r%n/t)).padStart(2,0),seconds:String(Math.floor(e%r%n%t/1e3)).padStart(2,0)}}var L=function(e,t){return(t-e%t)*o+w},q=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"date";return"date"==t?"date ":"".concat(e.hours,"h  ").concat(e.minutes,"min ").concat(e.seconds,"s")},I=function(){var e=L(l(),160),t=new Date(e);M(Number(e)-Number(new Date));s.innerHTML=q(M(Number(L(l(),20))-Number(new Date)),"countdown"),f.innerHTML=q(M(Number(L(l(),40))-Number(new Date)),"countdown");var n=new Date(Number(L(l(),60))).toLocaleDateString("pl-PL",u);m.innerHTML=n,v.innerHTML=new Date(Number(L(l(),160))).toLocaleDateString("pl-PL",u),S.innerHTML=Number(t.getDay())==Number((new Date).getDay())?" Dzisiaj":t.getHours()<9?"Rano":" "};g.addEventListener("click",(function(){l()+20<=160?(c.value=Number(c.value)+20,p()):c.value=160})),N.addEventListener("click",(function(){l()-20>=0?(c.value=Number(c.value)-20,p()):c.value=0})),c.addEventListener("change",(function(){p()})),y.addEventListener("change",(function(){d()?p():(a.Notify.failure("Deleting data from local storage."),b={date:Number(new Date-i),resin:l(),saving:!1},localStorage.setItem("save",""))}));var T,H,E,O,k;L(l(),160);I(),setInterval(I,1e3),D=setInterval((function(){clearInterval(D),h(),D=setInterval(h,o)}),(T=new Date,H=36e5*T.getHours()+6e4*T.getMinutes()+1e3*T.getSeconds()+T.getMilliseconds()-i,E=o-H%o,O=Math.floor(E/6e4)-0,k=Math.floor((E-6e4*O)/1e3)-0,a.Notify.info("Resin incease in ".concat(O,"m  ").concat(k-1,"s")),E))}();
//# sourceMappingURL=04-resinTimer.a3406c5d.js.map
