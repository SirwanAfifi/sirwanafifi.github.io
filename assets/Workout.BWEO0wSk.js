import{r as p}from"./index.NEDEFKed.js";var m={exports:{}},a={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u=p,y=Symbol.for("react.element"),f=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,_=u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,x={key:!0,ref:!0,__self:!0,__source:!0};function i(t,e,o){var r,n={},d=null,l=null;o!==void 0&&(d=""+o),e.key!==void 0&&(d=""+e.key),e.ref!==void 0&&(l=e.ref);for(r in e)c.call(e,r)&&!x.hasOwnProperty(r)&&(n[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)n[r]===void 0&&(n[r]=e[r]);return{$$typeof:y,type:t,key:d,ref:l,props:n,_owner:_.current}}a.Fragment=f;a.jsx=i;a.jsxs=i;m.exports=a;var s=m.exports;const j=({})=>{const t=Intl.DateTimeFormat("en-US",{weekday:"long"}).format(new Date),e=[{day:"Monday",workout:"Back and Shoulders"},{day:"Wednesday",workout:"Legs and Biceps"},{day:"Saturday",workout:"Chest and Arms"}];return s.jsx(s.Fragment,{children:e.map((o,r)=>s.jsxs("li",{className:[t===o.day?"text-emerald-400":"",r===0?"mt-2":""].join(" "),children:[s.jsxs("strong",{className:"font-bold",children:[o.day,":"]})," ",o.workout]}))})};export{j as Workout};
