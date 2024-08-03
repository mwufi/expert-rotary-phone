
export interface InputVariable {
    name: string;
    type: 'string' | 'number' | 'boolean';
    description?: string;
}

export interface Prompt {
    name: string;
    template: string;
    inputVariables: InputVariable[];
}

export interface FetchedPrompt {
    id: string;
    name: string;
    prompt_template: string;
    variables: {
        name: string;
        type: 'string' | 'number' | 'boolean';
        currentValue: string | number | boolean;
    }[];
    formatted_prompt: string;
    current_output: string;
    createdAt: number;
}