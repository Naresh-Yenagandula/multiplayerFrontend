import React, { useState } from 'react';
import { io } from 'socket.io-client';
export const socket = io(process.env.REACT_APP_BACKEND_URL);

function Home(props) {
    const [info, setinfo] = useState()

    socket.on('connect', () => {
        console.log("Connected user ID: ", socket.id);
    })

    socket.on('disconnect', () => {
        console.log("User disconnected");
    })

    const send = () => {
        socket.emit('join', info);
        localStorage.setItem('room',info.room)
        props.history.push('/chat')
    }
    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card px-3 pb-2">
                    <div className="text-center pt-3">
                        <h4>JOIN CHAT</h4>
                    </div>
                    <div className="card-body">
                        <div className="mb-2">
                            <label htmlFor="name" className="form-label">Display Name:</label>
                            <input type="text" name="" id="name" className="form-control" onChange={e => setinfo({ ...info, name: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="room" className="form-label">Room Name:</label>
                            <input type="text" name="" id="room" className="form-control" onChange={e => setinfo({ ...info, room: e.target.value })} />
                        </div>
                    </div>
                    <div className="text-center p-2">
                        <button className="btn btn-primary w-100" onClick={() => send()}>JOIN</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
