import{r as m}from"./index.NEDEFKed.js";var l={exports:{}},a={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p=m,u=Symbol.for("react.element"),y=Symbol.for("react.fragment"),x=Object.prototype.hasOwnProperty,f=p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,h={key:!0,ref:!0,__self:!0,__source:!0};function c(s,e,o){var r,n={},i=null,d=null;o!==void 0&&(i=""+o),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(d=e.ref);for(r in e)x.call(e,r)&&!h.hasOwnProperty(r)&&(n[r]=e[r]);if(s&&s.defaultProps)for(r in e=s.defaultProps,e)n[r]===void 0&&(n[r]=e[r]);return{$$typeof:u,type:s,key:i,ref:d,props:n,_owner:f.current}}a.Fragment=y;a.jsx=c;a.jsxs=c;l.exports=a;var t=l.exports;const w=({})=>{const s=Intl.DateTimeFormat("en-US",{weekday:"long"}).format(new Date),e=[{day:"Monday",workout:"Back and Shoulders"},{day:"Wednesday",workout:"Legs and Lats"},{day:"Friday",workout:"Chest and Biceps"}];return t.jsxs(t.Fragment,{children:[e.map((o,r)=>t.jsxs("li",{className:[s===o.day?"text-emerald-400":"",r===0?"mt-2":""].join(" "),children:[t.jsxs("strong",{className:"font-bold",children:[o.day,":"]})," ",o.workout]})),t.jsx("br",{}),t.jsx("p",{children:"I'm also placing additional emphasis on neck training these days:"}),t.jsx("ul",{className:"max-w-md space-y-1 list-disc list-inside text-gray-400",children:t.jsx("li",{children:t.jsx("a",{href:"https://www.youtube.com/watch?v=gimeRpdqWQw)",className:"text-blue-500 hover:underline",target:"_blank",children:"How To Build A Thicker Neck Fast! (Simple Science-Based Training)"})})})]})};export{w as Workout};
