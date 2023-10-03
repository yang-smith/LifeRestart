// 文件路径: pages/index.tsx

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useGameFunctions } from '@/utils/gameFunction';
import styles from '../styles/Home.module.css';
import PlayerCard from '@/components/PlayerCard';


const Home: React.FC = () => {
  const {
    playerAttributes,
    eventDescription,
    isStartLoading,
    isEventLoading,
    isChoiceLoading,
    gameOver,
    gameStarted,
    userChoice,
    setUserChoice,
    startGame,
    continueGame,
    handleChoice,
    resetGame,
  } = useGameFunctions();


  return (
    <div className={styles.contenter}>
      
      {/* 开始游戏按钮 */}
      {!gameStarted && (
        <div> 
          <h1 className={styles.h1_begain}>人生模拟器</h1>
          <button className={styles.button_begain} onClick={startGame}>
          重开人生
          </button>
        </div>
      )
      }
      {isStartLoading && <div className={styles.loadingIndicator}><div className={styles.spinner}></div>正在生成人生剧本...</div>}

      {gameOver && (
        <div>
          <p>游戏结束</p>
          <ReactMarkdown children={eventDescription} />
          <button onClick={resetGame}>重新开始</button>
        </div>
      )}

      {gameStarted && !gameOver && (
        <div>
          <ReactMarkdown children={eventDescription} />
          {isEventLoading && <div className={styles.loadingIndicator}><div className={styles.spinner}></div>正在生成事件...</div>}
          {!isEventLoading && (
            <div>
              <button onClick={continueGame}>继续</button>
            </div>
          )}
          {isChoiceLoading && <div className={styles.loadingIndicator}><div className={styles.spinner}></div>正在评估你的选择...</div>}
          {!isChoiceLoading && (
            <div>
              <input value={userChoice} onChange={(e) => setUserChoice(e.target.value)} placeholder="请输入你的选择" />
              <button onClick={() => handleChoice(userChoice)}>选择</button>
            </div>
          )}
        </div>
      )}

      {/* 玩家属性 */}
      {gameStarted && !isStartLoading && (
        <PlayerCard attributes={playerAttributes} />
      )}
    </div>
  );
};

export default Home;
