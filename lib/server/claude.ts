/*
sample claude api call
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: 'my_api_key', // defaults to process.env["ANTHROPIC_API_KEY"]
});

const msg = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20240620",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, Claude" }],
});
console.log(msg);

*/

'use server'

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export async function getTestResponse() {
    const message = await client.messages.create({
        max_tokens: 1024,
        messages: [{ role: 'user', content: 'Hello, Claude' }],
        model: 'claude-3-opus-20240229',
    });

    const blocks = message.content.map((block) => {
        if ('text' in block) {
            return block.text;
        } else {
            console.log('non text block', block);
        }
        return '';
    }).filter(Boolean);

    return blocks.join('\n');
}

export async function callClaude(message: string): Promise<void> {
    console.log("Called with", message);

    try {
        const stream = await client.messages.create({
            max_tokens: 1024,
            messages: [{ role: 'user', content: message }],
            model: 'claude-3-opus-20240229',
            stream: true,
        });

        for await (const chunk of stream) {
            if(chunk.type === "content_block_delta") {
                console.log(chunk.delta.text)
                // push to client
                pushToClient(chunk.delta.text)
            }
        }
    } catch (error) {
        console.error('Error calling Claude:', error);
        throw new Error('Failed to get response from Claude');
    }
}

// Example implementation of pushToClient using Server-Sent Events (SSE) in Next.js App Router

import { NextResponse } from 'next/server';

let clients: Set<ReadableStreamDefaultController> = new Set();

export function pushToClient(message: string) {
    clients.forEach(client => {
        client.enqueue(`data: ${JSON.stringify({ message })}\n\n`);
    });
}

export async function GET() {
    const stream = new ReadableStream({
        start(controller) {
            clients.add(controller);
        },
        cancel() {
            clients.delete(this);
        },
    });

    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    });
}

// Tutorial: Implementing Server-Sent Events (SSE) in Next.js App Router

// 1. Create an API route for SSE:
//    Create a file named `app/api/sse/route.ts` with the following content:
//    
//    ```typescript
//    import { GET } from '@/lib/server/claude';
//    
//    export { GET };
//    ```

// 2. Update your client-side code to connect to the SSE endpoint:
//    In your React component (e.g., app/(prompts)/prompts/play/page.tsx):
//
//    ```typescript
//    import { useEffect, useState } from 'react';
//
//    export default function PromptPlayground() {
//      const [messages, setMessages] = useState<string[]>([]);
//
//      useEffect(() => {
//        const eventSource = new EventSource('/api/sse');
//        
//        eventSource.onmessage = (event) => {
//          const data = JSON.parse(event.data);
//          setMessages(prev => [...prev, data.message]);
//        };
//
//        return () => {
//          eventSource.close();
//        };
//      }, []);
//
//      // Rest of your component code...
//    }
//    ```

// 3. Use the pushToClient function in your callClaude function:
//    Update the callClaude function to use pushToClient:
//
//    ```typescript
//    export async function callClaude(message: string): Promise<void> {
//      // ... existing code ...
//
//      for await (const chunk of stream) {
//        if(chunk.type === "content_block_delta") {
//          console.log(chunk.delta.text)
//          pushToClient(chunk.delta.text)
//        }
//      }
//
//      // ... rest of the function ...
//    }
//    ```

// This implementation allows real-time updates from the server to the client
// using Server-Sent Events, which is well-suited for streaming responses from Claude.
