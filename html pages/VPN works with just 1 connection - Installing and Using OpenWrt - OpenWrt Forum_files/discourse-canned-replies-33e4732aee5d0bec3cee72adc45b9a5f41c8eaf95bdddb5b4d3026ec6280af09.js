define("discourse/plugins/discourse-canned-replies/components/canned-replies-form",["exports"],(function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=Ember.Component.extend({});e.default=n})),define("discourse/plugins/discourse-canned-replies/components/canned-reply",["exports","discourse/lib/show-modal","discourse/plugins/discourse-canned-replies/lib/apply-reply"],(function(e,n,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var l=Ember.Component.extend({canEdit:!1,init:function(){this._super.apply(this,arguments);var e=this.get("currentUser"),n=this.get("siteSettings.canned_replies_everyone_enabled")&&this.get("siteSettings.canned_replies_everyone_can_edit"),t=this.get("siteSettings.canned_replies_enabled")&&e&&e.can_edit_canned_replies,l=t||n;this.set("canEdit",l)},actions:{apply:function(){var e=Discourse.__container__.lookup("controller:composer");(0,t.default)(this.get("reply.id"),this.get("reply.title"),this.get("reply.content"),e.model),this.appEvents.trigger("canned-replies:hide")},editReply:function(){var e=Discourse.__container__.lookup("controller:composer");e.send("closeModal"),(0,n.default)("edit-reply").setProperties({composerModel:e.composerModel,replyId:this.get("reply.id"),replyTitle:this.get("reply.title"),replyContent:this.get("reply.content")})}}});e.default=l})),define("discourse/plugins/discourse-canned-replies/connectors/editor-preview/canned-replies",["exports","discourse/lib/show-modal","discourse/lib/ajax","discourse/lib/ajax-error","discourse-common/lib/get-owner"],(function(e,n,t,l,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={setupComponent:function(e,n){var t=this.get("currentUser"),l=this.get("siteSettings.canned_replies_everyone_enabled")&&this.get("siteSettings.canned_replies_everyone_can_edit"),i=this.get("siteSettings.canned_replies_enabled")&&t&&t.can_edit_canned_replies,s=i||l;this.set("canEdit",s),n.setProperties({cannedVisible:!1,loadingReplies:!1,replies:[],filteredReplies:[]}),n.appEvents.has("canned-replies:show")||(this.showCanned=function(){return n.send("show")},n.appEvents.on("canned-replies:show",this,this.showCanned)),n.appEvents.has("canned-replies:hide")||(this.hideCanned=function(){return n.send("hide")},n.appEvents.on("canned-replies:hide",this,this.hideCanned)),n.addObserver("listFilter",(function(){var e=n.listFilter.toLowerCase(),t=n.replies.map((function(n){return n.score=0,-1!==n.title.toLowerCase().indexOf(e)?n.score+=2:-1!==n.content.toLowerCase().indexOf(e)&&(n.score+=1),n})).filter((function(e){return 0!==e.score})).sort((function(e,n){return e.score!==n.score?e.score>n.score?-1:1:e.title!==n.title?e.title<n.title?-1:1:0}));n.set("filteredReplies",t)}))},teardownComponent:function(e){e.appEvents.has("canned-replies:show")&&this.showCanned&&(e.appEvents.off("canned-replies:show",this,this.showCanned),e.appEvents.off("canned-replies:hide",this,this.hideCanned))},actions:{show:function(){var e=this;$("#reply-control .d-editor-preview-wrapper > .d-editor-preview").hide(),this.setProperties({cannedVisible:!0,loadingReplies:!0}),(0,t.ajax)("/canned_replies").then((function(n){e.setProperties({replies:n.replies,filteredReplies:n.replies})})).catch(l.popupAjaxError).finally((function(){e.set("loadingReplies",!1),e.canEdit&&Ember.run.schedule("afterRender",(function(){return document.querySelector(".canned-replies-filter").focus()}))}))},hide:function(){$(".d-editor-preview-wrapper > .d-editor-preview").show(),this.set("cannedVisible",!1)},newReply:function(){var e=(0,i.getOwner)(this).lookup("controller:composer");e.send("closeModal"),(0,n.default)("new-reply").set("newContent",e.model.reply)}}};e.default=s})),define("discourse/plugins/discourse-canned-replies/controllers/canned-replies",["exports","discourse/mixins/modal-functionality","discourse/lib/show-modal","discourse/lib/ajax","discourse-common/utils/decorators","discourse/lib/ajax-error","discourse/plugins/discourse-canned-replies/lib/apply-reply"],(function(e,n,t,l,i,s,a){"use strict";var r,o;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var c,d,p,u,f,m,b=Ember.Controller.extend(n.default,(r=(0,i.observes)("selectedReplyId"),o={selectedReply:null,selectedReplyId:"",loadingReplies:!0,canEdit:!1,init:function(){this._super.apply(this,arguments);var e=this.get("currentUser"),n=this.siteSettings.canned_replies_everyone_enabled&&this.siteSettings.canned_replies_everyone_can_edit,t=this.siteSettings.canned_replies_enabled&&e&&e.can_edit_canned_replies,l=t||n;this.set("canEdit",l),this.replies=[]},_updateSelection:function(){this.selectionChange()},onShow:function(){var e=this;(0,l.ajax)("/canned_replies").then((function(n){e.set("replies",n.replies),e.selectionChange()})).catch(s.popupAjaxError).finally((function(){return e.set("loadingReplies",!1)}))},selectionChange:function(){var e=this.get("selectedReplyId"),n="";this.get("replies").forEach((function(t){t.id!==e||(n=t)})),this.set("selectedReply",n)},actions:{apply:function(){(0,a.default)(this.get("selectedReplyId"),this.selectedReply.title,this.selectedReply.content,this.composerModel),this.send("closeModal")},newReply:function(){this.send("closeModal"),(0,t.default)("new-reply").set("newContent",this.composerModel.reply)},editReply:function(){this.send("closeModal"),(0,t.default)("edit-reply").setProperties({replyId:this.selectedReplyId,replyTitle:this.get("selectedReply.title"),replyContent:this.get("selectedReply.content")})}}},c=o,d="_updateSelection",p=[r],u=Object.getOwnPropertyDescriptor(o,"_updateSelection"),f=o,m={},Object.keys(u).forEach((function(e){m[e]=u[e]})),m.enumerable=!!m.enumerable,m.configurable=!!m.configurable,("value"in m||m.initializer)&&(m.writable=!0),m=p.slice().reverse().reduce((function(e,n){return n(c,d,e)||e}),m),f&&void 0!==m.initializer&&(m.value=m.initializer?m.initializer.call(f):void 0,m.initializer=void 0),void 0===m.initializer&&(Object.defineProperty(c,d,m),m=null),o));e.default=b})),define("discourse/plugins/discourse-canned-replies/controllers/edit-reply",["exports","discourse/mixins/modal-functionality","discourse/lib/show-modal","discourse/lib/ajax","discourse-common/utils/decorators","discourse/lib/ajax-error","I18n"],(function(e,n,t,l,i,s,a){"use strict";var r,o,c;function d(e,n,t,l,i){var s={};return Object.keys(l).forEach((function(e){s[e]=l[e]})),s.enumerable=!!s.enumerable,s.configurable=!!s.configurable,("value"in s||s.initializer)&&(s.writable=!0),s=t.slice().reverse().reduce((function(t,l){return l(e,n,t)||t}),s),i&&void 0!==s.initializer&&(s.value=s.initializer?s.initializer.call(i):void 0,s.initializer=void 0),void 0===s.initializer&&(Object.defineProperty(e,n,s),s=null),s}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var p=Ember.Controller.extend(n.default,(r=(0,i.default)("saving"),o=(0,i.default)("replyTitle","replyContent","saving"),d(c={replyTitle:"",replyContent:"",replyId:"",saving:null,onShow:function(){this.set("saving",null)},savingLabel:function(e){return null===e?"save":e?"saving":"saved"},disableSaveButton:function(e,n,t){return t||""===e||""===n},actions:{save:function(){var e=this;this.set("saving",!0),(0,l.ajax)("/canned_replies/".concat(this.replyId),{type:"PATCH",data:{title:this.replyTitle,content:this.replyContent}}).catch(s.popupAjaxError).finally((function(){e.set("saving",!1),e.appEvents.trigger("canned-replies:show")}))},remove:function(){var e=this;bootbox.confirm(a.default.t("canned_replies.edit.remove_confirm"),(function(n){n&&(0,l.ajax)("/canned_replies/".concat(e.replyId),{type:"DELETE"}).then((function(){e.send("closeModal"),e.site.mobileView?(0,t.default)("canned-replies"):e.appEvents.trigger("canned-replies:show")})).catch(s.popupAjaxError)}))},cancel:function(){this.send("closeModal"),this.site.mobileView?(0,t.default)("canned-replies"):this.appEvents.trigger("canned-replies:show")}}},"savingLabel",[r],Object.getOwnPropertyDescriptor(c,"savingLabel"),c),d(c,"disableSaveButton",[o],Object.getOwnPropertyDescriptor(c,"disableSaveButton"),c),c));e.default=p})),define("discourse/plugins/discourse-canned-replies/controllers/new-reply",["exports","discourse/mixins/modal-functionality","discourse/lib/show-modal","discourse/lib/ajax","discourse-common/utils/decorators","discourse/lib/ajax-error"],(function(e,n,t,l,i,s){"use strict";var a,r;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o,c,d,p,u,f,m=Ember.Controller.extend(n.default,(a=(0,i.default)("newTitle","newContent"),o=r={newTitle:"",newContent:"",onShow:function(){this.setProperties({newTitle:"",newContent:""})},disableSaveButton:function(e,n){return""===e||""===n},actions:{save:function(){var e=this;(0,l.ajax)("/canned_replies",{type:"POST",data:{title:this.newTitle,content:this.newContent}}).then((function(){e.send("closeModal"),e.site.mobileView?(0,t.default)("canned-replies"):e.appEvents.trigger("canned-replies:show")})).catch(s.popupAjaxError)},cancel:function(){this.send("closeModal"),this.site.mobileView?(0,t.default)("canned-replies"):this.appEvents.trigger("canned-replies:show")}}},c="disableSaveButton",d=[a],p=Object.getOwnPropertyDescriptor(r,"disableSaveButton"),u=r,f={},Object.keys(p).forEach((function(e){f[e]=p[e]})),f.enumerable=!!f.enumerable,f.configurable=!!f.configurable,("value"in f||f.initializer)&&(f.writable=!0),f=d.slice().reverse().reduce((function(e,n){return n(o,c,e)||e}),f),u&&void 0!==f.initializer&&(f.value=f.initializer?f.initializer.call(u):void 0,f.initializer=void 0),void 0===f.initializer&&(Object.defineProperty(o,c,f),f=null),r));e.default=m})),Ember.TEMPLATES["javascripts/components/canned-replies-form"]=Ember.HTMLBars.template({id:null,block:'{"symbols":[],"statements":[[7,"form",true],[8],[0,"\\n  "],[7,"div",true],[10,"class","canned-replies-title-input-wrapper"],[8],[0,"\\n    "],[7,"label",true],[8],[7,"strong",true],[8],[1,[28,"i18n",["canned_replies.title.name"],null],false],[9],[9],[0,"\\n    "],[1,[28,"input",null,[["class","value"],["canned-replies-form-title-input",[24,["title"]]]]],false],[0,"\\n  "],[9],[0,"\\n\\n  "],[7,"div",true],[10,"class","canned-replies-form-content-wrapper"],[8],[0,"\\n    "],[7,"label",true],[8],[7,"strong",true],[8],[1,[28,"i18n",["canned_replies.content.name"],null],false],[9],[9],[0,"\\n    "],[1,[28,"d-editor",null,[["class","value"],["canned-replies-form-content-input",[24,["content"]]]]],false],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"javascripts/discourse/templates/components/canned-replies-form"}}),Ember.TEMPLATES["javascripts/components/canned-reply"]=Ember.HTMLBars.template({id:null,block:'{"symbols":[],"statements":[[7,"details",true],[10,"class","canned-reply"],[11,"id",[29,["canned-reply-",[24,["reply","id"]]]]],[8],[0,"\\n  "],[7,"summary",true],[10,"class","canned-reply-title"],[8],[0,"\\n    "],[7,"div",true],[10,"class","canned-reply-title-text"],[8],[1,[24,["reply","title"]],false],[9],[0,"\\n\\n    "],[7,"div",true],[10,"class","actions"],[8],[0,"\\n      "],[1,[28,"d-button",null,[["class","action","icon"],["canned-replies-apply",[28,"action",[[23,0,[]],"apply"],null],"far-clipboard"]]],false],[0,"\\n\\n"],[4,"if",[[24,["canEdit"]]],null,{"statements":[[0,"        "],[1,[28,"d-button",null,[["class","action","icon"],["canned-replies-edit",[28,"action",[[23,0,[]],"editReply"],null],"pencil-alt"]]],false],[0,"\\n"]],"parameters":[]},null],[0,"    "],[9],[0,"\\n  "],[9],[0,"\\n\\n  "],[7,"div",true],[10,"class","canned-replies-content"],[8],[0,"\\n    "],[1,[28,"cook-text",[[24,["reply","content"]]],null],false],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"javascripts/discourse/templates/components/canned-reply"}}),Ember.TEMPLATES["javascripts/connectors/editor-preview/canned-replies"]=Ember.HTMLBars.template({id:null,block:'{"symbols":["r"],"statements":[[4,"if",[[24,["cannedVisible"]]],null,{"statements":[[0,"  "],[7,"div",true],[10,"class","d-editor-preview"],[8],[0,"\\n"],[4,"conditional-loading-spinner",null,[["condition"],[[24,["loadingReplies"]]]],{"statements":[[4,"if",[[24,["canEdit"]]],null,{"statements":[[0,"        "],[7,"div",true],[10,"class","canned-replies-edit-bar"],[8],[0,"\\n          "],[1,[28,"d-button",null,[["class","action","icon","label"],["canned-replies-new",[28,"action",[[23,0,[]],"newReply"],null],"plus","canned_replies.insert.new_button"]]],false],[0,"\\n          "],[1,[28,"text-field",null,[["class","value","placeholder"],["canned-replies-filter",[24,["listFilter"]],[28,"i18n",["canned_replies.filter_hint"],null]]]],false],[0,"\\n\\n          "],[1,[28,"d-button",null,[["class","action","icon"],["modal-close close btn-flat",[28,"action",[[23,0,[]],"hide"],null],"times"]]],false],[0,"\\n        "],[9],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"each",[[24,["filteredReplies"]]],null,{"statements":[[0,"        "],[1,[28,"canned-reply",null,[["reply"],[[23,1,[]]]]],false],[0,"\\n"]],"parameters":[1]},null]],"parameters":[]},null],[0,"  "],[9],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}',meta:{moduleName:"javascripts/discourse/templates/connectors/editor-preview/canned-replies"}}),Ember.TEMPLATES["javascripts/modal/canned-replies"]=Ember.HTMLBars.template({id:null,block:'{"symbols":[],"statements":[[4,"d-modal-body",null,[["title","class","style"],["canned_replies.insert.modal_title","canned-replies-modal","overflow: visible"]],{"statements":[[4,"conditional-loading-spinner",null,[["condition"],[[24,["loadingReplies"]]]],{"statements":[[0,"    "],[7,"div",true],[10,"class","details"],[8],[0,"\\n      "],[7,"div",true],[10,"class","reply-selector"],[8],[0,"\\n        "],[7,"div",true],[10,"class","selector"],[8],[0,"\\n          "],[1,[28,"combo-box",null,[["id","valueAttribute","value","nameProperty","content","none"],["canned-replies-combobox","id",[24,["selectedReplyId"]],"title",[24,["replies"]],"canned_replies.insert.choose"]]],false],[0,"\\n        "],[9],[0,"\\n      "],[9],[0,"\\n\\n"],[4,"if",[[24,["selectedReply"]]],null,{"statements":[[0,"        "],[7,"div",true],[10,"class","content"],[8],[0,"\\n          "],[7,"div",true],[8],[1,[28,"cook-text",[[24,["selectedReply","content"]]],null],false],[9],[0,"\\n        "],[9],[0,"\\n"]],"parameters":[]},null],[0,"    "],[9],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"\\n"],[7,"div",true],[10,"class","modal-footer"],[8],[0,"\\n"],[4,"if",[[24,["canEdit"]]],null,{"statements":[[0,"    "],[1,[28,"d-button",null,[["class","action","icon","label"],["pull-left canned-replies-new",[28,"action",[[23,0,[]],"newReply"],null],"plus","canned_replies.insert.new_button"]]],false],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[24,["selectedReply"]]],null,{"statements":[[4,"if",[[24,["canEdit"]]],null,{"statements":[[0,"      "],[1,[28,"d-button",null,[["class","action","icon","label"],["pull-left canned-replies-edit",[28,"action",[[23,0,[]],"editReply"],null],"pencil-alt","canned_replies.insert.edit_button"]]],false],[0,"\\n"]],"parameters":[]},null],[0,"\\n    "],[1,[28,"d-button",null,[["class","action","icon","label"],["btn-primary pull-right canned-replies-apply",[28,"action",[[23,0,[]],"apply"],null],"far-clipboard","canned_replies.insert.insert_button"]]],false],[0,"\\n"]],"parameters":[]},null],[9],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"javascripts/discourse/templates/modal/canned-replies"}}),Ember.TEMPLATES["javascripts/modal/edit-reply"]=Ember.HTMLBars.template({id:null,block:'{"symbols":[],"statements":[[4,"d-modal-body",null,[["title","class"],["canned_replies.edit.modal_title","canned-replies-modal"]],{"statements":[[0,"  "],[1,[28,"canned-replies-form",null,[["title","content"],[[24,["replyTitle"]],[24,["replyContent"]]]]],false],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[7,"div",true],[10,"class","modal-footer canned-replies-footer"],[8],[0,"\\n  "],[1,[28,"d-button",null,[["class","action","label","disabled"],["btn-primary edit-reply-save-btn",[28,"action",[[23,0,[]],"save"],null],[24,["savingLabel"]],[24,["disableSaveButton"]]]]],false],[0,"\\n\\n  "],[1,[28,"d-button",null,[["action","icon","label","class"],[[28,"action",[[23,0,[]],"cancel"],null],"chevron-left","canned_replies.back","canned-replies-edit-back"]]],false],[0,"\\n\\n  "],[1,[28,"d-button",null,[["class","action","icon","disabled"],["btn-danger",[28,"action",[[23,0,[]],"remove"],null],"trash-alt",[24,["saving"]]]]],false],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"javascripts/discourse/templates/modal/edit-reply"}}),Ember.TEMPLATES["javascripts/modal/new-reply"]=Ember.HTMLBars.template({id:null,block:'{"symbols":[],"statements":[[4,"d-modal-body",null,[["title","class"],["canned_replies.add.modal_title","canned-replies-modal"]],{"statements":[[0,"  "],[1,[28,"canned-replies-form",null,[["title","content"],[[24,["newTitle"]],[24,["newContent"]]]]],false],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[7,"div",true],[10,"class","modal-footer canned-replies-footer"],[8],[0,"\\n  "],[1,[28,"d-button",null,[["class","action","label","disabled"],["btn-primary new-reply-save-btn",[28,"action",[[23,0,[]],"save"],null],"save",[24,["disableSaveButton"]]]]],false],[0,"\\n\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"javascripts/discourse/templates/modal/new-reply"}}),define("discourse/plugins/discourse-canned-replies/initializers/add-canned-replies-ui-builder",["exports","discourse/lib/plugin-api","discourse/lib/show-modal"],(function(e,n,t){"use strict";function l(e){e.modifyClass("controller:composer",{pluginId:"discourse-canned-replies",actions:{showCannedRepliesButton:function(){this.site.mobileView?(0,t.default)("canned-replies").set("composerModel",this.model):(this.appEvents.trigger("composer:show-preview"),this.appEvents.trigger("canned-replies:show"))}}}),e.addToolbarPopupMenuOptionsCallback((function(){return{id:"canned_replies_button",icon:"far-clipboard",action:"showCannedRepliesButton",label:"canned_replies.composer_button_text"}}))}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"add-canned-replies-ui-builder",initialize:function(e){var t=e.lookup("site-settings:main"),i=e.lookup("current-user:main");t.canned_replies_enabled&&i&&i.can_use_canned_replies&&(0,n.withPluginApi)("0.5",l)}};e.default=i})),define("discourse/plugins/discourse-canned-replies/lib/apply-reply",["exports","discourse/lib/ajax","discourse/lib/ajax-error"],(function(e,n,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(e,l,i,s){if(s){var a={my_username:s.get("user.username"),my_name:s.get("user.name"),original_poster_username:s.get("topic.details.created_by.username"),original_poster_name:s.get("topic.details.created_by.name"),reply_to_username:s.get("post.username"),reply_to_name:s.get("post.name"),last_poster_username:s.get("topic.last_poster_username"),reply_to_or_last_poster_username:s.get("post.username")||s.get("topic.last_poster_username")};for(var r in a)a[r]?(l=l.replace(new RegExp("%{".concat(r,"(,fallback:.[^}]*)?}"),"g"),a[r]),i=i.replace(new RegExp("%{".concat(r,"(,fallback:.[^}]*)?}"),"g"),a[r])):(l=(l=l.replace(new RegExp("%{".concat(r,",fallback:(.[^}]*)}"),"g"),"$1")).replace(new RegExp("%{".concat(r,"}"),"g"),""),i=(i=i.replace(new RegExp("%{".concat(r,",fallback:(.[^}]*)}"),"g"),"$1")).replace(new RegExp("%{".concat(r,"}"),"g"),""))}s.appEvents.trigger("composer:insert-block",i),s&&!s.title&&s.set("title",l);(0,n.ajax)("/canned_replies/".concat(e,"/use"),{type:"PATCH"}).catch(t.popupAjaxError)}}));
//# sourceMappingURL=/assets/plugins/discourse-canned-replies-33e4732aee5d0bec3cee72adc45b9a5f41c8eaf95bdddb5b4d3026ec6280af09.js.map