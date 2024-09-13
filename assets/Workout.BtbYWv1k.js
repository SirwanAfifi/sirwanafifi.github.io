import{r as m}from"./index.NEDEFKed.js";var u={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var i=m,p=Symbol.for("react.element"),f=Symbol.for("react.fragment"),_=Object.prototype.hasOwnProperty,c=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,k={key:!0,ref:!0,__self:!0,__source:!0};function l(t,r,o){var e,s={},d=null,y=null;o!==void 0&&(d=""+o),r.key!==void 0&&(d=""+r.key),r.ref!==void 0&&(y=r.ref);for(e in r)_.call(r,e)&&!k.hasOwnProperty(e)&&(s[e]=r[e]);if(t&&t.defaultProps)for(e in r=t.defaultProps,r)s[e]===void 0&&(s[e]=r[e]);return{$$typeof:p,type:t,key:d,ref:y,props:s,_owner:c.current}}n.Fragment=f;n.jsx=l;n.jsxs=l;u.exports=n;var a=u.exports;const w=({})=>{const t=Intl.DateTimeFormat("en-US",{weekday:"long"}).format(new Date),r=[{day:"Monday",workout:"Lats and Back"},{day:"Tuesday",workout:"Arms"},{day:"Wednesday",workout:"Legs"},{day:"Thursday",workout:"Rest"},{day:"Friday",workout:"Rest"},{day:"Saturday",workout:"Chest"},{day:"Sunday",workout:"Shoulders"}];return a.jsx(a.Fragment,{children:r.map((o,e)=>a.jsxs("li",{className:[t===o.day?"text-emerald-400":"",e===0?"mt-2":""].join(" "),children:[a.jsxs("strong",{className:"font-bold",children:[o.day,":"]})," ",o.workout]}))})};export{w as Workout};
