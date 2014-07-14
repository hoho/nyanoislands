(function(e,t,l,n,a,d,o,i,c){e.tpl.page=function(){var n=l(this);return e(n.p).elem("h1").text("Conkitty templates for visual components").end().elem("h2").text("How to use").end().p().text("Assume we use ").a({href:"http://gulpjs.com/"}).text("Gulp").end().text(" and ").a({href:"https://www.npmjs.org/package/gulp-conkitty/"}).text("gulp-conkitty").end().text(" to build templates.").end().p().elem("code").text("gulp-conkitty").end().text(" task has ").elem("code").text("libs").end().text(" settting and all we need is ").elem("code").text("npm install nyanoislands").end().text(" and").end().elem("code",{"class":"block"}).text("// Gulp task might look like:\n").text("gulp.src(['src/**/*.ctpl'])\n").text("    .pipe(conkitty({\n").text("        common: 'common.js',\n").text("        templates: 'tpl.js',\n").text("        deps: true, // We need external templates.\n").text("        libs: {nyanoislands: require('nyanoislands')} // Here they are.\n").text("    }))\n").text("    .pipe(...) // We have common.js, tpl.js and all required by used templates .js and .css files.\n").text("               // Check https://github.com/hoho/nyanoislands/blob/gh-pages/_src/gulpfile.js for full example.").end().p().text("now you can use templates from ").elem("code").text("nya").end().text(" namespace.").end().elem("h2").text("Button").end().elem("h3").text("Template arguments").end().elem("code").text("nya::button title [theme] [size] [type] [href] [class] [disabled] [noAPI]").end().ul().li().elem("code").text("title").end().text(" — button title;").end().li().elem("code").text("theme").end().text(" — ").elem("em").text("(optional) ").end().elem("strong").text('"normal"').end().text(', "action", "dark", "pseudo";').end().li().elem("code").text("size").end().text(" — ").elem("em").text("(optional) ").end().elem("strong").text('"m"').end().text(', "s";').end().li().elem("code").text("type").end().text(" — ").elem("em").text("(optional, ignored if ").end().elem("code").text("href").end().elem("em").text(" is present) ").end().elem("strong").text('"button"').end().text(', "submit", "reset";').end().li().elem("code").text("href").end().text(" — ").elem("em").text("(optional) ").end().text("href for link button;").end().li().elem("code").text("class").end().text(" — ").elem("em").text("(optional) ").end().text("additional classes (whitespace-separated);").end().li().elem("code").text("disabled").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(";").end().li().elem("code").text("noAPI").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(".").end(2).elem("h3").text("API").end().elem("code").text('nya::button title="Button" AS $btn // Template call exposes API object.').end().ul().li().elem("code").text("$btn.on(event, handler)").end().text(" — add event handler;").end().li().elem("code").text("$btn.title([value])").end().text(" — get or set title;").end().li().elem("code").text("$btn.href([value])").end().text(" — get or set href (for link button);").end().li().elem("code").text("$btn.disabled([value])").end().text(" — get or set disabled state.").end(2).elem("h3").text("Examples").end().elem("dl").elem("dt").text("Normal button").end().elem("dd").act(function(){e._tpl["nya::button"].call(new t(this),"Normal")}).elem("code").text('nya::button title="Normal"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Normal Disabled",c,c,c,c,c,!0)}).elem("code").text('nya::button title="Normal Disabled" disabled=(true)').end().act(function(){e._tpl["nya::button"].call(new t(this),"Small",c,"s")}).elem("code").text('nya::button title="Small" size="s"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Small Disabled",c,"s",c,c,c,!0)}).elem("code").text('nya::button title="Small Disabled" size="s" disabled=(true)').end(2).elem("dt").text("Link button").end().elem("dd").act(function(){e._tpl["nya::button"].call(new t(this),"Link",c,c,c,"#link")}).elem("code").text('nya::button title="Link" href="#link"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Link Disabled",c,c,c,"#link",c,!0)}).elem("code").text('nya::button title="Link Disabled" href="#link" disabled=(true)').end().act(function(){e._tpl["nya::button"].call(new t(this),"Link Small",c,"s",c,"#link")}).elem("code").text('nya::button title="Link Small" href="#link" size="s"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Link Small Disabled",c,"s",c,"#link",c,!0)}).elem("code").text('nya::button title="Link Small Disabled" href="#link" size="s" disabled=(true)').end(2).elem("dt").text("Action button").end().elem("dd").act(function(){e._tpl["nya::button"].call(new t(this),"Action","action")}).elem("code").text('nya::button title="Action" theme="action"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Action Disabled","action",c,c,c,c,!0)}).elem("code").text('nya::button title="Action Disabled" theme="action" disabled=(true)').end().act(function(){e._tpl["nya::button"].call(new t(this),"Action Small","action","s")}).elem("code").text('nya::button title="Action Small" theme="action" size="s"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Action Small Disabled","action","s",c,c,c,!0)}).elem("code").text('nya::button title="Action Small Disabled" theme="action" size="s" disabled=(true)').end(2).elem("dt").text("Dark button").end().elem("dd").act(function(){e._tpl["nya::button"].call(new t(this),"Dark","dark")}).elem("code").text('nya::button title="Dark" theme="dark"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Dark Disabled","dark",c,c,c,c,!0)}).elem("code").text('nya::button title="Dark Disabled" theme="dark" disabled=(true)').end().act(function(){e._tpl["nya::button"].call(new t(this),"Dark Small","dark","s")}).elem("code").text('nya::button title="Dark Small" theme="dark" size="s"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Dark Small Disabled","dark","s",c,c,c,!0)}).elem("code").text('nya::button title="Dark Small Disabled" theme="dark" size="s" disabled=(true)').end(2).elem("dt").text("Pseudo button").end().elem("dd").act(function(){e._tpl["nya::button"].call(new t(this),"Pseudo","pseudo")}).elem("code").text('nya::button title="Pseudo" theme="pseudo"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Pseudo Disabled","pseudo",c,c,c,c,!0)}).elem("code").text('nya::button title="Pseudo Disabled" theme="pseudo" disabled=(true)').end().act(function(){e._tpl["nya::button"].call(new t(this),"Pseudo Small","pseudo","s")}).elem("code").text('nya::button title="Pseudo Small" theme="pseudo" size="s"').end().act(function(){e._tpl["nya::button"].call(new t(this),"Pseudo Small Disabled","pseudo","s",c,c,c,!0)}).elem("code").text('nya::button title="Pseudo Small Disabled" theme="pseudo" size="s" disabled=(true)').end(3).elem("h2").text("Checkbox").end().elem("h3").text("Template arguments").end().elem("code").text("nya::checkbox label name value [size] [checked] [class] [disabled] [noAPI]").end().ul().li().elem("code").text("label").end().text(" — checkbox label;").end().li().elem("code").text("name").end().text(" — checkbox input name;").end().li().elem("code").text("value").end().text(" — checkbox input value;").end().li().elem("code").text("size").end().text(" — ").elem("em").text("(optional) ").end().elem("strong").text('"m"').end().text(', "s";').end().li().elem("code").text("checked").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(";").end().li().elem("code").text("class").end().text(" — ").elem("em").text("(optional) ").end().text("additional classes (whitespace-separated);").end().li().elem("code").text("disabled").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(";").end().li().elem("code").text("noAPI").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(".").end(2).elem("h3").text("API").end().elem("code").text('nya::checkbox label="Checkbox" name="checkbox1" value="yes" AS $cb // Template call exposes API object.').end().ul().li().elem("code").text("$cb.on(event, handler)").end().text(" — add event handler;").end().li().elem("code").text("$cb.checked([value])").end().text(" — get or set checked state;").end().li().elem("code").text("$cb.val([value])").end().text(" — get or set checkbox value;").end().li().elem("code").text("$cb.label([value])").end().text(" — get or set label;").end().li().elem("code").text("$cb.disabled([value])").end().text(" — get or set disabled state.").end(2).elem("h3").text("Examples").end().elem("dl").elem("dt").text("Normal checkbox").end().elem("dd").act(function(){e._tpl["nya::checkbox"].call(new t(this),"Normal","checkbox1","yes")}).elem("code").text('nya::checkbox label="Normal" name="checkbox1" value="yes"').end().act(function(){e._tpl["nya::checkbox"].call(new t(this),"Normal Checked","checkbox2","yes",c,!0)}).elem("code").text('nya::checkbox label="Normal Checked" name="checkbox2" value="yes" checked=(true)').end().act(function(){e._tpl["nya::checkbox"].call(new t(this),"Normal Disabled","checkbox3","yes",c,c,c,!0)}).elem("code").text('nya::checkbox label="Normal Disabled" name="checkbox3" value="yes" disabled=(true)').end().act(function(){e._tpl["nya::checkbox"].call(new t(this),"Normal Checked Disabled","checkbox4","yes",c,!0,c,!0)}).elem("code").text('nya::checkbox label="Normal Checked Disabled" name="checkbox4" value="yes" checked=(true) disabled=(true)').end(2).elem("dt").text("Small checkbox").end().elem("dd").act(function(){e._tpl["nya::checkbox"].call(new t(this),"Small","checkbox5","yes","s")}).elem("code").text('nya::checkbox label="Small" name="checkbox5" value="yes" size="s"').end().act(function(){e._tpl["nya::checkbox"].call(new t(this),"Small Checked","checkbox6","yes","s",!0)}).elem("code").text('nya::checkbox label="Small Checked" name="checkbox6" value="yes" size="s" checked=(true)').end().act(function(){e._tpl["nya::checkbox"].call(new t(this),"Small Disabled","checkbox7","yes","s",c,c,!0)}).elem("code").text('nya::checkbox label="Small Disabled" name="checkbox7" value="yes" size="s" disabled=(true)').end().act(function(){e._tpl["nya::checkbox"].call(new t(this),"Small Checked Disabled","checkbox8","yes","s",!0,c,!0)}).elem("code").text('nya::checkbox label="Small Checked Disabled" name="checkbox8" value="yes" size="s" checked=(true) disabled=(true)').end(3).elem("h2").text("Radio").end().elem("h3").text("Template arguments").end().elem("code").text("nya::radio label name value [size] [checked] [class] [disabled] [noAPI]").end().ul().li().elem("code").text("label").end().text(" — radio label;").end().li().elem("code").text("name").end().text(" — radio input name;").end().li().elem("code").text("value").end().text(" — radio input value;").end().li().elem("code").text("size").end().text(" — ").elem("em").text("(optional) ").end().elem("strong").text('"m"').end().text(', "s";').end().li().elem("code").text("checked").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(";").end().li().elem("code").text("class").end().text(" — ").elem("em").text("(optional) ").end().text("additional classes (whitespace-separated);").end().li().elem("code").text("disabled").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(";").end().li().elem("code").text("noAPI").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(".").end(2).elem("h3").text("API").end().elem("code").text('nya::radio label="Radio" name="radio1" value="yes" AS $r // Template call exposes API object.').end().ul().li().elem("code").text("$r.on(event, handler)").end().text(" — add event handler;").end().li().elem("code").text("$r.checked([value])").end().text(" — get or set checked state;").end().li().elem("code").text("$r.val([value])").end().text(" — get or set checkbox value;").end().li().elem("code").text("$r.label([value])").end().text(" — get or set label;").end().li().elem("code").text("$r.disabled([value])").end().text(" — get or set disabled state.").end(2).elem("h3").text("Examples").end().elem("dl").elem("dt").text("Normal radio").end().elem("dd").act(function(){e._tpl["nya::radio"].call(new t(this),"Normal","radio1","yes")}).br().end().act(function(){e._tpl["nya::radio"].call(new t(this),"Normal Checked","radio1","no",c,!0)}).elem("code").text('nya::radio label="Normal" name="radio1" value="yes"').text("\nbr\n").text('nya::radio label="Normal Checked" name="radio1" value="no" checked=(true)').end().act(function(){e._tpl["nya::radio"].call(new t(this),"Normal Disabled","radio2","yes",c,c,c,!0)}).br().end().act(function(){e._tpl["nya::radio"].call(new t(this),"Normal Checked Disabled","radio2","no",c,!0,c,!0)}).elem("code").text('nya::radio label="Normal Disabled" name="radio2" value="yes" disabled=(true)').text("\nbr\n").text('nya::radio label="Normal Checked Disabled" name="radio2" value="no" checked=(true) disabled=(true)').end(2).elem("dt").text("Small radio").end().elem("dd").act(function(){e._tpl["nya::radio"].call(new t(this),"Small","radio3","yes","s")}).br().end().act(function(){e._tpl["nya::radio"].call(new t(this),"Small Checked","radio3","no","s",!0)}).elem("code").text('nya::radio label="Small" name="radio3" value="yes" size="s"').text("\nbr\n").text('nya::radio label="Small Checked" name="radio3" value="no" size="s" checked=(true)').end().act(function(){e._tpl["nya::radio"].call(new t(this),"Small Disabled","radio4","yes","s",c,c,!0)}).br().end().act(function(){e._tpl["nya::radio"].call(new t(this),"Small Checked Disabled","radio4","no","s",!0,c,!0)}).elem("code").text('nya::radio label="Small Disabled" name="radio4" value="yes" size="s" disabled=(true)').text("\nbr\n").text('nya::radio label="Small Checked Disabled" name="radio4" value="no" size="s" checked=(true) disabled=(true)').end(3).elem("h2").text("Input").end().elem("h3").text("Template arguments").end().elem("code").text("nya::input name [value] [size] [placeholder] [reset] [class] [disabled] [noAPI]").end().ul().li().elem("code").text("name").end().text(" — input name;").end().li().elem("code").text("value").end().text(" — ").elem("em").text("(optional) ").end().text("input value").end().li().elem("code").text("size").end().text(" — ").elem("em").text("(optional) ").end().elem("strong").text('"m"').end().text(', "s";').end().li().elem("code").text("placeholder").end().text(" — ").elem("em").text("(optional) ").end().text("empty input placeholder").end().li().elem("code").text("reset").end().text(" — ").elem("em").text("(optional) ").end().text("with reset button to clear value;").end().li().elem("code").text("class").end().text(" — ").elem("em").text("(optional) ").end().text("additional classes (whitespace-separated);").end().li().elem("code").text("disabled").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(";").end().li().elem("code").text("noAPI").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(".").end(2).elem("h3").text("API").end().elem("code").text('nya::input name="input" AS $i // Template call exposes API object.').end().ul().li().elem("code").text("$i.on(event, handler)").end().text(" — add event handler;").end().li().elem("code").text("$i.val([value])").end().text(" — get or set value;").end().li().elem("code").text("$i.disabled([value])").end().text(" — get or set disabled state.").end(2).elem("h3").text("Examples").end().elem("dl").elem("dt").text("Normal input").end().elem("dd").act(function(){e._tpl["nya::input"].call(new t(this),"input1","Normal")}).elem("code").text('nya::input name="input1" value="Normal"').end().act(function(){e._tpl["nya::input"].call(new t(this),"input2","Normal Disabled",c,c,c,c,!0)}).elem("code").text('nya::input name="input2" value="Normal Disabled" disabled=(true)').end(2).elem("dt").text("Small input").end().elem("dd").act(function(){e._tpl["nya::input"].call(new t(this),"input3","Small","s")}).elem("code").text('nya::input name="input3" value="Small" size="s"').end().act(function(){e._tpl["nya::input"].call(new t(this),"input4","Small Disabled","s",c,c,c,!0)}).elem("code").text('nya::input name="input4" value="Small Disabled" size="s" disabled=(true)').end(2).elem("dt").text("With placeholder").end().elem("dd").act(function(){e._tpl["nya::input"].call(new t(this),"input5","",c,"Hello world")}).elem("code").text('nya::input name="input5" value="" placeholder="Hello world"').end().act(function(){e._tpl["nya::input"].call(new t(this),"input6","",c,"Hello world",c,c,!0)}).elem("code").text('nya::input name="input6" value="" placeholder="Hello world" disabled=(true)').end().act(function(){e._tpl["nya::input"].call(new t(this),"input7","","s","Hello world")}).elem("code").text('nya::input name="input7" value="" size="s" placeholder="Hello world"').end().act(function(){e._tpl["nya::input"].call(new t(this),"input8","","s","Hello world",c,c,!0)}).elem("code").text('nya::input name="input8" value="" size="s" placeholder="Hello world" disabled=(true)').end(2).elem("dt").text("With reset").end().elem("dd").act(function(){e._tpl["nya::input"].call(new t(this),"input9","Normal Reset",c,c,!0)}).elem("code").text('nya::input name="input9" value="Normal Reset" reset=(true)').end().act(function(){e._tpl["nya::input"].call(new t(this),"input10","Normal Disabled Reset",c,c,!0,c,!0)}).elem("code").text('nya::input name="input10" value="Normal Disabled Reset" reset=(true) disabled=(true)').end().act(function(){e._tpl["nya::input"].call(new t(this),"input11","Small Reset","s",c,!0)}).elem("code").text('nya::input name="input11" value="Small Reset" size="s" reset=(true)').end().act(function(){e._tpl["nya::input"].call(new t(this),"input12","Small Disabled Reset","s",c,!0,c,!0)}).elem("code").text('nya::input name="input12" value="Small Disabled Reset" size="s" reset=(true) disabled=(true)').end(3).elem("h2").text("Textarea").end().elem("h3").text("Template arguments").end().elem("code").text("nya::textarea name [value] [size] [placeholder] [reset] [rows] [class] [disabled] [noAPI]").end().ul().li().elem("code").text("name").end().text(" — textarea name;").end().li().elem("code").text("value").end().text(" — ").elem("em").text("(optional) ").end().text("textarea value").end().li().elem("code").text("size").end().text(" — ").elem("em").text("(optional) ").end().elem("strong").text('"m"').end().text(', "s";').end().li().elem("code").text("placeholder").end().text(" — ").elem("em").text("(optional) ").end().text("empty textarea placeholder").end().li().elem("code").text("reset").end().text(" — ").elem("em").text("(optional) ").end().text("with reset button to clear value;").end().li().elem("code").text("rows").end().text(" — ").elem("em").text("(optional) ").end().text("number of rows;").end().li().elem("code").text("class").end().text(" — ").elem("em").text("(optional) ").end().text("additional classes (whitespace-separated);").end().li().elem("code").text("disabled").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(";").end().li().elem("code").text("noAPI").end().text(" — ").elem("em").text("(optional) ").end().text("(true), ").elem("strong").text("(false)").end().text(".").end(2).elem("h3").text("API").end().elem("code").text('nya::textarea name="textarea" AS $t // Template call exposes API object.').end().ul().li().elem("code").text("$t.on(event, handler)").end().text(" — add event handler;").end().li().elem("code").text("$t.val([value])").end().text(" — get or set value;").end().li().elem("code").text("$t.disabled([value])").end().text(" — get or set disabled state.").end(2).elem("h3").text("Examples").end().elem("dl").elem("dt").text("Normal textarea").end().elem("dd").act(function(){e._tpl["nya::textarea"].call(new t(this),"textarea1","Normal")}).elem("code").text('nya::textarea name="textarea1" value="Normal"').end().act(function(){e._tpl["nya::textarea"].call(new t(this),"textarea2","Normal Disabled",c,c,c,c,c,!0)}).elem("code").text('nya::textarea name="textarea2" value="Normal Disabled" disabled=(true)').end(2).elem("dt").text("Small textarea").end().elem("dd").act(function(){e._tpl["nya::textarea"].call(new t(this),"textarea3","Small","s")}).elem("code").text('nya::textarea name="textarea3" value="Small" size="s"').end().act(function(){e._tpl["nya::textarea"].call(new t(this),"textarea4","Small Disabled","s",c,c,c,c,!0)}).elem("code").text('nya::textarea name="textarea4" value="Small Disabled" size="s" disabled=(true)').end(2).elem("dt").text("With placeholder").end().elem("dd").act(function(){e._tpl["nya::textarea"].call(new t(this),"textarea5","",c,"Hello world")}).elem("code").text('nya::textarea name="textarea5" value="" placeholder="Hello world"').end().act(function(){e._tpl["nya::textarea"].call(new t(this),"textarea6","",c,"Hello world",c,c,c,!0)}).elem("code").text('nya::textarea name="textarea6" value="" placeholder="Hello world" disabled=(true)').end().act(function(){e._tpl["nya::textarea"].call(new t(this),"textarea7","","s","Hello world")}).elem("code").text('nya::textarea name="textarea7" value="" size="s" placeholder="Hello world"').end().act(function(){e._tpl["nya::textarea"].call(new t(this),"textarea8","","s","Hello world",c,c,c,!0)}).elem("code").text('nya::textarea name="textarea8" value="" size="s" placeholder="Hello world" disabled=(true)').end(2).elem("dt").text("With reset").end().elem("dd").act(function(){e._tpl["nya::textarea"].call(new t(this),"textarea9","Normal Reset",c,c,!0)}).elem("code").text('nya::textarea name="textarea9" value="Normal Reset" reset=(true)').end().act(function(){e._tpl["nya::textarea"].call(new t(this),"textarea10","Normal Disabled Reset",c,c,!0,c,c,!0)}).elem("code").text('nya::textarea name="textarea10" value="Normal Disabled Reset" reset=(true) disabled=(true)').end().act(function(){e._tpl["nya::textarea"].call(new t(this),"textarea11","Small Reset","s",c,!0)}).elem("code").text('nya::textarea name="textarea11" value="Small Reset" size="s" reset=(true)').end().act(function(){e._tpl["nya::textarea"].call(new t(this),"textarea12","Small Disabled Reset","s",c,!0,c,c,!0)}).elem("code").text('nya::textarea name="textarea12" value="Small Disabled Reset" size="s" reset=(true) disabled=(true)').end(2).elem("dt").text("With number of rows").end().elem("dd").act(function(){e._tpl["nya::textarea"].call(new t(this),"textarea13","Normal Rows",c,c,c,5)}).elem("code").text('nya::textarea name="textarea13" value="Normal Rows" rows=(5)').end().act(function(){e._tpl["nya::textarea"].call(new t(this),"textarea13","Small Rows","s",c,c,5)}).elem("code").text('nya::textarea name="textarea13" value="Small Rows" size="s" rows=(5)').end(4)},e._tpl["nya::button"]=function(t,a,o,i,s,m,x,u){a===c&&(a="normal"),o===c&&(o="m"),i===c&&(i="button");var r,p,b,h=l(this);return e(h.p).elem(function(){return s?"a":"button"},function(){return{"class":n("nya-button",x?"nya-button_disabled":c),href:s?s:c,type:s?c:i,disabled:x?"disabled":c}}).act(function(){p=this}).attr("class",function(){return d(this,"nya-button_"+a+"_"+o+(m?" "+m:""))}).span({"class":"nya-button__title"}).act(function(){b=this}).text(function(){return t}).end(2).act(function(){r=u?c:new Nya.Button(p,b)}).end(),r},e._tpl["nya::checkbox"]=function(t,o,i,s,m,x,u,r){s===c&&(s="m");var p,b,h,y,f=l(this);return e(f.p).elem("label",function(){return{"class":n(n("nya-checkbox",a("nya-checkbox_size",s)),u?"nya-checkbox_disabled":c)}}).act(function(){b=this}).attr("class",function(){return d(this,x)}).elem("input",function(){return{"class":"nya-checkbox__input",type:"checkbox",name:o,value:i,checked:m?"checked":c,disabled:u?"disabled":c}}).act(function(){h=this}).end().span({"class":"nya-checkbox__flag"}).span({"class":"nya-checkbox__flag-icon"}).end(2).span({"class":"nya-checkbox__label"}).act(function(){y=this}).text(function(){return t}).end(2).act(function(){p=r?c:new Nya.Checkbox(b,h,y)}).end(),p},e._tpl["nya::radio"]=function(t,o,i,s,m,x,u,r){s===c&&(s="m");var p,b,h,y,f=l(this);return e(f.p).elem("label",function(){return{"class":n(n("nya-radio",a("nya-radio_size",s)),u?"nya-radio_disabled":c)}}).act(function(){b=this}).attr("class",function(){return d(this,x)}).elem("input",function(){return{"class":"nya-radio__input",type:"radio",name:o,value:i,checked:m?"checked":c,disabled:u?"disabled":c}}).act(function(){h=this}).end().span({"class":"nya-radio__flag"}).span({"class":"nya-radio__flag-icon"}).end(2).span({"class":"nya-radio__label"}).act(function(){y=this}).text(function(){return t}).end(2).act(function(){p=r?c:new Nya.Radio(b,h,y)}).end(),p},e._tpl["nya::input"]=function(n,a,d,o,i,c,s,m){var x,u,r=l(this);return e(r.p).act(function(){u=e._tpl["nya::_input"].call(new t(this),n,a,d,o,i,!1,c,s,m)}).act(function(){x=u}).end(),x},e._tpl["nya::_input"]=function(t,o,i,s,m,x,u,r,p){i===c&&(i="m");var b,h,y,f,k=l(this);return e(k.p).choose().when(function(){return m}).elem("label",function(){return{"class":n(n("nya-input nya-input_reset_yes",a("nya-input_size",i)),r?"nya-input_disabled":c)}}).act(function(){h=this}).attr("class",function(){return d(this,u)}).span({"class":"nya-input__reset"}).act(function(){y=this}).end().span({"class":"nya-input__content"}).elem(function(){return x?"textarea":"input"},function(){return{"class":"nya-input__controller",name:t,placeholder:s,rows:x&&x!==!0?x:c,value:x?c:o,disabled:r?"disabled":c}}).act(function(){f=this}).test(function(){return x}).text(function(){return o}).end(2).span({"class":"nya-input__view"}).text("&nbsp;",!0).end(4).otherwise().elem(function(){return x?"textarea":"input"},function(){return{"class":n(n("nya-input nya-input_reset_no nya-input__controller",a("nya-input_size",i)),r?"nya-input_disabled":c),name:t,placeholder:s,rows:x&&x!==!0?x:c,value:x?c:o,disabled:r?"disabled":c}}).act(function(){f=this}).attr("class",function(){return d(this,u)}).test(function(){return x}).text(function(){return o}).end(4).act(function(){b=function(){return y&&$B(y).on("click",function(){f.value=""}),p?c:new Nya.Input(h,f)}.call(this)}).end(),b},e._tpl["nya::textarea"]=function(n,a,d,o,i,c,s,m,x){var u,r,p=l(this);return e(p.p).act(function(){r=e._tpl["nya::_input"].call(new t(this),n,a,d,o,i,c||!0,s,m,x)}).act(function(){u=r}).end(),u}}).apply(null,$C._$args);