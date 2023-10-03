//utils/gameFunctions.tsx
// utils/gameFunctions.tsx

import React, { useState, useEffect, useContext } from 'react';
import { generateBirthEvent, generateEvent, undergoEvent, update, death } from '../lib/gameService';
import PlayerAttributesContext from '@/lib/PlayerAttributesContext';

export const useGameFunctions = () => {
  const { playerAttributes, setPlayerAttributes } = useContext(PlayerAttributesContext);
  
  const [eventDescription, setEventDescription] = useState("");
  const [isStartLoading, setIsStartLoading] = useState(false);
  const [isEventLoading, setIsEventLoading] = useState(false);
  const [isChoiceLoading, setIsChoiceLoading] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [userChoice, setUserChoice] = useState("");

  const startGame = async () => {
    setIsStartLoading(true);
    try {
      setGameStarted(true);
      const response = await generateBirthEvent(playerAttributes);
      console.log(response)
      setEventDescription(response);
      setPlayerAttributes(prevPlayer => ({
        ...prevPlayer,
        experiences: [...prevPlayer.experiences, response]
      }));
    } catch (error) {
      console.error("Error starting the game:", error);
    }
    setIsStartLoading(false);
    preloadNextEvent();
  };


  const continueGame = async () => {
    setIsEventLoading(true);
    try {
      // ... 保留方法的其他代码 ...
    } catch (error) {
      console.error("Error continuing the game:", error);
    }
    setIsEventLoading(false);
  };

  const handleChoice = async (choice: string) => {
    setIsChoiceLoading(true);
    try {
      // ... 保留方法的其他代码 ...
    } catch (error) {
      console.error("Error handling choice:", error);
    }
    setIsChoiceLoading(false);
  };

  const resetGame = () => {
    setPlayer({
      age: 0,
      gender: Math.random() > 0.5 ? '男' : '女',
      appearance: Math.floor(Math.random() * 10) + 1,
      intelligence: Math.floor(Math.random() * 10) + 1,
      wealth: Math.floor(Math.random() * 10) + 1,
      health: Math.floor(Math.random() * 10) + 1,
      mental_state: Math.floor(Math.random() * 10) + 1,
      experiences: [],
    });
    setEventDescription("");
    setGameOver(false);
    setGameStarted(false);
    setIsStartLoading(false);
    setIsEventLoading(false);
    setIsChoiceLoading(false);
    setUserChoice("");
  };

  const preloadNextEvent = async () => {
    // ... 保留方法的其他代码 ...
  };

  const updatePlayer = (inputString: string) => {
    // ... 保留方法的其他代码 ...
  };

  return {
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
    preloadNextEvent,
    updatePlayer,
  };
};
