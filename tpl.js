(function(e,t,n,l,a,d,o,c,i){e.tpl.page=function(){var l=n(this);return e(l.p).elem("h1").text("Conkitty templates for visual components").end().elem("h2").text("How to use").end().p().text("Assume we use ").a({href:"http://gulpjs.com/"}).text("Gulp").end().text(" and ").a({href:"https://www.npmjs.org/package/gulp-conkitty/"}).text("gulp-conkitty").end().text(" to build templates.").end().p().elem("code").text("gulp-conkitty").end().text(" task has ").elem("code").text("libs").end().text(" settting and all we need is ").elem("code").text("npm install nyanoislands").end().text(" and").end().elem("code",{"class":"block"}).text(".pipe(conkitty({\n").text("    common: 'common.js',\n").text("    templates: 'tpl.js',\n").text("    deps: true, // We need external templates.\n").text("    libs: {nyanoislands: require('nyanoislands')} // Here they are.\n").text("}))").end().p().text("now you can use templates from ").elem("code").text("nya").end().text(" namespace.").end().elem("h2").text("Button").end().elem("h3").text("Template arguments").end().elem("code").text("nya::button title [theme] [size] [type] [href] [class] [disabled] [noAPI]").end().ul().li().elem("code").text("title").end().text(" — button title;").end().li().elem("code").text("theme").end().text(" — ").elem("em").text("(optional) ").end().elem("strong").text('"normal"').end().text(', "action", "dark", "pseudo";').end().li().elem("code").text("size").end().text(" — ").elem("em").text("(optional) ").end().elem("strong").text('"m"').end().text(', "s";').end().li().elem("code").text("type").end().text(" — ").elem("em").text("(optional, ignored if ").end().elem("code").text("href").end().elem("em").text(" is present) ").end().elem("strong").text('"button"').end().text(', "submit", "reset";').end().li().elem("code").text("href").end().text(" — ").elem("em").text("(optional) ").end().text("href for link button;").end().li().elem("code").text("class").end().text(" — ").elem("em").text("(optional) ").end().text("additional classes for button tag (whitespace-separated);").end().li().elem("code").text("disabled").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(";").end().li().elem("code").text("noAPI").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(".").end(2).elem("h3").text("API").end().elem("code").text('nya::button title="Button" AS $btn // Template call exposes API object.').end().ul().li().elem("code").text("$btn.on(event, handler)").end().text(" — add event handler;").end().li().elem("code").text("$btn.title([value])").end().text(" — get or set title;").end().li().elem("code").text("$btn.href([value])").end().text(" — get or set href (for link button);").end().li().elem("code").text("$btn.disabled([value])").end().text(" — get or set disabled state.").end(2).elem("h3").text("Examples").end().elem("dl").elem("dt").text("Normal button").end().elem("dd").act(function(){e._tpl["nya::button"].call(new t(this),"Normal")}).elem("code").text('nya::button title="Normal"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Normal Disabled",i,i,i,i,i,!0)}).elem("code").text('nya::button title="Normal Disabled" disabled=(true)').end().act(function(){e._tpl["nya::button"].call(new t(this),"Small",i,"s")}).elem("code").text('nya::button title="Small" size="s"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Small Disabled",i,"s",i,i,i,!0)}).elem("code").text('nya::button title="Small Disabled" size="s" disabled=(true)').end(2).elem("dt").text("Link button").end().elem("dd").act(function(){e._tpl["nya::button"].call(new t(this),"Link",i,i,i,"#link")}).elem("code").text('nya::button title="Link" href="#link"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Link Disabled",i,i,i,"#link",i,!0)}).elem("code").text('nya::button title="Link Disabled" href="#link" disabled=(true)').end().act(function(){e._tpl["nya::button"].call(new t(this),"Link Small",i,"s",i,"#link")}).elem("code").text('nya::button title="Link Small" href="#link" size="s"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Link Small Disabled",i,"s",i,"#link",i,!0)}).elem("code").text('nya::button title="Link Small Disabled" href="#link" size="s" disabled=(true)').end(2).elem("dt").text("Action button").end().elem("dd").act(function(){e._tpl["nya::button"].call(new t(this),"Action","action")}).elem("code").text('nya::button title="Action" theme="action"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Action Disabled","action",i,i,i,i,!0)}).elem("code").text('nya::button title="Action Disabled" theme="action" disabled=(true)').end().act(function(){e._tpl["nya::button"].call(new t(this),"Action Small","action","s")}).elem("code").text('nya::button title="Action Small" theme="action" size="s"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Action Small Disabled","action","s",i,i,i,!0)}).elem("code").text('nya::button title="Action Small Disabled" theme="action" size="s" disabled=(true)').end(2).elem("dt").text("Dark button").end().elem("dd").act(function(){e._tpl["nya::button"].call(new t(this),"Dark","dark")}).elem("code").text('nya::button title="Dark" theme="dark"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Dark Disabled","dark",i,i,i,i,!0)}).elem("code").text('nya::button title="Dark Disabled" theme="dark" disabled=(true)').end().act(function(){e._tpl["nya::button"].call(new t(this),"Dark Small","dark","s")}).elem("code").text('nya::button title="Dark Small" theme="dark" size="s"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Dark Small Disabled","dark","s",i,i,i,!0)}).elem("code").text('nya::button title="Dark Small Disabled" theme="dark" size="s" disabled=(true)').end(2).elem("dt").text("Pseudo button").end().elem("dd").act(function(){e._tpl["nya::button"].call(new t(this),"Pseudo","pseudo")}).elem("code").text('nya::button title="Pseudo" theme="pseudo"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Pseudo Disabled","pseudo",i,i,i,i,!0)}).elem("code").text('nya::button title="Pseudo Disabled" theme="pseudo" disabled=(true)').end().act(function(){e._tpl["nya::button"].call(new t(this),"Pseudo Small","pseudo","s")}).elem("code").text('nya::button title="Pseudo Small" theme="pseudo" size="s"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Pseudo Small Disabled","pseudo","s",i,i,i,!0)}).elem("code").text('nya::button title="Pseudo Small Disabled" theme="pseudo" size="s" disabled=(true)').end(3).elem("h2").text("Checkbox").end().elem("h3").text("Template arguments").end().elem("code").text("nya::checkbox label name value [size] [checked] [class] [disabled] [noAPI]").end().ul().li().elem("code").text("label").end().text(" — checkbox label;").end().li().elem("code").text("name").end().text(" — checkbox input name;").end().li().elem("code").text("value").end().text(" — checkbox input value;").end().li().elem("code").text("size").end().text(" — ").elem("em").text("(optional) ").end().elem("strong").text('"m"').end().text(', "s";').end().li().elem("code").text("checked").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(";").end().li().elem("code").text("class").end().text(" — ").elem("em").text("(optional) ").end().text("additional classes (whitespace-separated);").end().li().elem("code").text("disabled").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(";").end().li().elem("code").text("noAPI").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(".").end(2).elem("h3").text("API").end().elem("code").text('nya::checkbox label="Checkbox" name="checkbox1" value="yes" AS $cb // Template call exposes API object.').end().ul().li().elem("code").text("$cb.on(event, handler)").end().text(" — add event handler;").end().li().elem("code").text("$cb.checked([value])").end().text(" — get or set checked state;").end().li().elem("code").text("$cb.val([value])").end().text(" — get or set checkbox value;").end().li().elem("code").text("$cb.label([value])").end().text(" — get or set label;").end().li().elem("code").text("$cb.disabled([value])").end().text(" — get or set disabled state.").end(2).elem("h3").text("Examples").end().elem("dl").elem("dt").text("Normal checkbox").end().elem("dd").act(function(){e._tpl["nya::checkbox"].call(new t(this),"Normal","checkbox1","yes")}).elem("code").text('nya::checkbox label="Normal" name="checkbox1" value="yes"').end().act(function(){e._tpl["nya::checkbox"].call(new t(this),"Normal Checked","checkbox2","yes",i,!0)}).elem("code").text('nya::checkbox label="Normal Checked" name="checkbox2" value="yes" checked=(true)').end().act(function(){e._tpl["nya::checkbox"].call(new t(this),"Normal Disabled","checkbox3","yes",i,i,i,!0)}).elem("code").text('nya::checkbox label="Normal Disabled" name="checkbox3" value="yes" disabled=(true)').end().act(function(){e._tpl["nya::checkbox"].call(new t(this),"Normal Checked Disabled","checkbox4","yes",i,!0,i,!0)}).elem("code").text('nya::checkbox label="Normal Checked Disabled" name="checkbox4" value="yes" checked=(true) disabled=(true)').end(2).elem("dt").text("Small checkbox").end().elem("dd").act(function(){e._tpl["nya::checkbox"].call(new t(this),"Small","checkbox5","yes","s")}).elem("code").text('nya::checkbox label="Small" name="checkbox5" value="yes" size="s"').end().act(function(){e._tpl["nya::checkbox"].call(new t(this),"Small Checked","checkbox6","yes","s",!0)}).elem("code").text('nya::checkbox label="Small Checked" name="checkbox6" value="yes" size="s" checked=(true)').end().act(function(){e._tpl["nya::checkbox"].call(new t(this),"Small Disabled","checkbox7","yes","s",i,i,!0)}).elem("code").text('nya::checkbox label="Small Disabled" name="checkbox7" value="yes" size="s" disabled=(true)').end().act(function(){e._tpl["nya::checkbox"].call(new t(this),"Small Checked Disabled","checkbox8","yes","s",!0,i,!0)}).elem("code").text('nya::checkbox label="Small Checked Disabled" name="checkbox8" value="yes" size="s" checked=(true) disabled=(true)').end(3).elem("h2").text("Radio").end().elem("h3").text("Template arguments").end().elem("code").text("nya::radio label name value [size] [checked] [class] [disabled] [noAPI]").end().ul().li().elem("code").text("label").end().text(" — radio label;").end().li().elem("code").text("name").end().text(" — radio input name;").end().li().elem("code").text("value").end().text(" — radio input value;").end().li().elem("code").text("size").end().text(" — ").elem("em").text("(optional) ").end().elem("strong").text('"m"').end().text(', "s";').end().li().elem("code").text("checked").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(";").end().li().elem("code").text("class").end().text(" — ").elem("em").text("(optional) ").end().text("additional classes (whitespace-separated);").end().li().elem("code").text("disabled").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(";").end().li().elem("code").text("noAPI").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(".").end(2).elem("h3").text("API").end().elem("code").text('nya::radio label="Radio" name="radio1" value="yes" AS $r // Template call exposes API object.').end().ul().li().elem("code").text("$r.on(event, handler)").end().text(" — add event handler;").end().li().elem("code").text("$r.checked([value])").end().text(" — get or set checked state;").end().li().elem("code").text("$r.val([value])").end().text(" — get or set checkbox value;").end().li().elem("code").text("$r.label([value])").end().text(" — get or set label;").end().li().elem("code").text("$r.disabled([value])").end().text(" — get or set disabled state.").end(2).elem("h3").text("Examples").end().elem("dl").elem("dt").text("Normal radio").end().elem("dd").act(function(){e._tpl["nya::radio"].call(new t(this),"Normal","radio1","yes")}).br().end().act(function(){e._tpl["nya::radio"].call(new t(this),"Normal Checked","radio1","no",i,!0)}).elem("code").text('nya::radio label="Normal" name="radio1" value="yes"').text("\nbr\n").text('nya::radio label="Normal Checked" name="radio1" value="no" checked=(true)').end().act(function(){e._tpl["nya::radio"].call(new t(this),"Normal Disabled","radio2","yes",i,i,i,!0)}).br().end().act(function(){e._tpl["nya::radio"].call(new t(this),"Normal Checked Disabled","radio2","no",i,!0,i,!0)}).elem("code").text('nya::radio label="Normal Disabled" name="radio2" value="yes" disabled=(true)').text("\nbr\n").text('nya::radio label="Normal Checked Disabled" name="radio2" value="no" checked=(true) disabled=(true)').end(2).elem("dt").text("Small radio").end().elem("dd").act(function(){e._tpl["nya::radio"].call(new t(this),"Small","radio3","yes","s")}).br().end().act(function(){e._tpl["nya::radio"].call(new t(this),"Small Checked","radio3","no","s",!0)}).elem("code").text('nya::radio label="Small" name="radio3" value="yes" size="s"').text("\nbr\n").text('nya::radio label="Small Checked" name="radio3" value="no" size="s" checked=(true)').end().act(function(){e._tpl["nya::radio"].call(new t(this),"Small Disabled","radio4","yes","s",i,i,!0)}).br().end().act(function(){e._tpl["nya::radio"].call(new t(this),"Small Checked Disabled","radio4","no","s",!0,i,!0)}).elem("code").text('nya::radio label="Small Disabled" name="radio4" value="yes" size="s" disabled=(true)').text("\nbr\n").text('nya::radio label="Small Checked Disabled" name="radio4" value="no" size="s" checked=(true) disabled=(true)').end(4)},e._tpl["nya::button"]=function(t,a,o,c,s,m,x,u){a===i&&(a="normal"),o===i&&(o="m"),c===i&&(c="button");var b,r,h,y=n(this);return e(y.p).elem(function(){return s?"a":"button"},function(){return{"class":l("nya-button",x?"nya-button_disabled":i),href:s?s:i,type:s?i:c,disabled:x?"disabled":i}}).act(function(){r=this}).attr("class",function(){return d(this,"nya-button_"+a+"_"+o+(m?" "+m:""))}).span({"class":"nya-button__title"}).act(function(){h=this}).text(function(){return t}).end(2).act(function(){b=u?i:new Nya.Button(r,h)}).end(),b},e._tpl["nya::checkbox"]=function(t,o,c,s,m,x,u,b){s===i&&(s="m");var r,h,y,p,k=n(this);return e(k.p).elem("label",function(){return{"class":l(l("nya-checkbox",a("nya-checkbox_size",s)),u?"nya-checkbox_disabled":i)}}).act(function(){h=this}).attr("class",function(){return d(this,x)}).elem("input",function(){return{"class":"nya-checkbox__input",type:"checkbox",name:o,value:c,checked:m?"checked":i,disabled:u?"disabled":i}}).act(function(){y=this}).end().span({"class":"nya-checkbox__flag"}).span({"class":"nya-checkbox__flag-icon"}).end(2).span({"class":"nya-checkbox__label"}).act(function(){p=this}).text(function(){return t}).end(2).act(function(){r=b?i:new Nya.Checkbox(h,y,p)}).end(),r},e._tpl["nya::radio"]=function(t,o,c,s,m,x,u,b){s===i&&(s="m");var r,h,y,p,k=n(this);return e(k.p).elem("label",function(){return{"class":l(l("nya-radio",a("nya-radio_size",s)),u?"nya-radio_disabled":i)}}).act(function(){h=this}).attr("class",function(){return d(this,x)}).elem("input",function(){return{"class":"nya-radio__input",type:"radio",name:o,value:c,checked:m?"checked":i,disabled:u?"disabled":i}}).act(function(){y=this}).end().span({"class":"nya-radio__flag"}).span({"class":"nya-radio__flag-icon"}).end(2).span({"class":"nya-radio__label"}).act(function(){p=this}).text(function(){return t}).end(2).act(function(){r=b?i:new Nya.Radio(h,y,p)}).end(),r}}).apply(null,$C._$args);