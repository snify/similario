import React, { useState, useEffect, useContext } from 'react';
import { OverlayContext } from '../OverlayContext';
import YoutubeOverlay from './YoutubeOverlay';

const YoutubeOverlayWithContext = () => {    
    let [youtubeId, setYoutubeId] = useContext(OverlayContext);

    return (
        <YoutubeOverlay youtubeId={youtubeId} />
    );
};

export default YoutubeOverlayWithContext;