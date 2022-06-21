import { Server } from "socket.io";
import dotenv from 'dotenv'
dotenv.config()

// create socket server
const io = new Server(process.env.PORT_SOCKET_SERVER, {
    cors: {
        origin: process.env.REACT_APP_URL
    }
})
console.log('Socket running...');
// list connected users
let users = []

const addUser = (data) => {
    !users.some(item => item.userId === data.userId) && users.push(data)
}
const removeUser = (socketId) => {
    users.filter(item => item.socketId !== socketId)
}
const getReceiver = (userId) => {
    console.log(users);
    console.log(userId);
    return users.find(item => item.userId === userId)
}

// handle with socket
io.on('connection', (socket) => {

    // mỗi khi user online thì mới thực hiện xử lí //
    socket.on('online', (data) => {
        addUser({ ...data, socketId: socket.id })
        console.log(users);
        socket.on('addFriend', (payload) => {
            console.log(getReceiver(payload.friendId))
        })
    })



    socket.on('disconnect', () => {
        removeUser(socket.id)
    })
})

