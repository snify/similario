import React, { useContext } from 'react';
import styles from './ListView.module.css';
import { SearchContext } from '../SearchContext';
import swal from '@sweetalert/with-react'

const ListView = ({ ...rest }) => {
    let [search, setSearch] = useContext(SearchContext);
    
    let handleListItemClick = async (youtube_id) => {
        if (!youtube_id) return;

        let result = await swal({
            content: (                
                <iframe id="viewFrame" width="1000" height="700"
                    allow="autoplay"
                    src={ `https://www.youtube.com/embed/${youtube_id}?autoplay=1&mute=0&enablejsapi=1` }
                    frameBorder="0"
                >
                </iframe>
            ),
            buttons: {}
        });

        let frame = document.querySelector('#viewFrame');
        frame.src = '';
    };

    let ListItem = ({ name, year, image, genre, youtube_id }) => {
        return (
        <div 
            onClick={() => handleListItemClick(youtube_id)}
            className={styles.listItem}>
            <img src={image}></img>
            <div className={styles.title}>{ name }</div> 
            <div className={styles.tags}>
                <span title="Year">{ year || "N/A" }</span>
                <span title="Genre">{ genre || "N/A" }</span>
            </div>           
        </div>);
    };

    let getLoadingTemplate = () => {
        return (<div>Loading...</div>);
    }

    let getTemplate = () => {
        return (
        <div className={styles.listView}>
            { search.loading && getLoadingTemplate() }
            {
                Array.isArray(search.results) && search.results.length > 0 ? 
                search.results.map((searchResult, index) => {
                    return (
                    <ListItem
                        key={index} 
                        { ...searchResult}
                    />);
                }) : <div></div>
                // <div>Nothing found :(</div>                    
            }            
        </div>);
    };

    return getTemplate();
};

export default ListView;