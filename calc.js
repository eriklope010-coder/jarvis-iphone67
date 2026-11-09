"use strict";
// Exact calculator used by the "calcular" tool. Safe recursive-descent parser: no eval().
function calcEval(src){
  let s=String(src).toLowerCase(); if(!/[a-z]\s*\(/.test(s)) s=s.replace(/(\d),(\d)/g,"$1.$2"); s=s.replace(/×|·/g,"*").replace(/÷|:/g,"/").replace(/\s+/g,"")
    .replace(/(\d+(?:\.\d+)?)%de/g,"($1/100)*").replace(/π/g,"pi").replace(/√/g,"sqrt");
  let i=0;
  const F={sqrt:Math.sqrt,cbrt:Math.cbrt,abs:Math.abs,round:Math.round,floor:Math.floor,ceil:Math.ceil,ln:Math.log,log:Math.log10,log10:Math.log10,log2:Math.log2,
    sin:x=>Math.sin(x),cos:x=>Math.cos(x),tan:x=>Math.tan(x),asin:Math.asin,acos:Math.acos,atan:Math.atan,exp:Math.exp,min:Math.min,max:Math.max,raiz:Math.sqrt};
  const C={pi:Math.PI,e:Math.E};
  const peek=()=>s[i], eat=c=>{ if(s[i]===c){i++;return true;} return false; };
  const fact=n=>{ if(n<0||!Number.isInteger(n)||n>170) throw Error("factorial no válido"); let r=1; for(let k=2;k<=n;k++) r*=k; return r; };
  function expr(){ let v=term(); for(;;){ if(eat("+")) v+=term(); else if(eat("-")) v-=term(); else return v; } }
  function term(){ let v=unary(); for(;;){ if(s[i]==="*"&&s[i+1]==="*") return v; if(eat("*")) v*=unary(); else if(eat("/")){ const d=unary(); if(d===0) throw Error("división por cero"); v/=d; } else if(s[i]==="%"&&!/[\d(a-z]/.test(s[i+1]||"")){ i++; v/=100; } else if(eat("%")) v%=unary(); else if(/[\d(a-z]/.test(peek()||"")&&!/[a-z]/.test(s[i-1]||"x")) v*=power(); else return v; } }
  function unary(){ if(eat("-")) return -unary(); if(eat("+")) return unary(); return power(); }
  function power(){ const b=postfix(); if(eat("^")) return Math.pow(b,unary()); if(s[i]==="*"&&s[i+1]==="*"){ i+=2; return Math.pow(b,unary()); } return b; }
  function postfix(){ let v=atom(); while(eat("!")) v=fact(v); return v; }
  function atom(){
    if(eat("(")){ const v=expr(); if(!eat(")")) throw Error("falta un paréntesis"); return v; }
    const m=s.slice(i).match(/^\d+(\.\d+)?(e[+-]?\d+)?|^\.\d+/); if(m){ i+=m[0].length; return parseFloat(m[0]); }
    const w=s.slice(i).match(/^[a-z]+[0-9]*/); if(w){ const n=w[0]; i+=n.length;
      if(n in C) return C[n];
      if(n in F){ if(!eat("(")) throw Error("falta '(' tras "+n); const args=[expr()]; while(eat(",")||eat(";")) args.push(expr()); if(!eat(")")) throw Error("falta ')'"); return F[n](...args); }
      throw Error("no entiendo '"+n+"'"); }
    throw Error("expresión incompleta");
  }
  const v=expr(); if(i<s.length) throw Error("sobra '"+s.slice(i)+"'"); if(!isFinite(v)) throw Error("resultado no finito"); return v;
}
module.exports = { calcEval };
