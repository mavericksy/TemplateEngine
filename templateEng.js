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
  var o,start,end,tail;
  // could be an array or object
  if(obj != null && typeof obj == 'object' && obj.temp)
    o = obj.temp;
  else 
    o = obj;
  for (var k in o){
    var kk = o[k];
    // t: will assign the building blocks
    switch(kk.t){
      case 'd':
        start='<div';tail = '>';end = '</div>';
        break;
      case 'i':
        start='<input';tail = '>';end = '';
        break;
      case 'img':
        start='<img';tail='>';end='';
        break;
      case 'form':
        start='<form';tail='>';end='</form>';
        break;
      case 'tx':
        start='<textarea';tail='>';end='</textarea>';
        break;
      case 'a':
        start='<a';tail='>';end='</a>';
        break;
    }

    // Ternary Aviary
    base += start;
    base += (kk.type) ? ' type="'+kk.type+'"' : '';
    base += (kk.style) ? ' style="'+kk.style+'"' : '';
    base += (kk.action) ? ' action="'+kk.action+'"' : '';
    base += (kk.href) ? ' href="'+kk.href+'"' : '';
    base += (kk.src) ? ' src="'+kk.src+'"' : '';
    base += (kk.alt) ? ' alt="'+kk.alt+'"' : '';
    base += (kk.hw || (kk.height && kk.width)) ? 
              ' height="'+(kk.hw ? kk.hw : kk.height)+
              '" width="'+(kk.hw ? kk.hw : kk.width)+'"' : '';
    base += (kk.id) ? ' id="'+kk.id+((dd) ? dd++ : '')+'"' : '';
    base += (kk.cls) ? ' class="'+kk.cls+'"' : '';
    base += (kk.nm) ? ' name="'+kk.nm+'"' : '';
    base += (kk.vl) ? ' value="'+kk.vl+'"' : '';
    base += (kk.sz) ? ' size="'+kk.sz+'"' : '';
    base += (kk.placeholder) ? ' placeholder="'+kk.placeholder+'"' : '';
    base += tail;
    base += (kk.con) ? ''+kk.con+'' : '';
    // Now it gets hairy..
    base += (kk.n) ? recursiveOptions(kk.n,dd) : '';
    base += end;
  }/*end for obj*/
  return base;
}/*end recursiveOptions*/

var TemplateEngine = function(html, options) {
  if(html === null || !html || (options && typeof options != 'object')) {
    return '';
  } else {
    // can embed code in the template
    // between <% [code] %> tags.
    var re = /<%(.+?)%>/g,
    // only run the code that starts like this..
      reExp = /(^\s*(r*\W|con\W|var\W|if\W|for\W|else\W|switch\W|case\W|break\W|{|})).*/g, 
      code = 'var r=[];\n', cursor = 0, match;
    var add = function(line, js) {
      // add HTML fragments and code
      // if the line matched with <% %>
      // then add to function executable
      code += (js) ? ((line.match(reExp)) ? 
          line + '\n' : 
          // else add to array. re and reExp matching fault.
          'r.push(escapeText(' + line + '));\n') : 
        ((line != '') ?
         // if not js code else escape the tag quotes and add to array.
         'r.push("' + line.replace(/"/g, '\\"') + '");\n' : 
         '');return add;};// end add
    while((match = re.exec(html))) {
      add(html.slice(cursor, match.index))(match[1], true);
      cursor = re.lastIndex;}
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    // concat the HTML fragment array.
    // apply the options object as this.
    // and run all relevant code that was added.
    return Function(code).apply(options);
  }// end main
};// end TemplateEngine
