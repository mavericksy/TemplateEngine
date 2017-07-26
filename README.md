# TemplateEngine
Basic HTML template engine in Javascript.

TemplateEngine produces simple HTML mark-up from Javascript objects.
The engine can nest tags and fill in most attributes.

As I need the functionality, I will develop the code.

**USAGE:**

The engine works like this:
 A variable holding an object with a temp property filled with objects that represent HTML tags, 
 is fed to a recursive function that builds the html tags and nests the relevant children.
 
 The object of objects take the form of ``var temp = {temp:[{'t':'','id':'',...},{...}]}`` etc...
 
 The 't' property in each object is mandatory as it identifies the tag to be used during the build.
 An id, while not mandatory, is the best way to mark tags for JQuery manipulation or for CSS.
 
 All other HTML attributes can be added to the object which represents the tag, and the engine will fill those in as written. So care must be taken when creating tag objects as they are verbatim to what the engine will create.
 
 The temp variable, holding the objects, is fed to a recursive function that is then returned from the template engine and eval'ed to create the actual HTML.
 
 The code to run the template looks like this: ``var code = '<%r.push(recursiveOptions(this.temp))%>'``
 An optional second argument is used to create sequential ID's for the id attribute value of each tag.
 ie. ``var code = '<%r.push(recursiveOptions(this.temp, "0"))%>'`` would ensure the first tag met with an ID will have a zero appended to the ID attribute value.. id="someID0", followed by id="someID1" in the next tag met by the engine.

*EXAMPLES:*

```javascript
 var code = '<%r.push(recursiveOptions(this.temp,"1"))%>';
 var temp = {"temp":[
              {"t":"i","type":"button","id":"HELLO","class":"HELLO","value":"HELLO"}
            ]};
            
 TemplateEngine(code, temp);
 => Output: <input type="button" id="HELLO1" class="HELLO" value="HELLO">


var code = '<%r.push(recursiveOptions(this.temp,"1"))%>';
var template = {
  temp : [
  // Div with content..
    {t:'d',id:'div',con:'This is div1',n:[
    // with nested form with input and button
      {t:'form',id:'form',n:[
        {t:'i',id:'text',type:'input',name:'input1',value:''},
        {t:'i',id:'button',type:'button',name:'button1',value:'BUTTON!'}
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
