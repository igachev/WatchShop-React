"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[878],{5433:(e,s,r)=>{r.d(s,{Z:()=>t});var i=r(2791),a=r(7689),n=r(184);const t=function(e){let{type:s,onSubmit:r,errorMessage:t}=e;const[d,l]=(0,i.useState)(""),[o,c]=(0,i.useState)(""),[v,u]=(0,i.useState)("");let j={email:"",password:"",repeatPassword:""};const[x,h]=(0,i.useState)(j),p=(0,a.s0)(),g="register"===s;return(0,n.jsx)("div",{className:"".concat(s,"-container"),children:(0,n.jsxs)("div",{className:"".concat(s,"-form-container"),children:[(0,n.jsxs)("form",{onSubmit:function(e){e.preventDefault();let s=!1,i={...j};""===d&&(s=!0,i.email="Email is required"),""===o&&(s=!0,i.password="Password is required"),g&&""===v&&(s=!0,i.repeatPassword="Repeat Password is required"),h(i),s||(g?r(d,o,v,p):r(d,o,p))},children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{children:"Email:"}),(0,n.jsx)("input",{type:"email",value:d,onChange:e=>l(e.target.value)})]}),x.email&&(0,n.jsx)("div",{className:"validation-error",children:x.email}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{children:"Password:"}),(0,n.jsx)("input",{type:"password",value:o,onChange:e=>c(e.target.value)})]}),x.password&&(0,n.jsx)("div",{className:"validation-error",children:x.password}),g&&(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{children:"Repeat Password"}),(0,n.jsx)("input",{type:"password",value:v,onChange:e=>u(e.target.value)}),x.repeatPassword&&(0,n.jsx)("div",{className:"validation-error",children:x.repeatPassword})]}),(0,n.jsx)("div",{className:"".concat(s,"-btn"),children:(0,n.jsx)("button",{type:"submit",children:"register"===s?"Register":"Login"})})]}),t&&(0,n.jsx)("div",{className:"validation-error",children:t})]})})}},4132:(e,s,r)=>{r.d(s,{Z:()=>a});var i=r(184);const a=function(e){return(0,i.jsx)("div",{className:"spinner",children:(0,i.jsxs)("div",{className:"lds-spinner",children:[(0,i.jsx)("div",{}),(0,i.jsx)("div",{}),(0,i.jsx)("div",{}),(0,i.jsx)("div",{}),(0,i.jsx)("div",{}),(0,i.jsx)("div",{}),(0,i.jsx)("div",{}),(0,i.jsx)("div",{}),(0,i.jsx)("div",{}),(0,i.jsx)("div",{}),(0,i.jsx)("div",{}),(0,i.jsx)("div",{})]})})}},878:(e,s,r)=>{r.r(s),r.d(s,{default:()=>c});var i=r(9101),a=r(1647),n=r(2069),t=r(4132),d=r(6598),l=r(5433),o=r(184);const c=(0,i.$j)((e=>({errorMessage:e.auth.errorMessage,isLoading:(0,n.h)(e)})),(e=>(0,d.DE)({registerAction:a.zl},e)))((function(e){return(0,o.jsxs)("div",{className:"register-outer-container",children:[e.isLoading&&(0,o.jsx)(t.Z,{}),(0,o.jsx)("h1",{children:"Register Page"}),(0,o.jsx)(l.Z,{type:"register",onSubmit:e.registerAction,errorMessage:e.errorMessage})]})}))},2069:(e,s,r)=>{function i(e){return!!e.spinner.isLoading}r.d(s,{h:()=>i})}}]);
//# sourceMappingURL=878.b4e4dbcb.chunk.js.map