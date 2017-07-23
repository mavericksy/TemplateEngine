# TemplateEngine
Basic HTML template engine in Javascript.

TemplateEngine produces simple HTML mark-up from Javascript objects.
The engine can nest tags and fill in most attributes.

As I need the functionality, I will develop the code.

*EXAMPLES:*

```javascript
 var code = '<%r.push(recursiveOptions(this,"1"))%>';
 var temp = {"temp":[
              {"t":"i","type":"button","id":"HELLO","cls":"HELLO","vl":"HELLO"}
            ]};
            
 TemplateEngine(code, temp);
 => Output: <input type="button" id="HELLO1" class="HELLO" value="HELLO">


var code = '<%r.push(recursiveOptions(this,"1"))%>';
var template = {
  temp : [
  // Div with content..
    {t:'d',id:'div',con:'This is div1',n:[
    // with nested form with input and button
      {t:'form',id:'form',n:[
        {t:'i',id:'text',type:'input',nm:'input1',vl:''},
        {t:'i',id:'button',type:'button',nm:'button1',vl:'BUTTON!'}
      ]}
    ]}
  ]
};

TemplateEngine(code, template);
=> Output: 
<div id="div1">This is div1
  <form id="form2">
    <input type="text" id="text3" name="input1" value="">
    <input type="button" id="button4" name="button1" value="BUTTON!">
  </form>
</div>
```

While this may all seem rather redundant, it does fit nicely into my MVC framework.
Hopefully it fits into yours.:w
