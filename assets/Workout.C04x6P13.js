import{r as p}from"./index.NEDEFKed.js";var i={exports:{}},a={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u=p,y=Symbol.for("react.element"),f=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,_=u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,x={key:!0,ref:!0,__self:!0,__source:!0};function m(t,r,o){var e,n={},d=null,l=null;o!==void 0&&(d=""+o),r.key!==void 0&&(d=""+r.key),r.ref!==void 0&&(l=r.ref);for(e in r)c.call(r,e)&&!x.hasOwnProperty(e)&&(n[e]=r[e]);if(t&&t.defaultProps)for(e in r=t.defaultProps,r)n[e]===void 0&&(n[e]=r[e]);return{$$typeof:y,type:t,key:d,ref:l,props:n,_owner:_.current}}a.Fragment=f;a.jsx=m;a.jsxs=m;i.exports=a;var s=i.exports;const h=({})=>{const t=Intl.DateTimeFormat("en-US",{weekday:"long"}).format(new Date),r=[{day:"Monday",workout:"Chest and Arms"},{day:"Thursday",workout:"Back and Shoulders"},{day:"Friday",workout:"Legs and Biceps"}];return s.jsx(s.Fragment,{children:r.map((o,e)=>s.jsxs("li",{className:[t===o.day?"text-emerald-400":"",e===0?"mt-2":""].join(" "),children:[s.jsxs("strong",{className:"font-bold",children:[o.day,":"]})," ",o.workout]}))})};export{h as Workout};
