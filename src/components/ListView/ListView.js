import React, { useContext, useState } from 'react';
import styles from './ListView.module.css';
import swal from '@sweetalert/with-react'
import YoutubeOverlay from '../YoutubeOverlay';
import { SearchContext } from '../SearchContext';
import { OverlayContext } from '../OverlayContext';

const ListView = ({ children, ...rest }) => {
    const [search, setSearch] = useContext(SearchContext);
    const [youtubeId, setYoutubeId] = useContext(OverlayContext);

    const handleListItemClick = (youtube_id) => {
        // if (!youtube_id) return;
        // setYoutubeId(null);
        setYoutubeId(youtube_id);
    };

    const ListItem = ({ name, year, image, genre, youtube_id }) => (
        <div
            onClick={() => handleListItemClick(youtube_id)}
            className={styles.listItem}>
            <img src={image}></img>
            <div className={styles.title}>{name}</div>
            <div className={styles.tags}>
                <span title="Year">{year || "N/A"}</span>
                <span title="Genre">{genre || "N/A"}</span>
            </div>
        </div>);


    const getTemplate = () => {
        return (
            <div className={styles.listView}>
                {search.loading ? <div className={styles.showingSimilarText}>Loading...</div> : search.searchValue && <div className={styles.showingSimilarText}>⎯   Movies similar to "{search.searchValue}"   ⎯</div>}
                {
                    Array.isArray(search.results) && search.results.length > 0 ?
                        search.results.map((searchResult, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    {...searchResult}
                                />);
                        }) : <div></div>
                    // <div>Nothing found :(</div>                    
                }
            </div>
        );
    };

    return getTemplate();
};

export default ListView;