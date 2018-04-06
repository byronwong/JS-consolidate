Events
======
[Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)
[Event Object API](https://developer.mozilla.org/en/docs/Web/API/Event)


Example Code
------------
```html
    <input id="sub1" type="button" value="submit">
```

The Event Object
----------------
TBC


Old school - Handeling Events
-----------------------------
When the example code is clicked:
```javascript
    var button = document.getElementById('sub1');

    button.onclick(foo(event));
    
    function foo(event){
        console.log('clicked!');
        console.log(event.type);
    }
    // clicked!
    // click
```

If we did this:
```javascript
    button.onclick = null;
```
we would be essentailly wiping out our event handler.



Modern best practice - Event listeners
--------------------------------------
This is a better way to do events:
[EventListenerRef](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

```javascript
    var button = document.getElementById('sub1');

    function callbackFn(){
        console.log('clicked!');
        console.log(event.type); // seems event is available
    }

    function callbackFn2(){
        console.log('clicked!');
    }

    button.addEventListener('click', callbackFn);
    button.addEventListener('click', callbackFn2);
```
Here we can add as many event listeners as we want.

Also to remove an event:
```javascript
    button.removeEventListener('click', callbackFn);
```
This is better as we actually have to say which Fn we want to remove.


Event Bubbling 
--------------
TBC

Creating custom events
----------------------
TBC

event.stopPropagation();
event.preventDefault();
button.addEventListener('click', callbackFn, false);