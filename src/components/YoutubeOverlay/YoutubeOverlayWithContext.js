import React, { useContext } from 'react';
import { OverlayContext } from '../OverlayContext';
import YoutubeOverlay from './YoutubeOverlay';

const YoutubeOverlayWithContext = () => {
    const [youtubeId] = useContext(OverlayContext);

    return (
        <YoutubeOverlay youtubeId={youtubeId} />
    );
};

export default YoutubeOverlayWithContext;