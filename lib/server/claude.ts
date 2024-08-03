'use server'

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export type ClaudeSettings = {
    max_tokens: number;
    model: string;
    stream: boolean;
};

const defaultSettings: ClaudeSettings = {
    max_tokens: 4096,
    model: 'claude-3-5-sonnet-20240620',
    stream: true,
};

export async function callClaude(
    message: string,
    pushToClient: (text: string) => void,
    customSettings?: Partial<ClaudeSettings>
): Promise<void> {
    console.log("Called with", message);

    const settings: ClaudeSettings = {
        ...defaultSettings,
        ...customSettings
    };

    try {
        const stream = await client.messages.create({
            ...settings,
            messages: [{ role: 'user', content: message }],
        });

        for await (const chunk of stream) {
            if (chunk.type === "content_block_delta" && 'text' in chunk.delta) {
                pushToClient(chunk.delta.text);
            }
        }
    } catch (error) {
        console.error('Error calling Claude:', error);
        throw new Error('Failed to get response from Claude');
    }
}
