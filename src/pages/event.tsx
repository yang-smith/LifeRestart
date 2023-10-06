import React, { useContext, useState, useEffect } from 'react';
import styles from '../styles/event.module.css';
import PlayerAttributesContext from '@/lib/PlayerAttributesContext';
import PlayerCard from '@/components/PlayerCard';
import { generateAgeEvent } from '@/lib/gameService';

const PlayerLifeEvents: React.FC = () => {
    // 从上下文中获取playerAttributes
    const { playerAttributes } = useContext(PlayerAttributesContext);

    // 假设的生活事件数据，您可以根据需要修改或从API获取
    const lifeEvents = [
        "你出生了，是个男孩。",
        "你小时候很活泼",
        "你的父母对你非常宠爱，呵护备至。",
        // ... 其他事件
    ];
    const [ageEvent, setAgeEvent] = useState<string[]>([]); 
    
    useEffect(() => {
        async function fetchAgeEvent() {
            const result = await generateAgeEvent(playerAttributes);
            if (result) {
                const eventsList = result.split("#");
                setAgeEvent(eventsList);
            } else {
                setAgeEvent([]);
            }
        }
        fetchAgeEvent();
    }, [playerAttributes]);

    return (
        <div className={styles.container}>

            <h2>事件</h2>

            <PlayerCard attributes={playerAttributes} />

            <div className={styles.attributes}>
                {ageEvent.map((event, index) => (
                    <div key={index} className={styles.eventContainer}>
                        <span>{event}</span>
                    </div>
                ))}
            </div>
            <div>
                {ageEvent}
            </div>
        </div>
    );
};

export default PlayerLifeEvents;
