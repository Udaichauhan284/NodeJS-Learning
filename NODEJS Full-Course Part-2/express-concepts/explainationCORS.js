/* 
CORS (Cross-Origin Resource Sharing) is a browser security feature that controls whether a web page from origin A (scheme+host+port) can make request to origin B. Browsers block some corss-orgin requests
by default - the server at origin B must explicity allow the requesting origin (or set of origins) via CORS response headers.

Imaging your frontend runs at http://localhost:3000 and your API runs at http://api.example.com
If your web page (loaded from localhot) does fetch(api.example.com/data) the browser checks CORS:
-> If API responds with Access-Control-Allow-Origin: http://localhost:3000 (or * when allowed) the browser lets the response reach your Javascript.
-> if not, the browser blocks the response and your JS never gets it (you'll see a CORS error in the console).


*/
//Client fetch
//running in the browser (origin http:localhost:3000)
fetch("http://api.example.com/data")
.then(r => r.json())
.then(data => console.log(data))
.catch(err => console.error("request failed: ", err));
//If the API does not send the allow header, browser throws a CORS error and you get no data.

/* 2) Quick rules you must know
-> only browers enforce CORS. Servers/curl/Postman are nor blocked by browers CORS.
-> simple requests (GET/ POST with simple content types like text/plain, application/x-www-form-urlencoded, multipart/form-data) often dont require a preflight (OPTIONS).
-> Preflighted requests: request with custom headers, Content-Type like application/json, or non-simple methods (PUT, DELETE, PATCH) trigger a browser OPTIONS preflight. The browser send OPTIONS and asks the server which methods/headers are allowed before the real request. 
-> Credentials (cookies/auth headers): to send cookies cross-origin you need
Access-Control-Allow-Credentials: true, on the response and you cannot use Access-Control-Allow-Origin : *. The server must 
echo the exact origin.
-> Browser checks both the normal responses headers and preflight response headers.
*/