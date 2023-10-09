// lib/gameService.tsx

// Assuming the import paths are correct based on your project structure:
import { fetchFromOpenAI } from '@/lib/openai';
import { PlayerAttributes } from '@/lib/PlayerAttributesContext'; 
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
    "- **家境**: " + playerAttributes.wealth + " \n" +
    "- **体质**: " + playerAttributes.health + " \n" +
    "- **心境**: " + playerAttributes.mental_state + " \n";

  return playerContent;
}

export async function generateAgeEvent(playerAttributes: PlayerAttributes): Promise<any> {
  try {
    const playerContent = generatePlayerContent(playerAttributes);
    const messages = [
      { "role": "system", "content": SYSTEM_MESSAGE },
      { "role": "user", "content": `${playerContent} ${AGE_EVENT}` }
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
      { "role": "user", "content": `${playerContent} ${EVENT_GEN}` }
    ];
    console.log(messages);
    const response = await fetchFromOpenAI(messages, 'gpt-3.5-turbo');
    return response;
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
  }
}

export async function undergoEvent(playerAttributes: PlayerAttributes, event: string, choices: string): Promise<any> {
  try {
    const playerContent = generatePlayerContent(playerAttributes);
    const messages = [
      { "role": "system", "content": SYSTEM_MESSAGE },
      { "role": "user", "content": `${playerContent} ` },
      { "role": "assistant", "content": `${event} ` },
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

export async function death(playerAttributes: PlayerAttributes, eventsList: string[]): Promise<any> {
  try {
    const playerContent = generatePlayerContent(playerAttributes);
    const messages = [
      { "role": "system", "content": SYSTEM_MESSAGE },
      // { "role": "assistant", "content": `${eventsList} ` },
      { "role": "user", "content": `${playerContent} ${DEATH}` }
    ];
    console.log(messages);
    const response = await fetchFromOpenAI(messages, 'gpt-3.5-turbo-16k', 10000);
    return response;
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
  }
}

const attributeMapping: { [key: string]: keyof PlayerAttributes } = {
  "外貌": "appearance",
  "智力": "intelligence",
  "家境": "wealth",
  "身体": "health",
  "心境": "mental_state"
};

export function updatePlayerAttributesFromString(
  str: string,
  currentAttributes: PlayerAttributes
): PlayerAttributes {
  const regex = /\{([^}]+)\}/;
  const match = str.match(regex);

  if (match && match[1]) {
    try {
      const rawUpdates: any = JSON.parse(`{${match[1]}}`);
      const updates: Partial<PlayerAttributes> = {};

      for (let key in rawUpdates) {
        const englishKey = attributeMapping[key];
        if (englishKey) {
          updates[englishKey as keyof PlayerAttributes] = rawUpdates[key];

        }
      }

      return { ...currentAttributes, ...updates };
    } catch (e) {
      console.error("Error parsing player attributes update:", e);
    }
  }
  return currentAttributes;
}
