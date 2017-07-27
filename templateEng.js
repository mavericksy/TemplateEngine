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

// Tag identifier and bits
function getBlob(kk){
    switch(kk){
      case 'd': case 'div': case 'dv':/**/s='<div';t = '>';e = '</div>';
        break;
      case 'i':case 'input':case 'in':/**/s='<input';t = '>';e = '';
        break;
      case 'img':case 'image':case 'im':/**/s='<img';t='>';e='';
        break;
      case 'f':case 'fm':case 'frm':case 'form':/**/s='<form';t='>';e='</form>';
        break;
      case 'tx':case 'tex':case 'ta':/**/s='<textarea';t='>';e='</textarea>';
        break;
      case 'a':case 'link':case 'lk':case 'lnk':/**/s='<a';t='>';e='</a>';
        break;
      case 'h2':case 'big':case '2':/**/s='<h2>';t='';e='</h2>';
        break;
      case 'p':case 'para':/**/s='<p>';t='';e='</p>';
        break;
      default:
        return undefined;
    }
    return {start:s,tail:t,end:e};
}

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
  var blob;
  for (var k in obj){

    var kk = obj[k];
    // t: will assign the building blocks
    if(!(blob = getBlob(kk.t))) return '';

    var inc = function(){
      if(dd) return dd++;
      else return '';
    };// end inc()

    // Map the objects to the tags
    base += blob.start;

    $.map(kk,function(val,key){
      if(!(key=='con'||key=='n'||key=='t')){
        base += (key=='id') ? ' '+key+'="'+val+inc()+'"' : 
          ' '+key+'="'+val+'"' ;
      }
    });// end $.map()

    base += blob.tail;
    base += (kk.con) ? ''+kk.con+'' : '';
    // Now it gets hairy..
    base += (kk.n) ? recursiveOptions(kk.n,dd) : '';
    base += blob.end;
  }/*end for obj*/
  return base;
}/*end recursiveOptions*/

var TemplateEngine = function(html) {
  if(html === null || !html || html === undefined || typeof html == 'string') {
    return '';
  } else {
    var _id;
    if(html._id === true) _id = 1; 
    return recursiveOptions(html.temp,_id);
  }// end main
};// end TemplateEngine
