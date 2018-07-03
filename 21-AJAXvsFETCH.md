
AJAX vs FETCH
=============
[Fetch vs Ajax](https://davidwalsh.name/fetch)
[http sandbox](https://httpbin.org/)

## AJAX implementation
```js
  // Just getting XHR is a mess!
  if (window.XMLHttpRequest) { // Mozilla, Safari, ...
    request = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // IE
    try {
      request = new ActiveXObject('Msxml2.XMLHTTP');
    } 
    catch (e) {
      try {
        request = new ActiveXObject('Microsoft.XMLHTTP');
      } 
      catch (e) {}
    }
  }

  // Open, send.
  request.open('GET', 'https://davidwalsh.name/ajax-endpoint', true);
  request.send(null);
```


## Fetch
```js 
  // url (required), options (optional)
  fetch('https://davidwalsh.name/some/url', {
    method: 'get'
  })
  .then(function(response) {
    ...
    // Convert to JSON
    return response.json();
    // Of course that's a simple JSON.parse(jsonString), but the json method is a handy shortcut.
  })
  .catch(function(err) {
    // Error :(
  });
```

### Components of Fetch
[API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- request - https://developer.mozilla.org/en-US/docs/Web/API/Request
- response - https://developer.mozilla.org/en-US/docs/Web/API/Response
- header - https://developer.mozilla.org/en-US/docs/Web/API/Headers
- body - https://developer.mozilla.org/en-US/docs/Web/API/Body
