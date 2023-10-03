// 文件路径: components/PlayerCard.tsx

import React from 'react';
import styles from '../styles/Home.module.css';

interface PlayerCardProps {
  attributes: {
    [key: string]: string | number | string[];
  };
}

const PlayerCard: React.FC<PlayerCardProps> = ({ attributes }) => {
  const attributeTranslations = {
    age: "年龄",
    gender: "性别",
    appearance: "外貌",
    intelligence: "智力",
    wealth: "财富",
    health: "身体健康",
    mental_state: "心理健康",
    // 如果还有其他属性，也可以在这里添加
  };

  const filteredAttributes = Object.entries(attributes)
    .filter(([key]) => key !== 'experiences')
    .reduce((acc, [key, value]) => {
      acc[attributeTranslations[key] || key] = value;
      return acc;
    }, {});

  return (
    <div className={styles.playerCard}>
      <h2>玩家属性</h2>
      <ul>
        {Object.entries(filteredAttributes).map(([key, value]) => (
          <li key={key}>{key}: {value}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerCard;
