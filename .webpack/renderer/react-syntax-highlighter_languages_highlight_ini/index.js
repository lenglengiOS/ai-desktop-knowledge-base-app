(self.webpackChunkai_desktop_knowledge_base_app=self.webpackChunkai_desktop_knowledge_base_app||[]).push([[3384],{21634:e=>{function n(e){return e?"string"==typeof e?e:e.source:null}function a(...e){return e.map((e=>n(e))).join("")}e.exports=function(e){const s={className:"number",relevance:0,variants:[{begin:/([+-]+)?[\d]+_[\d_]+/},{begin:e.NUMBER_RE}]},i=e.COMMENT();i.variants=[{begin:/;/,end:/$/},{begin:/#/,end:/$/}];const t={className:"variable",variants:[{begin:/\$[\w\d"][\w\d_]*/},{begin:/\$\{(.*?)\}/}]},l={className:"literal",begin:/\bon|off|true|false|yes|no\b/},c={className:"string",contains:[e.BACKSLASH_ESCAPE],variants:[{begin:"'''",end:"'''",relevance:10},{begin:'"""',end:'"""',relevance:10},{begin:'"',end:'"'},{begin:"'",end:"'"}]},o={begin:/\[/,end:/\]/,contains:[i,l,t,c,s,"self"],relevance:0},r="("+[/[A-Za-z0-9_-]+/,/"(\\"|[^"])*"/,/'[^']*'/].map((e=>n(e))).join("|")+")";return{name:"TOML, also INI",aliases:["toml"],case_insensitive:!0,illegal:/\S/,contains:[i,{className:"section",begin:/\[+/,end:/\]+/},{begin:a(r,"(\\s*\\.\\s*",r,")*",a("(?=",/\s*=\s*[^#\s]/,")")),className:"attr",starts:{end:/$/,contains:[i,o,l,t,c,s]}}]}}}}]);
//# sourceMappingURL=index.js.map