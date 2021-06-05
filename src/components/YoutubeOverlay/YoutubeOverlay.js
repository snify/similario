import React, { useState, useEffect, useContext } from 'react';
import styles from './YoutubeOverlay.module.css';

const YoutubeOverlay = ({ youtubeId }) => {

    let getYoutubeUrl = id => `https://www.youtube.com/embed/${id}?autoplay=1&amp;mute=0&amp;enablejsapi=1`;
    
    let [show, setShow] = useState(false);
    let [initiallyResized, setInitiallyResized] = useState(false);

    useEffect(() => {
        console.log('YoutubeOverlay loaded');
        // if (youtubeId) {        
        //     let youtubeUrl = getYoutubeUrl(youtubeId);

        //     console.log('loaded!', youtubeId);
        //     // setError(false);
        //     // setShow();
        //     // setInitiallyResized(false);

        //     setUrl(youtubeUrl);
        // }
    }, []);

    let onLoad = e => {
        let iframe = e.target;
        let wrapper = iframe.parentNode;
        let overlay = iframe.parentNode;

        console.log('load', youtubeId);
        setShow(true);
        
        // set dynamic size
        setInterval(() => {
            let wrapperHeight = wrapper.clientHeight + 'px';
            let wrapperWidth = wrapper.clientWidth + 'px';
            
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


    let onOverlayClick = () => {
        setShow(false);
    };

    let getTemplate = () => {
        let url = youtubeId && getYoutubeUrl(youtubeId);

        return (
            <div className={styles.overlay + ' ' + (show && url && styles.load)} onClick={onOverlayClick}>
                <div className={styles.videoWrapper}>                    
                    <iframe onLoad={onLoad} width="200" height="100" frameBorder="0" allow="autoplay;fullscreen" src={url}></iframe>
                </div>
            </div>
        );
    };

    return getTemplate();
};

export default YoutubeOverlay;