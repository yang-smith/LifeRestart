import styles from '@/styles/DecisionModal.module.css';
import React, { useContext, useState, useEffect, useRef } from 'react';

interface Props {
    isOpen: boolean;
    hasMadeChoice: boolean;
    eventDescription: string;
    choices: string[];
    onSelectChoice: (choice: string) => void;
    onContinue: () => void;
}

const DecisionModal: React.FC<Props> = ({ isOpen, hasMadeChoice, eventDescription, choices, onSelectChoice, onContinue }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p className={styles.eventDescription}>{eventDescription}</p>
                {hasMadeChoice ? (
                    <div>
                        
                        <button
                            className={styles.choiceButton}
                            onClick={() => onContinue()}
                        >
                            继续
                        </button>
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
