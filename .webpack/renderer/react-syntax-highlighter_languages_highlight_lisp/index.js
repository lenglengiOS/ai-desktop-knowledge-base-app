(self.webpackChunkai_desktop_knowledge_base_app=self.webpackChunkai_desktop_knowledge_base_app||[]).push([[2234],{11482:e=>{e.exports=function(e){var n="[a-zA-Z_\\-+\\*\\/<=>&#][a-zA-Z0-9_\\-+*\\/<=>&#!]*",a="\\|[^]*?\\|",i="(-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|-)?\\d+)?",s={className:"literal",begin:"\\b(t{1}|nil)\\b"},b={className:"number",variants:[{begin:i,relevance:0},{begin:"#(b|B)[0-1]+(/[0-1]+)?"},{begin:"#(o|O)[0-7]+(/[0-7]+)?"},{begin:"#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?"},{begin:"#(c|C)\\("+i+" +"+i,end:"\\)"}]},l=e.inherit(e.QUOTE_STRING_MODE,{illegal:null}),g=e.COMMENT(";","$",{relevance:0}),t={begin:"\\*",end:"\\*"},c={className:"symbol",begin:"[:&]"+n},r={begin:n,relevance:0},d={begin:a},o={contains:[b,l,t,c,{begin:"\\(",end:"\\)",contains:["self",s,l,b,r]},r],variants:[{begin:"['`]\\(",end:"\\)"},{begin:"\\(quote ",end:"\\)",keywords:{name:"quote"}},{begin:"'"+a}]},_={variants:[{begin:"'"+n},{begin:"#'"+n+"(::"+n+")*"}]},p={begin:"\\(\\s*",end:"\\)"},v={endsWithParent:!0,relevance:0};return p.contains=[{className:"name",variants:[{begin:n,relevance:0},{begin:a}]},v],v.contains=[o,_,p,s,b,l,g,t,c,d,r],{name:"Lisp",illegal:/\S/,contains:[b,e.SHEBANG(),s,l,g,o,_,p,r]}}}}]);
//# sourceMappingURL=index.js.map