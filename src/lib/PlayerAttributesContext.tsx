// PlayerAttributesContext.tsx

import React from 'react';

export interface PlayerAttributes {
    gender: string;
    age: number;
    appearance: number;
    intelligence: number;
    wealth: number;
    health: number;
    mental_state: number;
    experiences: string[];
}

interface PlayerAttributesContextProps {
    playerAttributes: PlayerAttributes;
    setPlayerAttributes: React.Dispatch<React.SetStateAction<PlayerAttributes>>;
}

const PlayerAttributesContext = React.createContext<PlayerAttributesContextProps | undefined>(undefined);

export default PlayerAttributesContext;

interface PlayerAttributesProviderProps {
    children: React.ReactNode;
}

export const PlayerAttributesProvider: React.FC<PlayerAttributesProviderProps> = ({ children }) => {
    const [playerAttributes, setPlayerAttributes] = React.useState<PlayerAttributes>({
        gender: 'male',
        age: 0,
        appearance: 0,
        intelligence: 0,
        wealth: 0,
        health: 0,
        mental_state: 0,
        experiences: [],
    });

    return (
        <PlayerAttributesContext.Provider value={{ playerAttributes, setPlayerAttributes }}>
            {children}
        </PlayerAttributesContext.Provider>
    );
};