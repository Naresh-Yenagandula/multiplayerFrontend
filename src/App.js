import React, { useState } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:8080/');

function App() {
  const [msg, setmsg] = useState()
  const [allMsg, setAllMsg] = useState([])

  socket.on('connect', () => {
    console.log("Connected user ID: ", socket.id);
  })

  socket.on('disconnect', () => {
    console.log("User disconnected");
  })

  socket.on('chat message', (msg) => {
    const temp = [...allMsg]
    temp.push(msg)
    setAllMsg(temp)
  })

  const send = (e) => {
    e.preventDefault()
    socket.emit('chat message', msg);
  }

  return (
    <div>
      <ul>
        {allMsg.map((msg)=>{
          return (
            <li>{msg}</li>
          )
        })}
      </ul>
      <form>
        <input type="text" onChange={e => setmsg(e.target.value)} />
        <button type="submit" onClick={e => send(e)}>Send</button>
      </form>
    </div>
  )
}

export default App
