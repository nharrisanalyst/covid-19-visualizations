// https://d3js.org/d3-array/ v2.4.0 Copyright 2019 Mike Bostock
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t=t||self).d3=t.d3||{})}(this,function(t){"use strict";function n(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function r(t){var r;return 1===t.length&&(r=t,t=function(t,e){return n(r(t),e)}),{left:function(n,r,e,o){for(null==e&&(e=0),null==o&&(o=n.length);e<o;){var f=e+o>>>1;t(n[f],r)<0?e=f+1:o=f}return e},right:function(n,r,e,o){for(null==e&&(e=0),null==o&&(o=n.length);e<o;){var f=e+o>>>1;t(n[f],r)>0?o=f:e=f+1}return e}}}var e=r(n),o=e.right,f=e.left;function u(t,n){let r=0;if(void 0===n)for(let n of t)null!=n&&(n=+n)>=n&&++r;else{let e=-1;for(let o of t)null!=(o=n(o,++e,t))&&(o=+o)>=o&&++r}return r}function i(t){return 0|t.length}function l(t){return!(t>0)}function a(t){return"object"!=typeof t||"length"in t?t:Array.from(t)}function c(t,n){let r,e=0,o=0,f=0;if(void 0===n)for(let n of t)null!=n&&(n=+n)>=n&&(f+=(r=n-o)*(n-(o+=r/++e)));else{let u=-1;for(let i of t)null!=(i=n(i,++u,t))&&(i=+i)>=i&&(f+=(r=i-o)*(i-(o+=r/++e)))}if(e>1)return f/(e-1)}function s(t,n){const r=c(t,n);return r?Math.sqrt(r):r}function h(t,n){let r,e;if(void 0===n)for(const n of t)null!=n&&(void 0===r?n>=n&&(r=e=n):(r>n&&(r=n),e<n&&(e=n)));else{let o=-1;for(let f of t)null!=(f=n(f,++o,t))&&(void 0===r?f>=f&&(r=e=f):(r>f&&(r=f),e<f&&(e=f)))}return[r,e]}function d(t){return t}function v(t,n,r,e){return function t(o,f){if(f>=e.length)return r(o);const u=new Map,i=e[f++];let l=-1;for(const t of o){const n=i(t,++l,o),r=u.get(n);r?r.push(t):u.set(n,[t])}for(const[n,r]of u)u.set(n,t(r,f));return n(u)}(t,0)}var M=Array.prototype.slice;function p(t){return function(){return t}}function g(t,n,r){t=+t,n=+n,r=(o=arguments.length)<2?(n=t,t=0,1):o<3?1:+r;for(var e=-1,o=0|Math.max(0,Math.ceil((n-t)/r)),f=new Array(o);++e<o;)f[e]=t+e*r;return f}var y=Math.sqrt(50),m=Math.sqrt(10),A=Math.sqrt(2);function x(t,n,r){var e=(n-t)/Math.max(0,r),o=Math.floor(Math.log(e)/Math.LN10),f=e/Math.pow(10,o);return o>=0?(f>=y?10:f>=m?5:f>=A?2:1)*Math.pow(10,o):-Math.pow(10,-o)/(f>=y?10:f>=m?5:f>=A?2:1)}function w(t,n,r){var e=Math.abs(n-t)/Math.max(0,r),o=Math.pow(10,Math.floor(Math.log(e)/Math.LN10)),f=e/o;return f>=y?o*=10:f>=m?o*=5:f>=A&&(o*=2),n<t?-o:o}function b(t){return Math.ceil(Math.log(u(t))/Math.LN2)+1}function N(){var t=d,n=h,r=b;function e(e){Array.isArray(e)||(e=Array.from(e));var f,u,i=e.length,l=new Array(i);for(f=0;f<i;++f)l[f]=t(e[f],f,e);var a=n(l),c=a[0],s=a[1],h=r(l,c,s);Array.isArray(h)||(h=w(c,s,h),h=g(Math.ceil(c/h)*h,s,h));for(var d=h.length;h[0]<=c;)h.shift(),--d;for(;h[d-1]>s;)h.pop(),--d;var v,M=new Array(d+1);for(f=0;f<=d;++f)(v=M[f]=[]).x0=f>0?h[f-1]:c,v.x1=f<d?h[f]:s;for(f=0;f<i;++f)c<=(u=l[f])&&u<=s&&M[o(h,u,0,d)].push(e[f]);return M}return e.value=function(n){return arguments.length?(t="function"==typeof n?n:p(n),e):t},e.domain=function(t){return arguments.length?(n="function"==typeof t?t:p([t[0],t[1]]),e):n},e.thresholds=function(t){return arguments.length?(r="function"==typeof t?t:Array.isArray(t)?p(M.call(t)):p(t),e):r},e}function q(t,n){let r;if(void 0===n)for(const n of t)null!=n&&(r<n||void 0===r&&n>=n)&&(r=n);else{let e=-1;for(let o of t)null!=(o=n(o,++e,t))&&(r<o||void 0===r&&o>=o)&&(r=o)}return r}function I(t,n){let r;if(void 0===n)for(const n of t)null!=n&&(r>n||void 0===r&&n>=n)&&(r=n);else{let e=-1;for(let o of t)null!=(o=n(o,++e,t))&&(r>o||void 0===r&&o>=o)&&(r=o)}return r}function k(t,r,e=0,o=t.length-1,f=n){for(;o>e;){if(o-e>600){const n=o-e+1,u=r-e+1,i=Math.log(n),l=.5*Math.exp(2*i/3),a=.5*Math.sqrt(i*l*(n-l)/n)*(u-n/2<0?-1:1);k(t,r,Math.max(e,Math.floor(r-u*l/n+a)),Math.min(o,Math.floor(r+(n-u)*l/n+a)),f)}const n=t[r];let u=e,i=o;for(F(t,e,r),f(t[o],n)>0&&F(t,e,o);u<i;){for(F(t,u,i),++u,--i;f(t[u],n)<0;)++u;for(;f(t[i],n)>0;)--i}0===f(t[e],n)?F(t,e,i):F(t,++i,o),i<=r&&(e=i+1),r<=i&&(o=i-1)}return t}function F(t,n,r){const e=t[n];t[n]=t[r],t[r]=e}function L(t,n,r){if(e=(t=Float64Array.from(function*(t,n){if(void 0===n)for(let n of t)null!=n&&(n=+n)>=n&&(yield n);else{let r=-1;for(let e of t)null!=(e=n(e,++r,t))&&(e=+e)>=e&&(yield e)}}(t,r))).length){if((n=+n)<=0||e<2)return I(t);if(n>=1)return q(t);var e,o=(e-1)*n,f=Math.floor(o),u=q(k(t,f).subarray(0,f+1));return u+(I(t.subarray(f+1))-u)*(o-f)}}function S(t,n){let r,e=-1,o=-1;if(void 0===n)for(const n of t)++o,null!=n&&(r<n||void 0===r&&n>=n)&&(r=n,e=o);else for(let f of t)null!=(f=n(f,++o,t))&&(r<f||void 0===r&&f>=f)&&(r=f,e=o);return e}function j(t,n){let r,e=-1,o=-1;if(void 0===n)for(const n of t)++o,null!=n&&(r>n||void 0===r&&n>=n)&&(r=n,e=o);else for(let f of t)null!=(f=n(f,++o,t))&&(r>f||void 0===r&&f>=f)&&(r=f,e=o);return e}function _(t,r=n){if(1===r.length)return j(t,r);let e,o=-1,f=-1;for(const n of t)++f,(o<0?0===r(n,n):r(n,e)<0)&&(e=n,o=f);return o}function z(t){if(!(o=t.length))return[];for(var n=-1,r=I(t,D),e=new Array(r);++n<r;)for(var o,f=-1,u=e[n]=new Array(o);++f<o;)u[f]=t[f][n];return e}function D(t){return t.length}t.ascending=n,t.bin=N,t.bisect=o,t.bisectLeft=f,t.bisectRight=o,t.bisector=r,t.count=u,t.cross=function(...t){const n="function"==typeof t[t.length-1]&&function(t){return n=>t(...n)}(t.pop()),r=(t=t.map(a)).map(i),e=t.length-1,o=new Array(e+1).fill(0),f=[];if(e<0||r.some(l))return f;for(;;){f.push(o.map((n,r)=>t[r][n]));let u=e;for(;++o[u]===r[u];){if(0===u)return n?f.map(n):f;o[u--]=0}}},t.cumsum=function(t,n){var r=0,e=0;return Float64Array.from(t,void 0===n?t=>r+=+t||0:o=>r+=+n(o,e++,t)||0)},t.descending=function(t,n){return n<t?-1:n>t?1:n>=t?0:NaN},t.deviation=s,t.extent=h,t.greatest=function(t,r=n){let e,o=!1;if(1===r.length){let f;for(const u of t){const t=r(u);(o?n(t,f)>0:0===n(t,t))&&(e=u,f=t,o=!0)}}else for(const n of t)(o?r(n,e)>0:0===r(n,n))&&(e=n,o=!0);return e},t.greatestIndex=function(t,r=n){if(1===r.length)return S(t,r);let e,o=-1,f=-1;for(const n of t)++f,(o<0?0===r(n,n):r(n,e)>0)&&(e=n,o=f);return o},t.group=function(t,...n){return v(t,d,d,n)},t.groups=function(t,...n){return v(t,Array.from,d,n)},t.histogram=N,t.least=function(t,r=n){let e,o=!1;if(1===r.length){let f;for(const u of t){const t=r(u);(o?n(t,f)<0:0===n(t,t))&&(e=u,f=t,o=!0)}}else for(const n of t)(o?r(n,e)<0:0===r(n,n))&&(e=n,o=!0);return e},t.leastIndex=_,t.max=q,t.maxIndex=S,t.mean=function(t,n){let r=0,e=0;if(void 0===n)for(let n of t)null!=n&&(n=+n)>=n&&(++r,e+=n);else{let o=-1;for(let f of t)null!=(f=n(f,++o,t))&&(f=+f)>=f&&(++r,e+=f)}if(r)return e/r},t.median=function(t,n){return L(t,.5,n)},t.merge=function(t){return Array.from(function*(t){for(const n of t)yield*n}(t))},t.min=I,t.minIndex=j,t.pairs=function(t,n=function(t,n){return[t,n]}){const r=[];let e,o=!1;for(const f of t)o&&r.push(n(e,f)),e=f,o=!0;return r},t.permute=function(t,n){return Array.from(n,n=>t[n])},t.quantile=L,t.quantileSorted=function(t,n,r=function(t){return null===t?NaN:+t}){if(e=t.length){if((n=+n)<=0||e<2)return+r(t[0],0,t);if(n>=1)return+r(t[e-1],e-1,t);var e,o=(e-1)*n,f=Math.floor(o),u=+r(t[f],f,t);return u+(+r(t[f+1],f+1,t)-u)*(o-f)}},t.quickselect=k,t.range=g,t.rollup=function(t,n,...r){return v(t,d,n,r)},t.rollups=function(t,n,...r){return v(t,Array.from,n,r)},t.scan=function(t,n){const r=_(t,n);return r<0?void 0:r},t.shuffle=function(t,n=0,r=t.length){for(var e,o,f=r-(n=+n);f;)o=Math.random()*f--|0,e=t[f+n],t[f+n]=t[o+n],t[o+n]=e;return t},t.sum=function(t,n){let r=0;if(void 0===n)for(let n of t)(n=+n)&&(r+=n);else{let e=-1;for(let o of t)(o=+n(o,++e,t))&&(r+=o)}return r},t.thresholdFreedmanDiaconis=function(t,n,r){return Math.ceil((r-n)/(2*(L(t,.75)-L(t,.25))*Math.pow(u(t),-1/3)))},t.thresholdScott=function(t,n,r){return Math.ceil((r-n)/(3.5*s(t)*Math.pow(u(t),-1/3)))},t.thresholdSturges=b,t.tickIncrement=x,t.tickStep=w,t.ticks=function(t,n,r){var e,o,f,u,i=-1;if(r=+r,(t=+t)==(n=+n)&&r>0)return[t];if((e=n<t)&&(o=t,t=n,n=o),0===(u=x(t,n,r))||!isFinite(u))return[];if(u>0)for(t=Math.ceil(t/u),n=Math.floor(n/u),f=new Array(o=Math.ceil(n-t+1));++i<o;)f[i]=(t+i)*u;else for(t=Math.floor(t*u),n=Math.ceil(n*u),f=new Array(o=Math.ceil(t-n+1));++i<o;)f[i]=(t-i)/u;return e&&f.reverse(),f},t.transpose=z,t.variance=c,t.zip=function(){return z(arguments)},Object.defineProperty(t,"__esModule",{value:!0})});
