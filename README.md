# StreamUDP

![npm](https://img.shields.io/npm/v/stream-udp)
[![Build Status](https://travis-ci.org/ferrohd/StreamUDP.svg?branch=master)](https://travis-ci.org/ferrohd/StreamUDP)

Blazing-fast Node Stream implementation over UDP. You can *stream* your Stream using UDP protocol.
## Install
`npm i stream-udp`
## Usage
Typescript:
```typescript
import { StreamUDP } from 'stream-udp'

// Create a new UDPStream socket instance
let socket = new StreamUDP()

// Connect to another StreamUDP socket (just as a UDP socket)
socket.connect('localhost', 42069)

// Now you can send data...
ABeautifuldReadableStream.pipe(socket)

// ...Or receive it
socket.pipe(CoolWritableStream)
```
Javascript:
```javascript
const streamSocket = require('stream-udp')

// Create a new UDPStream socket instance
let socket = new streamSocket.StreamUDP()

// Connect to another StreamUDP socket (just as a UDP socket)
socket.connect('localhost', 42069)

// Now you can send data...
ABeautifuldReadableStream.pipe(socket)

// ...Or receive it
socket.pipe(CoolWritableStream)
```
> Reminder: UDP is a connectionless protocol which means there **are no clients or servers**. It's just two socket sending data to each other, without retrasmission nor datagram reordering.

## API
StreamUDP Class extends [Duplex Stream](https://nodejs.org/api/stream.html "Node Documentation") so you can call all of its methods.
| Method                                          | Description                                     |
| ----------------------------------------------- | ----------------------------------------------- |
| bind(port: number)                              | Bind the underlying socket to the provided port |
| connect(address:string, port: number, callback) | Connect the socket                              |


## Contributing
Feel free to contribute, just open a PR. I apologize for any errors but this is my first repo of a public NPM Pakckage, also english is not my first tongue.