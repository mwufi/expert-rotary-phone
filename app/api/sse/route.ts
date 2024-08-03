import { NextResponse } from 'next/server';
import { callClaude } from '@/lib/server/claude';

// This is required to enable streaming
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    const { prompt } = await request.json();

    if (!prompt) {
        return new Response('Prompt is required', { status: 400 });
    }

    const stream = new ReadableStream({
        async start(controller) {
            try {
                await callClaude(prompt, (message) => {
                    controller.enqueue(message);
                });
                controller.close();
            } catch (error) {
                console.error('Error in streaming:', error);
                controller.error(error);
            }
        }
    });

    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            'Content-Encoding': 'none',
            'Connection': 'keep-alive',
        },
    });
}