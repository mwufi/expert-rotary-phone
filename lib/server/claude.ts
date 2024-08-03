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

export async function callClaude(message: string): Promise<string> {
    try {
        const response = await client.messages.create({
            max_tokens: 1024,
            messages: [{ role: 'user', content: message }],
            model: 'claude-3-opus-20240229',
        });

        const blocks = response.content
            .map(block => 'text' in block ? block.text : '')
            .filter(Boolean);

        return blocks.join('\n');
    } catch (error) {
        console.error('Error calling Claude:', error);
        throw new Error('Failed to get response from Claude');
    }
}
