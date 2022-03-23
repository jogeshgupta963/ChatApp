import React, { Fragment, useState, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
function Chat({ socket, name, room }) {

    const [input, setInput] = useState("")
    const [messageList, setMessageList] = useState([])

    const inputMsgChangeHandle = e => {
        setInput(e.target.value)
    }
    const clickHandle = async (e) => {
        e.preventDefault();

        if (input !== "") {
            const msgData = {
                room: room,
                author: name,
                message: input,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit('send_message', msgData)
            setMessageList(list => [...list, msgData])
            setInput("")
        }

    }
    useEffect(() => {
        socket.on('recieve_message', data => {
            // let list = [...messageList, data];
            setMessageList(list => [...list, data])
            // console.log(messageList)
        })
    }, [socket])
    return (
        <Fragment>
            <div className='chat-window'>
                <div className="chat-header">Live Chat</div>


                <div className="chat-body">
                    <ScrollToBottom className="message-container">
                        {messageList.map(msg => {
                            return <div className='message' id={name !== msg.author ? 'you' : 'other'}>
                                <div>
                                    <div className="message-content">
                                        <p>{msg.message}</p>
                                    </div>
                                    {/* <div className="message-content">
                                        <p >{msg.time}</p>
                                        <p >{msg.author}</p>
                                    </div> */}
                                    <div >
                                        <p id="time">{msg.time}</p>
                                        <p id="author">{msg.author}</p>
                                    </div>
                                </div>
                            </div>
                        })}
                    </ScrollToBottom>

                </div>


                <div className="chat-footer">
                    <input type="text" value={input} placeholder='heyy...' onChange={inputMsgChangeHandle} />
                </div>
                <button className="btn-send" onKeyPress={e => { if (e.key === 'Enter') clickHandle() }} onClick={clickHandle}>▶️</button>
            </div>
        </Fragment>
    )
}

export default Chat