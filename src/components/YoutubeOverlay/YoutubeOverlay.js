import React, { useState, useEffect } from 'react';
import styles from './YoutubeOverlay.module.css';

const YoutubeOverlay = ({ youtubeId }) => {
    const [show, setShow] = useState(false);
    const [initiallyResized, setInitiallyResized] = useState(false);
    const [url, setUrl] = useState('');
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (!youtubeId || !document || !window) return;

        setUrl(`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&enablejsapi=1`);

        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        setWidth(vw);
    }, [youtubeId]);


    const onLoad = e => {
        const iframe = e.target;
        const wrapper = iframe.parentNode;

        setShow(true);

        // set dynamic size
        setInterval(() => {
            const wrapperHeight = wrapper.clientHeight + 'px';
            const wrapperWidth = wrapper.clientWidth + 'px';

            //overlay.top = document.querySelector('body').scrollTop;

            if (iframe.style.height != wrapperHeight) {
                iframe.style.height = wrapperHeight;

                if (!initiallyResized) setInitiallyResized(true);
            }

            if (iframe.style.width != wrapperWidth) {
                iframe.style.width = wrapperWidth;

                if (!initiallyResized) setInitiallyResized(true);
            }
        }, 50);
    };


    const onOverlayClick = () => {
        setUrl(null);
        setShow(false);
    };

    return (<div className={styles.overlay + ' ' + (show && url && styles.load)} onClick={onOverlayClick}>
        <div className={styles.videoWrapper}>
            {url && <iframe onLoad={onLoad} width={width} height={width} frameBorder="0" allow="autoplay;fullscreen" src={url}></iframe>}
        </div>
    </div>);
};

export default YoutubeOverlay;