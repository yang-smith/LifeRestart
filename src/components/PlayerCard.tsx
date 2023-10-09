// 文件路径: components/PlayerCard.tsx

import React from 'react';
import styles from '../styles/playercard.module.css';

interface PlayerCardProps {
  attributes: {
    [key: string]: string | number | string[];
  };
}
const attributeTranslations = {
  age: "年龄",
  gender: "性别",
  appearance: "外貌",
  intelligence: "智力",
  wealth: "家境",
  health: "身体",
  mental_state: "心境",
};

const PlayerCard: React.FC<PlayerCardProps> = ({ attributes }) => {


  const filteredAttributes = Object.entries(attributes)
    .filter(([key]) => key !== 'experiences' && key !== 'gender' && key !== 'age')
    .reduce((acc: { [key: string]: string | number | string[] }, [key, value]) => {
      acc[attributeTranslations[key as keyof typeof attributeTranslations] || key] = value;
      return acc;
    }, {});

  return (
    <div className={styles.playerCard}>
      <ul>
        {Object.entries(filteredAttributes).map(([key, value]) => (
          <li key={key}>{key}: {value}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerCard;
