"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[925],{5433:(e,s,i)=>{i.d(s,{Z:()=>t});var r=i(2791),a=i(7689),n=i(184);const t=function(e){let{type:s,onSubmit:i,errorMessage:t}=e;const[d,l]=(0,r.useState)(""),[o,c]=(0,r.useState)(""),[v,u]=(0,r.useState)("");let j={email:"",password:"",repeatPassword:""};const[x,h]=(0,r.useState)(j),p=(0,a.s0)(),g="register"===s;return(0,n.jsx)("div",{className:"".concat(s,"-container"),children:(0,n.jsxs)("div",{className:"".concat(s,"-form-container"),children:[(0,n.jsxs)("form",{onSubmit:function(e){e.preventDefault();let s=!1,r={...j};""===d&&(s=!0,r.email="Email is required"),""===o&&(s=!0,r.password="Password is required"),g&&""===v&&(s=!0,r.repeatPassword="Repeat Password is required"),h(r),s||(g?i(d,o,v,p):i(d,o,p))},children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{children:"Email:"}),(0,n.jsx)("input",{type:"email",value:d,onChange:e=>l(e.target.value)})]}),x.email&&(0,n.jsx)("div",{className:"validation-error",children:x.email}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{children:"Password:"}),(0,n.jsx)("input",{type:"password",value:o,onChange:e=>c(e.target.value)})]}),x.password&&(0,n.jsx)("div",{className:"validation-error",children:x.password}),g&&(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{children:"Repeat Password"}),(0,n.jsx)("input",{type:"password",value:v,onChange:e=>u(e.target.value)}),x.repeatPassword&&(0,n.jsx)("div",{className:"validation-error",children:x.repeatPassword})]}),(0,n.jsx)("div",{className:"".concat(s,"-btn"),children:(0,n.jsx)("button",{type:"submit",children:"register"===s?"Register":"Login"})})]}),t&&(0,n.jsx)("div",{className:"validation-error",children:t})]})})}},4132:(e,s,i)=>{i.d(s,{Z:()=>a});var r=i(184);const a=function(e){return(0,r.jsx)("div",{className:"spinner",children:(0,r.jsxs)("div",{className:"lds-spinner",children:[(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{})]})})}},8925:(e,s,i)=>{i.r(s),i.d(s,{default:()=>c});var r=i(9101),a=i(1647),n=i(2069),t=i(4132),d=i(6598),l=i(5433),o=i(184);const c=(0,r.$j)((e=>({errorMessage:e.auth.errorMessage,isLoading:(0,n.h)(e)})),(e=>(0,d.DE)({loginAction:a.y},e)))((function(e){return(0,o.jsxs)("div",{className:"login-outer-container",children:[e.isLoading&&(0,o.jsx)(t.Z,{}),(0,o.jsx)("h1",{children:"Login Page"}),(0,o.jsx)(l.Z,{type:"login",onSubmit:e.loginAction,errorMessage:e.errorMessage})]})}))},2069:(e,s,i)=>{function r(e){return!!e.spinner.isLoading}i.d(s,{h:()=>r})}}]);
//# sourceMappingURL=925.b5dd3c99.chunk.js.map