import { Duplex } from 'stream'
import * as dgram from 'dgram'

export class StreamUDP extends Duplex {
    private socket: dgram.Socket
    private should_read = true
    constructor(socketType: 'udp4' | 'udp6' = 'udp4') {
        super()
        this.socket = dgram.createSocket(socketType)
        this.registerListeners()
    }
    public bind(port: number) {
        this.socket.bind(port)
    }
    public connect(address: string, port: number, callback?: () => void) {
        this.socket.connect(port, address, callback)
    }
    private registerListeners() {
        this.socket.on('message', data => {
            if (this.should_read) this.should_read = this.push(data)
        })
        this.socket.on('error', (err) => {
            console.log('UDPStream error: ' + err)
        })
    }
    _read() { this.should_read = true }
    
    _writev(chunks: { chunk: Buffer | string, encoding: string }[], callback: () => void) {
        let chunksArr: (string | Buffer)[] = chunks.map(a => a.chunk)

        const sendChunk = () => {
            let size = 0
            let i = 0
            if (!chunksArr.length) {
                callback()
                return
            }
            while (size < 1472 && i < chunksArr.length) {
                size += chunksArr[i].length
                i++
            }
            this.socket.send(chunksArr.splice(0, i), (err, bytes) => { sendChunk() })
        }
        sendChunk()
    }
    
   _write(chunk: any, _encoding: BufferEncoding, callback: (error?: Error) => void) {
       this.socket.send(chunk, (err, _bytes) => {callback(err)})
   }
}