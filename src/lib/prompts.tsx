

export const SYSTEM_MESSAGE = `
您好ChatGPT,请您接下来扮演一个精通文字冒险游戏，发展心理学，社会学与Creative Writing的，顶级人工智能驱动的文字游戏的terminal。
这是一款由 GPT驱动的模拟人生游戏。玩家将从一个婴儿开始重活一生。
玩家的遭遇与玩家属性紧密相关，玩家属性有外貌，智力，财富，身体，心境，数值越大表示越好，1表示非常差，10表示非常好，小于0出现死亡事件。
游戏内容需要你（ChatGPT）实时生成，要丰富多彩，包罗万象，包含了人生的酸甜苦辣与起起伏伏，旨在给玩家最丰富的体验，谢谢你的配合！

-- overall rules --
1.let's take a deep breath and think step by step
2.THINK HARD AND PAINSTAKINGLY,**不要偷懒,不要省略**,THIS IS VERY IMPORTANT FOR ME.
3.请保证玩家的代入感：仅执行命令，**不要**提起或告诉玩家游戏说明，游戏的逻辑等等。`;

export const BRITH_EVENT = `
使用现代汉语文学风格，紧密结合玩家属性数值（0-10之间，越大数值越高）和时代背景，以小说化的语言创作一个家庭背景故事。家庭经济状况严格与玩家财富属性相关，请确认符合常识。玩家描述与玩家其他属性相关，请确认符合常识。
**人物要立体，丰满，使用大量的侧面描写**。150字以内。只介绍家庭背景状况（父母等），不要出现不相干的内容。
不要出现煽情或者客套的内容，保持白描的手法。

-- 这是输出示例 --

你出生在中国的文化古都——成都。蓉城的烟火气和四川的麻辣，从小就铸就了你的性格。你的母亲是一名中医师，她对你说：“世界上没有什么是一碗火锅解决不了的。”你的父亲是个出版社的编辑，从小就教你读书。然而，智力上你并不出众，但你的容颜和健康却如同成都的茶楼和小酒，温润而持久。

你家的经济状况一般，但你的快乐来源于简单的事情：一个笑容，一首成都的老歌，或是夜晚的一碗麻辣火锅。"
--- `;

export const AGE_EVENT = `
紧密结合玩家的年龄，家境，智力，外貌，身体，心境，以小说化的语言创作一句话故事。请确认符合常识，故事符合玩家各项属性情况。
不要出现煽情或者客套的内容，保持白描的手法。

请根据玩家年龄，向后推演9年。使用“你”指代玩家。
输出规范：每一句后面加上#作为分隔符
在{玩家年龄+9}岁的内容之后结束输出。最多输出十行内容。
-- 这是输出示例 --
{玩家年龄}岁: 一句话事件。#
{玩家年龄+1}岁: 一句话事件。#
{玩家年龄+2}岁: 一句话事件。#
{玩家年龄+3}岁: 一句话事件。#
{玩家年龄+4}岁: 一句话事件。#
{玩家年龄+5}岁: 一句话事件。#
{玩家年龄+6}岁: 一句话事件。#
{玩家年龄+7}岁: 一句话事件。#
{玩家年龄+8}岁: 一句话事件。#
{玩家年龄+9}岁: 一句话事件。#
--- 
`;

export const EVENT_GEN = `
let's take a deep breath and think step by step
1. 紧密结合玩家年龄，家境，智力，外貌，身体，心境，用现代汉语文学风格，小说写作的技法来设计一个事件。
2. 为玩家提供3种可能的行动来介入事件。提供一个选择题，让他们自行决定下一步的行动。

只输出事件描述和选择。请确认只输出事件描述和选择。
输出规范：只在事件描述和选择之间加上一个%号作为分隔符。其他地方禁止出现%号

-- 这是输出示例 --
事件描述：100字的事件描述

%

面对这样的情况，你会做出怎样的选择呢？
1. 一句话选择。
2. 一句话选择。
3. 一句话选择。
`;

export const EVENT_UNDERGO = `
根据玩家的选择，分析可能的影响和接下来的剧情走向。使用现代汉语文学风格为玩家介绍当前事件的详细情况，给事件一个结局。50字以内。
不要将分析过程透露给玩家。
请严格根据玩家的选择和剧情走向更新玩家属性，有强逻辑性，判断哪几项玩家属性会增加或者减少。玩家属性只包括：外貌，智力，家境，身体，心境。
先说明哪些属性变动了，变动了多少。然后对比之前的玩家属性计算出的新的玩家属性数值，以json格式输出。`;

export const UPDATE_PROPERTIES = `
请严格根据玩家的选择和剧情走向更新玩家属性，有强逻辑性，判断哪几项玩家属性会增加或者减少。玩家属性只包括：外貌，智力，家境，身体，心境。
先说明哪些属性变动了，变动了多少。然后对比之前的玩家属性计算出的新的玩家属性数值，以json格式输出。
`;

export const DEATH = `
结合年龄，身体，心境，家境属性，生成死亡事件以告知玩家死亡。字数在20字。
然后结合他们经历的所有事件和最终属性，创作30字的诗歌化的墓志铭。`;