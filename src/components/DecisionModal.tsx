import styles from '@/styles/DecisionModal.module.css';
import React, { useContext, useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
    isOpen: boolean;
    hasMadeChoice: boolean;
    isEvnetend: boolean;
    eventDescription: string;
    choices: string[];
    onSelectChoice: (choice: string) => void;
    onContinue: () => void;
}

const DecisionModal: React.FC<Props> = ({ isOpen, hasMadeChoice, isEvnetend, eventDescription, choices, onSelectChoice, onContinue }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <ReactMarkdown className={styles.eventDescription}>{eventDescription}</ReactMarkdown>
                {hasMadeChoice ? (
                    <div>
                        {isEvnetend ? (
                            <button
                                className={styles.choiceButton}
                                onClick={() => onContinue()}
                            >
                                继续
                            </button>
                        ) : null}
                    </div>


                ) : (
                    <div className={styles.choicesContainer}>
                        {choices.map((choice, index) => (
                            <button
                                key={index}
                                className={styles.choiceButton}
                                onClick={() => onSelectChoice(choice)}
                            >
                                {choice}
                            </button>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default DecisionModal;
