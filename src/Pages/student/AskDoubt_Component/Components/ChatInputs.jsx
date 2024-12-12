'use client'

import { SendHorizontal } from 'lucide-react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSocket } from '@/Config/SocketConfig'



export function ChatInput({ onSend }) {
  const [message, setMessage] = useState('')
  const { isConnected } = useSocket()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSend(message)
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex gap-2">
        <Input
          placeholder="Type something here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!isConnected}
          className="h-10 bg-white"
        />
        <Button type="submit" size="icon" disabled={!isConnected || !message.trim()}>
          <SendHorizontal className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>
  )
}

