// Replace any nasty characters with safe alternatives
// or just a blank string
function escapeText(s){
  if(!s){return "";}
  s += "";
  return s.replace(/[\n\r\t'"<>&]/g, function(s){
      switch(s){case"\n":case"\r":case"\t":return"";
        case"'":return"&#039";
        case"\"":return"&quot";
        case"<":return"&lt";
        case">":return"&gt";
        case"&":return"&amp";
      }});}

// Oh recursion you beauty!
// To my rescue you descend
// up trees I cannot fathom
// down branchs I do not dare.
//
//Build me some HTML.
//
function recursiveOptions(obj,dd){
  var base = '';
  // could be an array or object
  if(obj != null && typeof obj == 'object' && obj.temp)
    var o = obj.temp;
  else 
    var o = obj;
  for (var k in o){
    var kk = o[k];
    // t: will assign the building blocks
    switch(kk.t){
      case 'd':
        var start='<div',tail = '>',end = '</div>';
        break;
      case 'i':
        var start='<input',tail = '>',end = '';
        break;
      case 'img':
        var start='<img',tail='>',end='';
        break;
      case 'form':
        var start='<form',tail='>',end='</form>';
        break;
      case 'tx':
        var start='<textarea',tail='>',end='</textarea>';
        break;
      case 'a':
        var start='<a',tail='>',end='</a>';
        break;
    }
    // Ternary Aviary
    base += start;
    kk.type ? base += ' type="'+kk.type+'"' : '';
    kk.action ? base += ' action="'+kk.action+'"' : '';
    kk.href ? base += ' href="'+kk.href+'"' : '';
    kk.src ? base += ' src="'+kk.src+'"' : '';
    kk.alt ? base += ' alt="'+kk.alt+'"' : '';
    (kk.hw || (kk.height && kk.width)) 
      ? base += ' height="'+kk.hw+'" width="'+kk.hw+'"' 
      : '';
    dd ? base += ' id="'+kk.id+(dd++)+'"' : base += ' id="'+kk.id+'"';
    kk.cls ? base += ' class="'+kk.cls+'"' : '';
    kk.nm ? base += ' name="'+kk.nm+'"' : '';
    kk.vl ? base += ' value="'+kk.vl+'"' : '';
    base += tail;
    kk.con ? base += ''+kk.con+'' : '';
    // Now it gets hairy..
    kk.n ? base += recursiveOptions(kk.n,dd) : '';
    base += end;
  }/*end for obj*/
  return base;
}/*end recursiveOptions*/

var TemplateEngine = function(html, options) {
  if(html === null || !html || (options && typeof options != 'object')) {
    return '';
  } else {
    // can embed code in the template
    var re = /<%(.+?)%>/g,
    // only run the cde that starts like this..
      reExp = /(^\s*(r*\W|con\W|var\W|if\W|for\W|else\W|switch\W|case\W|break\W|{|})).*/g, 
      code = 'var r=[];\n', cursor = 0, match;
    var add = function(line, js) {
      // add HTML fragments and code
      js ? (code += line.match(reExp) 
          ? line + '\n' 
          : 'r.push(escapeText(' + line + '));\n') 
        : (code += line != '' 
            ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' 
            : '');return add;}// end add
    while(match = re.exec(html)) {
      add(html.slice(cursor, match.index))(match[1], true);
      cursor = re.lastIndex;}
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    // concat the HTML fragment array in a returned function.
    // apply the options object as this
    return new Function(code).apply(options);
  }// end main
}// end TemplateEngine
