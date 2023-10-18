import  OpenAIModel  from './openai';

import { OPENAI_API_HOST, OPENAI_API_TYPE, DEFAULT_SYSTEM_PROMPT, OPENAI_ORGANIZATION, DEFAULT_TEMPERATURE } from '@/utils/const';
import {
    ParsedEvent,
    ReconnectInterval,
    createParser,
  } from 'eventsource-parser';

export const config = {
    runtime: 'edge',
};



const handler = async (req: Request): Promise<Response> => {
    try {
        let body = await req.json();
        const { model, messages, key, temperature } = body;
        let url = `${OPENAI_API_HOST}/v1/chat/completions`;
        console.log(url);
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...(OPENAI_API_TYPE === 'openai' && {
                    'Authorization': `Bearer ${key ? key : process.env.OPENAI_API_KEY}`
                }),
                ...(OPENAI_API_TYPE === 'azure' && {
                    'api-key': `${key ? key : process.env.OPENAI_API_KEY}`
                }),
                ...((OPENAI_API_TYPE === 'openai' && OPENAI_ORGANIZATION) && {
                    'OpenAI-Organization': OPENAI_ORGANIZATION,
                }),
            },
            method: 'POST',
            body: JSON.stringify({
                model: model? model : 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: DEFAULT_SYSTEM_PROMPT,
                    },
                    ...messages,
                ],
                max_tokens: 1000,
                temperature: temperature? temperature : DEFAULT_TEMPERATURE,
                stream: true,
            }),
        });

        console.log("decoding");
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        if (res.status !== 200) {
            const result = await res.json();
            if (result.error) {
                throw new OpenAIError(
                    result.error.message,
                    result.error.type,
                    result.error.param,
                    result.error.code,
                );
            } else {
                throw new Error(
                    `OpenAI API returned an error: ${decoder.decode(result?.value) || result.statusText
                    }`,
                );
            }
        }

        const stream = new ReadableStream({
            async start(controller) {
                const onParse = (event: ParsedEvent | ReconnectInterval) => {
                    if (event.type === 'event') {
                        const data = event.data;

                        try {
                            const json = JSON.parse(data);
                            if (json.choices[0].finish_reason != null) {
                                controller.close();
                                return;
                            }
                            const text = json.choices[0].delta.content;
                            const queue = encoder.encode(text);
                            controller.enqueue(queue);
                        } catch (e) {
                            controller.error(e);
                        }
                    }
                };

                const parser = createParser(onParse);

                for await (const chunk of res.body as any) {
                    parser.feed(decoder.decode(chunk));
                }
            },
        });

        return new Response(stream);
    } catch (error) {
        console.error(error);
        if (error instanceof OpenAIError) {
            return new Response('Error', { status: 500, statusText: error.message });
        } else {
            return new Response('Error', { status: 500 });
        }
    }
}

export class OpenAIError extends Error {
    type: string;
    param: string;
    code: string;

    constructor(message: string, type: string, param: string, code: string) {
        super(message);
        this.name = 'OpenAIError';
        this.type = type;
        this.param = param;
        this.code = code;
    }
}


export default handler;