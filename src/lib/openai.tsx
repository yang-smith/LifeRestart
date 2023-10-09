// lib/openAiService.tsx

// const openAiEndpoint = `https://api.openai.com/v1/chat/completions`;
const openAiEndpoint = `https://api.autumnriver.chat/api/v1/post`;

export interface ConversationMessage {
  role: string;
  content: string;
}

export async function fetchFromOpenAI(
  conversation: ConversationMessage[],
  model: string = 'gpt-3.5-turbo',
  maxTokens: number = 1024
): Promise<string> {
  const openAiKey = await getKey();
  console.log(openAiKey);
  
  const response = await fetch(openAiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAiKey}`,
    },
    body: JSON.stringify({
      model: model,
      messages: conversation,
      max_tokens: maxTokens,
      // stream: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

const backendEndpoint = "https://api.autumnriver.chat";  // Replace with your backend address

export async function getKey(): Promise<string> {
  try {
    const response = await fetch(backendEndpoint + "/api/getkey");  // Ensure your URL points to the correct backend endpoint
    if (!response.ok) {
      throw new Error(`Failed to fetch key: ${response.statusText}`);
    }
    
    const data = await response.json();
    if (data && data.key) { 
      return String(data.key);
    } else {
      throw new Error("Key not found in response data");
    }
  } catch (error) {
    console.error("Error fetching key:", error);
    throw error;
  }
}
