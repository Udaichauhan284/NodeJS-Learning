/* Node.js Streams
Node.js streams are a key part of handling I/O operations efficiently. They provide a way to read or write data continously, allowing for efficient data processing,
manipulation, and transfer.

The stream moduel in Node.js provides an abstraction for working with streaming
data. Streams are a powerful feature that 
allows handling data in chunks rather than
loading it all at once, which is efficient 
for both memory usage and performance. 

Types of Streams in Node.js
1. Writable: We can write data to these stream. e.g. fs.createWriteStream().
2. Readable: We can read data from these sream. e.g., fs.createReadStream().
3. Duplex: Streams that are both, Writable as well as Readable. e.g. net.socket.
4. Transform: Streams that can modfiy or transform the data as it is written and read. e.g. zlib.createDeflate.
*/

//Implementing a Readable Stream.
const {Readable} = require('stream');
//reading the data
const inStream = new Readable({
    read() {}
});

//Pushing the data to the stream
inStream.push('GeeksforGeeks : ');
inStream.push('A good portal to read');

//indicates that no more data is left in the stream
inStream.push(null);

//Echoing data to the Standard output
inStream.pipe(process.stdout);


//Implementing the writable
const {Writable} = require('stream');

//whatever is passed in standard input is out streamed here.
const outStream = new Writable({
    //The write function takes three arguments, chunk is for buffer
    //Encoding is used in case we want to configure the stream differently.
    //In this sample code, Encoding is ignored callbacks is used to indicate successful execution
    write(chunk, encoding, callback){
        console.log(chunk.toString());
        callback();
    } 
});

//process.stdin.pipe(outStream);

const fs = require("fs");
const zlib = require("zlib");
const crypto = require('crypto');
const {Transform} = require('stream');

class EncryptStream extends Transform {
    constructor(key, vector){
        super();
        this.key = key;
        this.vector = vector;
    }

    _transform(chunk, encoding, callback){
        const ciper = crypto.createCipheriv('aes-256-cbc', this.key, this.vector);
        const encrypted = Buffer.concat([ciper.update(chunk), ciper.final()]) //encrypted
        this.push(encrypted);
        callback();
    }
}
const key = crypto.randomBytes(32);
const vector = crypto.randomBytes(16);

const readableStream = fs.createReadStream('input.txt');

//now gzip object to compress the stream of data
const gzipStream = zlib.createGzip();
const encryptedStream = new EncryptStream(key, vector);

const writableStream = fs.createWriteStream('output.txt.gz.enc');

//read -> compress -> encrypt -> write
readableStream.pipe(gzipStream).pipe(encryptedStream).pipe(writableStream);

console.log('Streaming -> compressing -> writing data: ', )