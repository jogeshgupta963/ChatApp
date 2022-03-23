import React, { Fragment, useEffect, useState } from 'react';
import Chat from './components/Chat'
import './App.css';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:80/')


function App() {

  const [name, setName] = useState("")
  const [room, setRoom] = useState("")
  const [join, setJoin] = useState(0)


  const nameChangeHandle = (e) => {
    try {
      setName(e.target.value)
    } catch (error) {
      console.log(error.message)
    }
  }
  const roomChangeHandle = (e) => {
    try {
      setRoom(e.target.value)
    } catch (error) {
      console.log(error.message)
    }
  }

  const joinClickHandle = (e) => {
    e.preventDefault();
    setJoin(1);
    if (room !== "" && name !== "") {
      socket.emit('join_room', { name, room })
    }
    console.log('clicked button')
  }

  return (
    <Fragment>
      <div className="App">
        {join === 0 && <div className="joinChatContainer">
          <h1>Join A Room</h1>
          <input type="text" placeholder='name...' onChange={nameChangeHandle} />
          <input type="text" placeholder='Room Id...' onChange={roomChangeHandle} />
          <button className="enterRoom" onClick={joinClickHandle}>Join</button>
        </div>}
        {join === 1 && <Chat socket={socket} name={name} room={room} />}
        {/* <Chat socket={socket} name={name} room={room} /> */}
      </div>
    </Fragment>
  );
}

export default App;
