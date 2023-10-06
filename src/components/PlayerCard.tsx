// 文件路径: components/PlayerCard.tsx

import React from 'react';
import styles from '../styles/playercard.module.css';

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
    wealth: "家境",
    health: "身体",
    mental_state: "心境",
  };

  const filteredAttributes = Object.entries(attributes)
    .filter(([key]) => key !== 'experiences' && key !== 'gender' && key !== 'age')
    .reduce((acc, [key, value]) => {
      acc[attributeTranslations[key] || key] = value;
      return acc;
    }, {});

  return (
    <div className={styles.playerCard}>
      {/* <h2>玩家属性</h2> */}
      <ul>
        {Object.entries(filteredAttributes).map(([key, value]) => (
          <li key={key}>{key}: {value}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerCard;
