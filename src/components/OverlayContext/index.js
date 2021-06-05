import { useState, createContext } from 'react';

export const OverlayContext = createContext();

export const OverlayProvider = ({ children }) => {
    const [youtubeId, setYoutubeId] = useState();

    return (
        <OverlayContext.Provider value={[youtubeId, setYoutubeId]}>
            { children }
        </OverlayContext.Provider>
    );
};