import { useCallback, useEffect, useState } from 'react';

// 使用方法
const model = 'gpt-3.5-turbo'; 
const messages = [                    {
    role: 'user',
    content: 'just say this is a test',
}]; 
const key = null; 
const prompt = 'say just a test'; 
const temperature = 0.7; 

export default function StreamTest() {
    const [content, setContent] = useState('');
    const handleSend = useCallback(
        async () => {
            console.log(JSON.stringify({
                model,
                messages,
                key,
                prompt,
                temperature,
            }));
            const controller = new AbortController();
            const response = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: controller.signal,
                body: JSON.stringify({
                    model,
                    messages,
                    key,
                    prompt,
                    temperature,
                }),
            });

            if (!response.ok) {
                console.log(response);
                return;
            }
            const data = response.body;
            if (!data) {
                console.log(data);
                return;
            }

            const reader = data.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let isFirst = true;
            let text = '';
            while (!done) {
                //   if (stopConversationRef.current === true) {
                //     controller.abort();
                //     done = true;
                //     break;
                //   }
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);
                text += chunkValue;
                console.log(text);
                setContent(text);
            }
        },
        []);


    return (
        <div>
            <div>{content}</div>
            <button onClick={handleSend}> send </button>
        </div>
    );
}
