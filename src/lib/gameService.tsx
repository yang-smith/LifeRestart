// lib/gameService.tsx

// Assuming the import paths are correct based on your project structure:
import { fetchFromOpenAI } from '@/lib/openai';
import {
  SYSTEM_MESSAGE,
  AGE_EVENT,
  EVENT_UNDERGO,
  BRITH_EVENT,
  DEATH,
  EVENT_GEN,
  UPDATE_PROPERTIES
} from '@/lib/prompts';

export function generatePlayerContent(playerAttributes: PlayerAttributes): string {
  const playerContent = 
    "### 当前玩家属性\n" +
    "- **性别**: " + playerAttributes.gender + "\n" +
    "- **年龄**: " + playerAttributes.age + "\n" +
    "- **外貌**: " + playerAttributes.appearance + " \n" +
    "- **智力**: " + playerAttributes.intelligence + " \n" +
    "- **财富**: " + playerAttributes.wealth + " \n" +
    "- **身体健康**: " + playerAttributes.health + " \n" +
    "- **心理健康**: " + playerAttributes.mental_state + " \n" ;
    
  return playerContent;
}

export async function generateAgeEvent(playerAttributes: PlayerAttributes): Promise<any> {
  try {
      const playerContent = generatePlayerContent(playerAttributes);
      const messages = [
        { "role": "system", "content": SYSTEM_MESSAGE },
        { "role": "user", "content": `${playerContent} ` },
        { "role": "user", "content": `${AGE_EVENT}` }
      ];
      console.log(messages);
      const response = await fetchFromOpenAI(messages, 'gpt-3.5-turbo');
      return response;
  } catch (error) {
      console.error("Error fetching data from OpenAI:", error);
  }
}

export async function generateBirthEvent(playerAttributes: PlayerAttributes): Promise<any> {
    try {
        const playerContent = generatePlayerContent(playerAttributes);
        const messages = [
          { "role": "system", "content": SYSTEM_MESSAGE },
          { "role": "user", "content": `${playerContent} ` },
          { "role": "user", "content": `${BRITH_EVENT}` }
        ];
        console.log(messages);
        const response = await fetchFromOpenAI(messages, 'gpt-3.5-turbo');
        return response;
    } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
    }
}

export async function generateEvent(playerAttributes: PlayerAttributes): Promise<any> {
    try {
        const playerContent = generatePlayerContent(playerAttributes);
        const messages = [
          { "role": "system", "content": SYSTEM_MESSAGE },
          { "role": "user", "content": `${playerAttributes.experiences[0]} ` },
          { "role": "user", "content": `${playerContent} ` },
          { "role": "user", "content": `${EVENT_GEN}` }
        ];
        console.log(messages);
        const response = await fetchFromOpenAI(messages, 'gpt-3.5-turbo-16k', 10000);
        return response;
    } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
    }
}

export async function undergoEvent(playerAttributes: PlayerAttributes, choices: string): Promise<any> {
    try {
        const messages = [
          { "role": "system", "content": SYSTEM_MESSAGE },
          { "role": "assistant", "content": `${playerAttributes.experiences[playerAttributes.experiences.length - 1]} ` },
          { "role": "user", "content": `${choices} ${EVENT_UNDERGO}` }
        ];
        const response = await fetchFromOpenAI(messages, 'gpt-3.5-turbo-16k', 10000);
        return response;
    } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
    }
}

export async function update(playerAttributes: PlayerAttributes): Promise<any> {
    try {
        const playerContent = generatePlayerContent(playerAttributes);
        const messages = [
          { "role": "system", "content": SYSTEM_MESSAGE },
          { "role": "assistant", "content": `${playerAttributes.experiences[playerAttributes.experiences.length - 1]}` },
          { "role": "user", "content": `${playerContent}` },
          { "role": "user", "content": `${UPDATE_PROPERTIES}` }
        ];
        console.log(messages);
        const response = await fetchFromOpenAI(messages, 'gpt-3.5-turbo-16k', 10000);
        return response;
    } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
    }
}

export async function death(playerAttributes: PlayerAttributes): Promise<any> {
    try {
        const messages = [
          { "role": "system", "content": SYSTEM_MESSAGE },
          { "role": "user", "content": `${playerAttributes.experiences.join('####')} ${DEATH}` }
        ];
        console.log(messages);
        const response = await fetchFromOpenAI(messages, 'gpt-3.5-turbo-16k', 10000);
        return response;
    } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
    }
}
