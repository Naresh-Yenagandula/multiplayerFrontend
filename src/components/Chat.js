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
        const scroll = document.getElementById("scroll")
        scroll.scrollTop = scroll.scrollHeight
        console.log(scroll.scrollTop);
    }
    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card">
                    <div className="card-body">
                        <div className="message-section" id="scroll">
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
                    <div className="mx-3 mb-3 shadow-sm">
                        <form>
                            <div className="input-group">
                                <input type="text" placeholder="Type message here" name="" id="message" className="form-control" onChange={e => setcurrentMsg(e.target.value)} />
                                <button className="btn btn-primary" onClick={e => send(e)}>
                                   Send
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
