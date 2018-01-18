# TemplateEngine
Basic HTML template engine in Javascript.

TemplateEngine produces simple HTML mark-up from Javascript objects.
The engine can nest tags and fill in most attributes.

As I need the functionality, I will develop the code.

**USAGE:**

The engine works like this:
 A variable holding an object with a temp property filled with objects that represent HTML tags, 
 is fed to a recursive function that builds the html tags and nests the relevant children.
 
 The object of objects take the form of ``var temp = {_id:true,temp:[{'t':'p','id':'',...},{...}]}`` etc...
 
 The ```_id:true``` property will append sequential numbers to the tag id's when set to true. This would ensure the first tag met with an ID will have a ONE appended to the ID attribute value.. id="someID1", followed by id="someID2" on the next tag id met by the engine.
 
 The ```t:``` property in each object is mandatory as it identifies the tag to be used during the build.
 An id, while not mandatory, is the best way to mark tags for JQuery manipulation or for CSS.
 
 The ```con:``` property can contain content for the given tag.. set between the opening and closing tags.
 
 All other HTML attributes can be added to the object which represents the tag, and the engine will fill those in as written. So care must be taken when creating tag objects as they are verbatim to what the engine will create.
 
 The temp variable, holding the objects, is fed to a recursive function that is then returned from the template engine whole and nested.

*EXAMPLES:*

```javascript
 var temp = {"_id":true,
             "temp":[
              {"t":"i","type":"button","id":"HELLO","class":"HELLO","value":"HELLO"}
            ]};
            
 TemplateEngine(temp);
 => Output: <input type="button" id="HELLO1" class="HELLO" value="HELLO">


var template = {
  _id:true,
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

TemplateEngine(template);
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
