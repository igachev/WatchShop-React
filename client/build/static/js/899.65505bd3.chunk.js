"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[899],{4132:(s,i,e)=>{e.d(i,{Z:()=>d});var r=e(184);const d=function(s){return(0,r.jsx)("div",{className:"spinner",children:(0,r.jsxs)("div",{className:"lds-spinner",children:[(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{})]})})}},9899:(s,i,e)=>{e.r(i),e.d(i,{default:()=>a});var r=e(6598),d=e(1647),t=e(9101),n=e(2791),h=e(2069),c=e(4132),l=e(184);const a=(0,t.$j)((s=>({userPurchaseHistory:s.auth.userPurchaseHistory,isLoading:(0,h.h)(s)})),(s=>(0,r.DE)({getUserPurchaseHistoryAction:d.rz},s)))((function(s){return(0,n.useEffect)((()=>{s.getUserPurchaseHistoryAction()}),[]),(0,l.jsxs)("div",{className:"purchase-history-container",children:[s.isLoading&&(0,l.jsx)(c.Z,{}),(0,l.jsx)("h1",{children:"Purchase History"}),(0,l.jsxs)("div",{children:[!s.userPurchaseHistory&&(0,l.jsx)("h3",{children:"You haven't bought anything yet"}),(0,l.jsxs)("table",{children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:"order \u2116"}),(0,l.jsx)("th",{children:"Brand"}),(0,l.jsx)("th",{children:"Model"}),(0,l.jsx)("th",{children:"quantity"}),(0,l.jsx)("th",{children:"date"}),(0,l.jsx)("th",{children:"totalSum"})]})}),(0,l.jsx)("tbody",{children:s.userPurchaseHistory.length>0?s.userPurchaseHistory.map((s=>(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{children:s._id}),(0,l.jsx)("td",{children:s.watchId.brand}),(0,l.jsx)("td",{children:s.watchId.model}),(0,l.jsx)("td",{children:s.quantity}),(0,l.jsx)("td",{children:s.date.toString().split("T")[0]}),(0,l.jsx)("td",{children:s.totalSum})]},s._id))):null})]})]})]})}))},2069:(s,i,e)=>{function r(s){return!!s.spinner.isLoading}e.d(i,{h:()=>r})}}]);
//# sourceMappingURL=899.65505bd3.chunk.js.map