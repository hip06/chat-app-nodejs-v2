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
    users = users.filter(item => item.socketId !== socketId)
}
const getUser = (userId) => {
    return users.find(item => item.userId === userId)
}

// handle with socket
io.on('connection', (socket) => {

    // mỗi khi user online thì mới thực hiện xử lí
    socket.on('online', (data) => {
        addUser({ ...data, socketId: socket.id })
        console.log(users);
        //  xử lí thông báo kết bạn
        socket.on('reqAddFriend', (payload) => {
            let receiver = getUser(payload.friendId)
            if (receiver) {
                socket.to(receiver.socketId).emit('addFriendOnline', { ...payload, status: 'online' })
            } else {
                socket.emit('addFriendOffline', { ...payload, status: 'offline' })
            }
        })
    })


    // xóa user khỏi mảng user online
    socket.on('disconnect', () => { removeUser(socket.id) })
})

