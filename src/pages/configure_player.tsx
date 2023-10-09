// 文件路径: pages/configure_player.tsx

import React, { useContext, useState, useEffect } from 'react';
import PlayerAttributesContext from '@/lib/PlayerAttributesContext';
import styles from '../styles/ConfigurePlayer.module.css';
import { useRouter } from 'next/router';

const ConfigurePlayer: React.FC = () => {
  const { playerAttributes, setPlayerAttributes } = useContext(PlayerAttributesContext);
  const router = useRouter();
  const TOTAL_ATTRIBUTE_LIMIT = 25;
  const [TOTAL, setTOTAL] = useState(0);
  useEffect(() => {
    setTOTAL(Object.values(playerAttributes).reduce((acc, val) => acc + (typeof val === "number" ? val : 0), 0));
  }, [playerAttributes]);

  const adjustAttribute = (attributeName: string, adjustment: number) => {

    const expectedTotal = TOTAL + adjustment;
    const expectedAttributeValue = playerAttributes[attributeName] + adjustment;
    if (expectedTotal >= 0 && expectedTotal <= TOTAL_ATTRIBUTE_LIMIT 
      && expectedAttributeValue >= 0 && expectedAttributeValue <= 10) {
      setPlayerAttributes(prevState => ({
        ...prevState,
        [attributeName]: prevState[attributeName] + adjustment
      }));
    }
  };
  const handleConfirm = () => {
    router.push('/event');  // 指定要导航到的页面
  };
  const attributeTranslations = {
    gender: "性别",
    appearance: "外貌",
    intelligence: "智力",
    wealth: "家境",
    health: "体质",
    mental_state: "心境",
  };
  const DEFAULT_PLAYER_ATTRIBUTES = {
    gender: 'male',
    age: 0,
    appearance: 0,
    intelligence: 0,
    wealth: 0,
    health: 0,
    mental_state: 0,
    experiences: [],
  };
  useEffect(() => {
    setPlayerAttributes(DEFAULT_PLAYER_ATTRIBUTES);
  }, []);


  return (
    <div className={styles.container}>
      <h1>胎儿属性</h1>
      <div className={styles.content}>
        <div>
          <img src="/baby.jpg" alt="Baby" className={styles.babyImage} />
        </div>
        <div className={styles.attributes}>
          <div className="font-sans font-medium text-lg text-gray-800 mb-5 text-center border-dashed border border-gray-500 p-2.5 rounded-md">
            剩余属性点: {TOTAL_ATTRIBUTE_LIMIT - TOTAL}
          </div>
          {Object.keys(playerAttributes).map((key) => {
            if (key !== "age" && typeof playerAttributes[key] === "number") {
              return (
                <div key={key} className={styles.attributeContainer}>
                  <span>{attributeTranslations[key] || key}:</span>
                  <button
                    onClick={() => adjustAttribute(key, -1)}
                    disabled={playerAttributes[key] <= 0}>
                    -
                  </button>
                  <span>{playerAttributes[key]}</span>
                  <button
                    onClick={() => adjustAttribute(key, 1)}
                    disabled={playerAttributes[key] >= 10 || TOTAL + 1 > TOTAL_ATTRIBUTE_LIMIT}
                  >
                    +
                  </button>
                </div>
              );
            }
          })}
          <div className="mt-4 text-center">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
              onClick={handleConfirm}>
              确认
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConfigurePlayer;
