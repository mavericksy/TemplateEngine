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
  if(obj === null || obj === undefined || obj === false || Object.keys(obj).length === 0) return '';
  var base = '';
  var start,end,tail;
  for (var k in obj){
    var kk = obj[k];
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

    var inc = function(){
      if(dd) return dd++;
      else return '';
    };

    // Map the objects to the tags
    base += start;
    var a = $.makeArray(kk);
    kk = a[0];
    $.map(kk,function(val,key){
      if(key=='con'||key=='n'||key=='t'){key=null;val=null;}
      if(key != null && val != null){
        base += (key=='id') ? ' '+key+'="'+val+inc()+'"' : 
          ' '+key+'="'+val+'"' ;
      }
    });
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
      // add HTML fragments and code.
      // if the line matched with <% %>
      //+then add to function executable
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
    // apply the options object as this
    //+and run all code that was added.
    return Function(code).apply(options);
  }// end main
};// end TemplateEngine
