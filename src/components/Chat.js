import React, { useState } from 'react'
import { socket } from './Home'

function Chat() {
    const [connectedUsers, setconnectedUsers] = useState([])
    const [messages, setmessages] = useState([])
    const [currentMsg, setcurrentMsg] = useState()
    const room = localStorage.getItem('room')

    socket.on('message', (msg) => {
        const temp = [...connectedUsers]
        temp.push(msg)
        setconnectedUsers(temp)
    })

    socket.on('chat message',(msg)=>{
        const temp =[...messages]
        temp.push({receiver:true,msg})
        setmessages(temp)
    })

    const send = (e) => {
        e.preventDefault()
        const temp = [...messages]
        temp.push({ msg: currentMsg })
        setmessages(temp)
        document.getElementById("message").value=""
        socket.emit('chat message',{room:room,msg:currentMsg})
    }
    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card">
                    <div className="card-header">
                        <h4>CHAT APPLICATION</h4>
                    </div>
                    <div className="card-body">
                        <div className="message-section">
                            <div className="text-center">
                                {connectedUsers.map((user) => {
                                    return (
                                        <p className="joined-message">{user}</p>
                                    )
                                })}
                            </div>
                            <div>
                                {messages.map((msg) => {
                                    return (
                                        <div className="clearfix">
                                            <p className={msg.receiver?'message-receiver':'message-sender'}>{msg.msg}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <form>
                            <div className="input-group">
                                <input type="text" placeholder="Type message here" name="" id="message" className="form-control" onChange={e => setcurrentMsg(e.target.value)} />
                                <button className="btn btn-primary" onClick={e => send(e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-up-right-circle" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.854 10.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
