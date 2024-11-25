'use client'

import React, { useEffect, useState, useRef } from 'react'

type Message = {
  id: string
  text: string
  sender: string
}

type User = {
  id: number
  name: string
}

export default function ChatAppTester() {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
  ])
  const [activeUser, setActiveUser] = useState<User>(users[0])
  const lastMessageRef = useRef<string | null>(null)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')

    ws.onopen = () => {
      console.log("Connected to WebSocket server")
      setSocket(ws)
    }

    ws.onmessage = (event) => {
      const messageData = event.data
      if (messageData !== lastMessageRef.current) {
        const [sender, text] = messageData.split(': ', 2)
        const newMessage: Message = { 
          id: `${Date.now()}-${Math.random()}`,
          text, 
          sender 
        }
        setMessages(prevMessages => [...prevMessages, newMessage])
        lastMessageRef.current = messageData
      }
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    ws.onclose = () => {
      console.log('WebSocket connection closed')
    }

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close()
      }
    }
  }, [])

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (socket && inputMessage) {
      const message = `${activeUser.name}: ${inputMessage}`
      socket.send(message)
      setInputMessage('')
    }
  }

  const addUser = () => {
    const newUser = { id: users.length + 1, name: `User ${users.length + 1}` }
    setUsers(prevUsers => [...prevUsers, newUser])
  }

  if (!socket) {
    return <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Connecting to server...</h1>
    </div>
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat App Tester</h1>
      
      <div className="flex mb-4 space-x-2">
        {users.map(user => (
          <button
            key={user.id}
            onClick={() => setActiveUser(user)}
            className={`px-3 py-1 rounded ${activeUser.id === user.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {user.name}
          </button>
        ))}
        <button onClick={addUser} className="px-3 py-1 rounded bg-green-500 text-white">
          Add User
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto mb-4 border rounded p-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-2 ${msg.sender === activeUser.name ? 'text-right' : 'text-left'}`}>
            <span className="font-bold">{msg.sender}: </span>
            {msg.text}
          </div>
        ))}
      </div>
      
      <form onSubmit={sendMessage} className="flex">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Type a message as ${activeUser.name}...`}
          className="flex-grow p-2 border rounded-l"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          Send
        </button>
      </form>
    </div>
  )
}