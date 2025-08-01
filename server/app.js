import Express from 'express'
import { WebSocketServer } from 'ws'
import Http from 'http'
import Path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

const app = Express()
const server = Http.createServer(app)
const wsServer = new WebSocketServer({server})

const port = 3000

app.use(Express.static(Path.join(__dirname,'../client')))

app.get('/', (req,res) => {
    res.sendFile(__dirname, '../client/index.html')
})

wsServer.on('connection', (ws) => {
    console.log("Un nouveau client est connecté")

    ws.on('message', (message) => {
        const msgreçu = message.toString()  
        console.log(`Message du client 😀: \n\t${msgreçu} !`)

        //renvoie du message
        ws.send(`Message renvoyer au client 😎: \n\t${msgreçu} !`)
        console.log(`Message renvoyer au client : \n\t${msgreçu} !`)
    })

    ws.on('close', (ws) => {
        console.log("Client déconnecté 😓 !")
    })

    ws.on('error', (error) => {
        console.error(`Erreur WebSocket 😵: \n\t${error.message}`);
    });
})

server.listen(port, () => {
    console.log(`Serveur HTTP et WebSocket démarré sur le port ${port}`);
    console.log(`Accédez à l'application via : http://localhost:${port}`);
})