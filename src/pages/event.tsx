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
        setIsAIWorking(true);
        if (playerAttributesRef.current.age >= playerAttributesRef.current.health * 10) {
            const result = await death(playerAttributesRef.current, ageEvent);
            console.log(result);
            setAgeEvent(prevEvents => [...prevEvents, result]);
            setIsDeath(true);
            setIsAIWorking(false);
            return;
        }
        const result = await generateAgeEvent(playerAttributesRef.current);
        console.log(result);
        const parsedResult = JSON.parse(result);
        if (parsedResult && Array.isArray(parsedResult.events)) {
            const eventsList = parsedResult.events.map(event => {
                return `${event.age}岁: ${event.eventDescription}`;
            });

            setPlayerAttributes(prevState => ({
                ...prevState,
                age: prevState.age + 10
            }));

            setAgeEvent(prevEvents => [...prevEvents, ...eventsList]);

            setIsAIWorking(false);

            await new Promise(resolve => setTimeout(resolve, 3000));
            const eventData = await generateEvent(playerAttributesRef.current);
            console.log(eventData);
            try {
                const parsedEvent = JSON.parse(eventData);

                if (parsedEvent.eventDescription && parsedEvent.choices && parsedEvent.choices.length > 0) {
                    setEventDescription(parsedEvent.eventDescription);

                    // 提取choices中的描述
                    const choiceDescriptions = parsedEvent.choices.map(choice => choice.optionDescription);
                    setChoices(choiceDescriptions);

                    setIsDecisionModalOpen(true);
                }
            } catch (error) {
                console.error("Error parsing the event data:", error);
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

            <PlayerCard attributes={playerAttributes as any} />
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

            <div className={styles.attributes}>
                {displayedEvents.map((event, index) => (
                    <div
                        key={index}
                        className={styles.eventContainer}
                        ref={index === displayedEvents.length - 1 ? lastEventRef : null}
                    >
                        <ReactMarkdown className={styles.markdown}>{event}</ReactMarkdown>
                    </div>
                ))}
            </div>
            {isAIWorking ? (
                <div className={styles.loadingMessage}>AI正在工作...</div>
            ) : null}
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
