import React, { useContext, useState, useEffect, useRef } from 'react';
import styles from '../styles/event.module.css';
import PlayerAttributesContext from '@/lib/PlayerAttributesContext';
import PlayerCard from '@/components/PlayerCard';
import { generateAgeEvent, generateEvent, undergoEvent, death, updatePlayerAttributesFromString } from '@/lib/gameService';
import DecisionModal from '@/components/DecisionModal';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

const PlayerLifeEvents: React.FC = () => {
    const router = useRouter();
    const { playerAttributes, setPlayerAttributes } = useContext(PlayerAttributesContext);
    const playerAttributesRef = useRef(playerAttributes);
    const [isAIWorking, setIsAIWorking] = useState(true);
    const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
    const [hasMadeChoice, setHasMadeChoice] = useState(false);
    const [isEvnetend, setIsEvnetend] = useState(false);
    const [isDeath, setIsDeath] = useState(false);
    const [eventDescription, setEventDescription] = useState("");
    const [choices, setChoices] = useState([]);
    const [displayedEvents, setDisplayedEvents] = useState<string[]>([]);
    const [ageEvent, setAgeEvent] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        playerAttributesRef.current = playerAttributes;
    }, [playerAttributes]);



    async function fetchAgeEvent() {
        console.log("fetchAgeEvent is called");
        if (playerAttributesRef.current.age > playerAttributesRef.current.health * 10) {
            const result = await death(playerAttributesRef.current, ageEvent);
            console.log(result);
            setAgeEvent(prevEvents => [...prevEvents, result]);
            setIsDeath(true);
            return;
        }
        const result = await generateAgeEvent(playerAttributesRef.current);
        if (result) {
            setPlayerAttributes(prevState => ({
                ...prevState,
                age: prevState.age + 10
            }));
            const eventsList = result.split("#");
            console.log(eventsList);
            setAgeEvent(prevEvents => [...prevEvents, ...eventsList]);
            setIsAIWorking(false);

            await new Promise(resolve => setTimeout(resolve, 3000));
            const event = await generateEvent(playerAttributesRef.current);
            console.log(event);
            const parts = event.split("%");
            if (parts.length > 1) {
                setEventDescription(parts[0]);
                const choicesList = parts[1].split(/\d\. /).filter(choice => choice);
                const choiceList0 = choicesList.slice(1);
                setChoices(choiceList0);
                setIsDecisionModalOpen(true);
            }
        }

    }
    async function handleChoice(choice: string) {
        setHasMadeChoice(true);
        console.log("You selected: ", choice);
        setEventDescription("AI正在生成后续剧情...等待片刻...");
        const result = await undergoEvent(playerAttributes, eventDescription, choice);
        setEventDescription(result);
        setIsEvnetend(true);
        const newPlayerAttributes = updatePlayerAttributesFromString(result, playerAttributesRef.current);
        setPlayerAttributes(newPlayerAttributes);
    }

    useEffect(() => {
        fetchAgeEvent();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex < ageEvent.length) {
                setDisplayedEvents(prev => [...prev, ageEvent[currentIndex]]);
                setCurrentIndex(currentIndex + 1);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [ageEvent, currentIndex]);

    const lastEventRef = useRef(null);

    useEffect(() => {
        if (lastEventRef.current) {
            lastEventRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [displayedEvents]);

    const handleReturn = () => {
        router.push('/');  // 指定要导航到的页面
    };

    return (
        <div className={styles.container}>
            <h2>事件</h2>

            <PlayerCard attributes={playerAttributes} />
            <DecisionModal
                isOpen={isDecisionModalOpen}
                hasMadeChoice={hasMadeChoice}
                isEvnetend={isEvnetend}
                eventDescription={eventDescription}
                choices={choices}
                onSelectChoice={(choice) => {
                    handleChoice(choice);
                }}
                onContinue={() => {
                    fetchAgeEvent();
                    setIsDecisionModalOpen(false);
                    setHasMadeChoice(false);
                    setIsEvnetend(false);
                }}
            />
            {isAIWorking ? (
                <div className={styles.loadingMessage}>AI正在工作...</div>
            ) : (
                <div className={styles.attributes}>
                    {displayedEvents.map((event, index) => (
                        <div
                            key={index}
                            className={styles.eventContainer}
                            ref={index === displayedEvents.length - 1 ? lastEventRef : null}
                        >
                            <ReactMarkdown>{event}</ReactMarkdown>
                        </div>
                    ))}
                </div>
            )}
            {isDeath ? (
                <button
                    className={styles.choiceButton}
                    onClick={handleReturn}
                >
                    返回主页
                </button>
            ) : null}
        </div>
    );
};

export default PlayerLifeEvents;
