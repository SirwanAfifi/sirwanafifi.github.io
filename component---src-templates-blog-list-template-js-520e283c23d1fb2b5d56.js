(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{179:function(e,a,t){"use strict";t.r(a),t.d(a,"query",function(){return c});t(120),t(15),t(60),t(13);var n=t(0),r=t.n(n),l=t(187),i=t(191),c="479737299";a.default=function(e){var a=e.pageContext,t=a.currentPage,n=1===t,c=t===a.numPages,s=t-1==1?"/":"/page/"+(t-1).toString(),o="/page/"+(t+1).toString();return r.a.createElement(i.a,null,r.a.createElement("div",{className:"posts"},e.data.allMarkdownRemark.edges.map(function(e,a){var t=e.node.fields.slug.match(/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])-/gm).join().replace(/\-/g,"/").slice(0,-1);return r.a.createElement("div",{className:"post",key:a},r.a.createElement("h1",{className:"post-title"},r.a.createElement(l.a,{to:"/archive/"+t+"/"+e.node.frontmatter.slug},e.node.frontmatter.title)),r.a.createElement("span",{className:"post-date"},e.node.frontmatter.date),e.node.excerpt)})),r.a.createElement("div",{className:"pagination"},!n&&r.a.createElement(l.a,{to:s,rel:"prev"},"← Previous Page"),!c&&r.a.createElement(l.a,{to:o,rel:"next"},"Next Page →")))}},186:function(e,a,t){var n;e.exports=(n=t(188))&&n.default||n},187:function(e,a,t){"use strict";var n=t(0),r=t.n(n),l=t(11),i=t.n(l),c=t(59),s=t.n(c);t.d(a,"a",function(){return s.a});t(186),r.a.createContext({});i.a.object,i.a.string.isRequired,i.a.func,i.a.func},188:function(e,a,t){"use strict";t.r(a);t(24);var n=t(0),r=t.n(n),l=t(11),i=t.n(l),c=t(84),s=function(e){var a=e.location,t=e.pageResources;return t?r.a.createElement(c.a,Object.assign({location:a,pageResources:t},t.json)):null};s.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},a.default=s},189:function(e){e.exports={data:{site:{siteMetadata:{author:"Sirwan Afifi",description:"Stories from a web developer.",email:"sir1afifi@gmail.com",title:"Sirwan Afifi",twitter_username:"SirwanAfifi",url:"http://sirwan.info"}}}}},190:function(e){e.exports={data:{site:{siteMetadata:{author:"Sirwan Afifi"}}}}},191:function(e,a,t){"use strict";var n=t(0),r=t.n(n),l=t(192),i=t.n(l),c=(t(176),t(177),t(178),t(189)),s=t(187),o=function(){var e=c.data;return r.a.createElement("header",{className:"masthead"},r.a.createElement("div",{className:"masthead-inner"},r.a.createElement("div",{className:"profilepic"},r.a.createElement(s.a,{to:"/blog"},r.a.createElement("img",{src:"/avatar.png",alt:"Profile Picture"}))),r.a.createElement("h2",null,e.site.siteMetadata.author),r.a.createElement("p",{className:"lead"},e.site.siteMetadata.description),r.a.createElement("div",{className:"colophon"},r.a.createElement("ul",{className:"colophon-links"},r.a.createElement("li",null,r.a.createElement(s.a,{to:"/about"},"about")),r.a.createElement("li",null,r.a.createElement(s.a,{to:"/archive"},"archives")),r.a.createElement("li",null,r.a.createElement(s.a,{to:"#"},"contact"))),r.a.createElement("p",null,"© ",(new Date).getFullYear(),". ",e.site.siteMetadata.author," All rights reserved."))))},m=t(190),u=function(){var e=m.data;return r.a.createElement("footer",{id:"footer",className:"inner"},r.a.createElement("div",{className:"container"},r.a.createElement("div",null,r.a.createElement("div",{className:"col-md-12"},r.a.createElement("p",null,"Copyright © ",(new Date).getFullYear()," -"," ",e.site.siteMetadata.author," | Powered by Gatsby | Site design based on the ",r.a.createElement("a",{href:"http://hyde.getpoole.com/"},"Hyde theme"))))))};a.a=function(e){return r.a.createElement("div",null,r.a.createElement(o,null),r.a.createElement("div",{className:"content container"},e.children),r.a.createElement(u,null),r.a.createElement(i.a,null,r.a.createElement("body",{className:"theme-base-0d"})))}}}]);
//# sourceMappingURL=component---src-templates-blog-list-template-js-520e283c23d1fb2b5d56.js.map