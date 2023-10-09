// 文件路径: pages/index.tsx

import React from 'react';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter();
  const startGame = () => {
    router.push('/configure_player');  // 指定要导航到的页面
  };

  return (
    <div className={styles.contenter}>
      <div>
        <h1 className={styles.h1_begain}>人生模拟器</h1>
        <button className={styles.button_begain} onClick={startGame}>
          重开人生
        </button>
      </div>
    </div>
  );
};

export default Home;
