/*
Here we use the path, to determine the dirname, filename and join paths also
resolve path also manby more
*/

const path = require("path");

console.log("Directory name: ", path.dirname(__filename));

console.log("File name: ", path.basename(__filename));

console.log("file extension", path.extname(__filename));

const joinPath = path.join("/user", "documents", "node", "projects");
console.log("Joined path", joinPath);

const resolvePath = path.resolve("user", "documents", "node", "projects");
console.log("Resolve Path: ", resolvePath);

const normalizePath = path.normalize("/user/..documents/../node/projects");
console.log("NormalizePath", normalizePath);