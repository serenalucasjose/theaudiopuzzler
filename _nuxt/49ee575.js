(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{195:function(e,r,t){"use strict";t(3);var o=t(265),l=t.n(o),n=t(266),c=t.n(n);r.a=function(e,r){e.app;r("createWavesurferInstance",(function(e){return e.plugins=[c.a.create({regionsMinLength:.5,dragSelection:{slop:1}})],l.a.create(e)})),r("destroyWavesurferInstance",(function(e){e.destroy(),document.body.onkeyup=function(e){e.code}})),r("tearupWavesurferControls",(function(e){return new Promise((function(r,t){e.on("ready",(function(){document.body.onkeyup=function(r){"Space"===r.code&&e.playPause()},e.on("region-click",(function(e){var r=e.wavesurfer;if(r.isPlaying())return r.stop(),0;e.playLoop()})),e.on("region-dblclick",(function(e){var r=prompt("Name your clip");e.update({data:{tag:r}})})),r()}))}))}))}},255:function(e,r,t){var content=t(365);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(17).default)("f65db84c",content,!0,{sourceMap:!1})},268:function(e,r,t){"use strict";var o=t(411),l=t(419),n=t(413),c=t(269),d=t(420),h=t(416),f=t(189),w=t(403),k=t(402),x=t(415),m=t(417),v=t(414),y=t(418),_=t(264),C=(t(113),t(29)),z=(t(92),t(112)),j={data:function(){return{fullscreenEnabled:!1,clipped:!1,drawer:!1,fixed:!1,items:[{icon:"mdi-apps",title:"TheAudioPuzzler Inc.",to:"/"}],miniVariant:!1,title:"TheAudioPuzzler"}},beforeCreate:function(){if(!window.AudioContext&&!window.webkitAudioContext)return this.$nuxt.error({message:"Your browser does not meet the minimum requirements for AudioContext"})},created:function(){try{var e=JSON.parse(window.localStorage.getItem("whiteTheme"));this.$vuetify.theme.dark=!e}catch(e){return!1}},mounted:function(){var e=this;z.a.isEnabled&&z.a.on("change",Object(C.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:e.fullscreenEnabled=!e.fullscreenEnabled;case 1:case"end":return r.stop()}}),r)}))))},beforeDestroy:function(){z.a.off("change")},methods:{toggleTheme:function(){this.$vuetify.theme.dark=!this.$vuetify.theme.dark;try{window.localStorage.setItem("whiteTheme",!this.$vuetify.theme.dark)}catch(e){return!1}},toggleFullscreen:function(){return Object(C.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!z.a.isEnabled){e.next=3;break}return e.next=3,z.a.toggle();case 3:case"end":return e.stop()}}),e)})))()}}},P=t(91),component=Object(P.a)(j,(function(){var e=this,r=e._self._c;return r(o.a,{attrs:{dark:""}},[r(m.a,{attrs:{"mini-variant":e.miniVariant,clipped:e.clipped,fixed:"",app:""},model:{value:e.drawer,callback:function(r){e.drawer=r},expression:"drawer"}},[r(w.a,[r(k.a,{staticClass:"pa-2 px-4 d-flex justify-start align-center"},[r("p",{staticClass:"mb-0 mr-4"},[e._v("Light/Dark")]),e._v(" "),r(c.a,{attrs:{icon:""},on:{click:function(r){return e.toggleTheme()}}},[e.$vuetify.theme.dark?r(f.a,{attrs:{color:"yellow darken-3"}},[e._v("mdi-white-balance-sunny")]):r(f.a,{staticClass:"mr-1",attrs:{color:"blue-grey darken-4"}},[e._v("mdi-weather-night")])],1)],1),e._v(" "),r(k.a,{staticClass:"pa-2 px-4 d-flex justify-start align-center"},[r("p",{staticClass:"mb-0 mr-4"},[e._v("Fullscreen")]),e._v(" "),r(y.a,{attrs:{inset:"",value:e.fullscreenEnabled},on:{change:e.toggleFullscreen}})],1)],1)],1),e._v(" "),r(l.a,{attrs:{"clipped-left":e.clipped,fixed:"",app:""}},[r(n.a,{on:{click:function(r){r.stopPropagation(),e.drawer=!e.drawer}}}),e._v(" "),r(_.a,{domProps:{textContent:e._s(e.title)}}),e._v(" "),r(v.a)],1),e._v(" "),r(x.a,[r(d.a,{staticClass:"fill-height"},[r("Nuxt")],1)],1),e._v(" "),r(h.a,{attrs:{absolute:!e.fixed,app:""}},[r("span",[e._v("@theaudiopuzzler")])])],1)}),[],!1,null,null,null);r.a=component.exports},281:function(e,r,t){t(282),e.exports=t(283)},364:function(e,r,t){"use strict";t(255)},365:function(e,r,t){var o=t(16)(!1);o.push([e.i,"h1[data-v-281187aa]{font-size:20px}",""]),e.exports=o},368:function(e,r,t){var content=t(369);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(17).default)("5c670272",content,!0,{sourceMap:!1})},369:function(e,r,t){var o=t(16)(!1);o.push([e.i,".scroll--simple wave::-webkit-scrollbar{width:6px;height:6px}.scroll--simple wave::-webkit-scrollbar-track{border-radius:10px;background:rgba(0,0,0,.1)}.scroll--simple wave::-webkit-scrollbar-thumb{border-radius:10px;background:rgba(0,0,0,.2)}.scroll--simple wave::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.4)}.scroll--simple wave::-webkit-scrollbar-thumb:active{background:rgba(0,0,0,.9)}.scroll--grey::-webkit-scrollbar{width:8px;height:8px}.scroll--grey::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);border-radius:10px;background:rgba(0,0,0,.05)}.scroll--grey::-webkit-scrollbar-thumb{border-radius:10px;background:linear-gradient(to-left,#999,#888);-webkit-box-shadow:inset 0 0 1px rgba(0,0,0,.8)}.scroll--grey::-webkit-scrollbar-thumb:hover{background:linear-gradient(to-left,#888,#777)}.scroll--white::-webkit-scrollbar{width:8px;height:8px}.scroll--white::-webkit-scrollbar-track{border-radius:10px;background:rgba(0,0,0,.1);border:1px solid #ccc}.scroll--white::-webkit-scrollbar-thumb{border-radius:10px;background:linear-gradient(to-left,#fff,#e4e4e4);border:1px solid #aaa}.scroll--white::-webkit-scrollbar-thumb:hover{background:#fff}.scroll--white::-webkit-scrollbar-thumb:active{background:linear-gradient(to-left,#22add4,#1e98ba)}.scroll--square::-webkit-scrollbar{width:10px;height:10px}.scroll--square::-webkit-scrollbar-track{background:rgba(0,0,0,.1);box-shadow:inset 0 0 4px rgba(0,0,0,.3)}.scroll--square::-webkit-scrollbar-thumb{background:linear-gradient(to-left,rgba(0,0,0,.1),rgba(0,0,0,.15));border:1px solid rgba(0,0,0,.2)}.scroll--square::-webkit-scrollbar-thumb:hover{background:linear-gradient(to-left,rgba(0,0,0,.3),rgba(0,0,0,.4))}.scroll--black::-webkit-scrollbar{width:10px;height:10px}.scroll--black::-webkit-scrollbar-track{border-radius:10px;background:#444;box-shadow:0 0 1px 1px #111,inset 0 0 4px rgba(0,0,0,.3)}.scroll--black::-webkit-scrollbar-thumb{border-radius:10px;background:linear-gradient(to-left,#3e3e3e,#111,#000);box-shadow:inset 0 0 1px 1px #646464}.scroll--itunes::-webkit-scrollbar{width:10px;height:10px}.scroll--itunes::-webkit-scrollbar-track{border-radius:10px;background:#eee;box-shadow:0 0 1px 1px #bbb,inset 0 0 7px rgba(0,0,0,.3)}.scroll--itunes::-webkit-scrollbar-thumb{border-radius:10px;background:linear-gradient(to-left,#96a6bf,#63738c);box-shadow:inset 0 0 1px 1px #5c6670}.scroll--itunes::-webkit-scrollbar-thumb:hover{background:linear-gradient(to-left,#8391a6,#536175)}.scroll--sublime::-webkit-scrollbar{width:10px;height:10px}.scroll--sublime::-webkit-scrollbar-track{border-radius:10px;background:linear-gradient(to-left,#212121,#323232);box-shadow:0 0 1px 1px #111}.scroll--sublime::-webkit-scrollbar-thumb{border-radius:10px;background:linear-gradient(to-left,#4a4a4a,#404040);box-shadow:inset 0 0 1px 1px #191919}.scroll--sublime::-webkit-scrollbar-thumb:hover{background:linear-gradient(to-left,#555,#4e4e4e)}",""]),e.exports=o},79:function(e,r,t){"use strict";var o=t(411),l=t(190),n=t(412),c=t(269),d=t(420),h=t(189),f={layout:"empty",props:{error:{type:Object,default:null}}},w=(t(364),t(91)),component=Object(w.a)(f,(function(){var e=this,r=e._self._c;return r(o.a,{attrs:{dark:""}},[r(d.a,{staticClass:"pa-0"},[r(n.a,{staticClass:"py-8",attrs:{"two-line":""},scopedSlots:e._u([{key:"actions",fn:function(){return[r(c.a,{attrs:{text:"",color:"warning accent-4",href:"https://www.google.com/intl/es/chrome/",target:"_blank",exact:"",link:""}},[e._v("\n          Install latest Chrome version\n        ")])]},proxy:!0}])},[r(l.a,{attrs:{slot:"icon",color:"warning accent-4",size:"40"},slot:"icon"},[r(h.a,{attrs:{icon:"mdi-message-alert-outline",color:"white"}},[e._v("\n          mdi-message-alert-outline\n        ")])],1),e._v("\n      "+e._s(e.error.message)+"\n      ")],1)],1)],1)}),[],!1,null,"281187aa",null);r.a=component.exports}},[[281,10,4,11]]]);