(self.webpackChunkgatsby_starter_hello_world=self.webpackChunkgatsby_starter_hello_world||[]).push([[278],{1046:function(e,t,n){"use strict";n.d(t,{w_:function(){return m}});var r=n(7294),a={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},l=r.createContext&&r.createContext(a),c=function(){return(c=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},o=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n};function i(e){return e&&e.map((function(e,t){return r.createElement(e.tag,c({key:t},e.attr),i(e.child))}))}function m(e){return function(t){return r.createElement(s,c({attr:c({},e.attr)},t),i(e.child))}}function s(e){var t=function(t){var n,a=e.attr,l=e.size,i=e.title,m=o(e,["attr","size","title"]),s=l||t.size||"1em";return t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className),r.createElement("svg",c({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,a,m,{className:n,style:c(c({color:e.color||t.color},t.style),e.style),height:s,width:s,xmlns:"http://www.w3.org/2000/svg"}),i&&r.createElement("title",null,i),e.children)};return void 0!==l?r.createElement(l.Consumer,null,(function(e){return t(e)})):t(a)}},9516:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var r=n(5444),a=n(7294),l={EN:{NAV:[{name:"home",title:"Home",to:"/"},{name:"about",title:"About me",to:"/"}]},FA:{NAV:[{name:"home",title:"صفحه اصلی",to:"/"},{name:"about",title:"درباره من",to:"/"}]}};function c(e){var t=e.children,n=(e.title,e.lang),c=void 0===n?"EN":n;return a.createElement("div",{className:"max-w-2xl mx-auto px-5 py-10 "+("FA"===c&&"rtl")},a.createElement("nav",{class:"hidden md:flex space-x-6 border-b pb-2"},l[c].NAV.map((function(e){return a.createElement(r.rU,{key:e.key,className:"text-base font-medium text-gray-500 hover:text-gray-900",to:e.to},e.title)}))),a.createElement("main",null,t),a.createElement("footer",null,"FA"===c?"© "+(new Date).getFullYear():a.createElement(a.Fragment,null,"© ",(new Date).getFullYear(),", Built with ❤️ in"," ",a.createElement("a",{href:"https://en.wikipedia.org/wiki/Sanandaj"},"Sanandaj"))))}},6333:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(7294),a=n(1279);function l(e){var t=e.date,n=e.timeToRead,l=e.tags,c=void 0===l?[]:l;return r.createElement("div",{className:"space-y-3"},r.createElement("div",{className:"space-x-1 text-sm text-gray-500 mb-2 flex flex-wrap items-center"},r.createElement(a.xHR,{className:"inline-block"}),r.createElement("time",{dateTime:t},t),r.createElement("span",{"aria-hidden":"true"},"-"),r.createElement(a.QRz,null),r.createElement("span",null,n," min read")),r.createElement("div",{className:"space-x-1"},c.map((function(e){return r.createElement("span",{key:e,className:"bg-purple-100 text-purple-800 rounded-full p-1.5 font-medium"},e)}))))}},398:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return o}});var r=n(7294),a=n(5524),l=n(9516),c=n(6333);function o(e){var t=e.data,n=e.pageContext,o=t.markdownRemark,i=o.frontmatter,m=o.html,s=o.timeToRead;return r.createElement(l.Z,{lang:n.lang},r.createElement(a.q,null,r.createElement("title",null,i.title)),r.createElement("article",null,r.createElement("header",null,r.createElement("h1",{className:"gradient-text text-5xl font-black mt-8 mb-0"},i.title),r.createElement("div",{className:"mt-4 mb-4"},!n.lang&&r.createElement(c.Z,{date:i.date,timeToRead:s,tags:i.tags}))),r.createElement("section",{className:"prose prose-lg prose-indigo",dangerouslySetInnerHTML:{__html:m}}),r.createElement("hr",{className:"h-px mb-8"}),r.createElement("footer",null)))}}}]);
//# sourceMappingURL=component---src-templates-blog-details-js-85128ab027769ecf1f0e.js.map