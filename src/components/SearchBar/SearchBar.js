import React, { useEffect } from 'react';
import styles from './SearchBar.module.css'
import SearchIcon from "./search-icon.svg";
import { useState, useContext } from 'react';
import { SearchContext } from '../SearchContext';

const SearchBar = ({ placeholder, debounce = 300, ...rest }) => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [debounceTimer, setDebounceTimer] = useState();

    const [search, setSearch] = useContext(SearchContext);

    let requestPending = false;

    let handleChange = e => {    
        clearTimeout(debounceTimer)
        
        setValue(e.target.value);        
        setSelectedIndex(null);
        setSuggestions([]);

        setDebounceTimer(setTimeout(() => {
            onInputChange(e.target.value);
        }, debounce));
    };

    let onInputChange = value => {  
        if (value && value.length >= 3 && !requestPending) {
            requestPending = true;            

            fetch('/api/search?t=' + value)
            .then(result => result.json())
            .then(results => {

                results = results.sort((a, b) => {
                    return b.year - a.year;
                });

                setSuggestions(results);
                requestPending = false;
            });        
        }
    }

    let handleKeyDown = e => {
        e = e || window.event;

        const KEY_UP_ARROW = 38;
        const KEY_DOWN_ARROW = 40;
        const KEY_RETURN = 13;
        const KEY_ESC = 27;
        
        let handlers = {};
        handlers[KEY_UP_ARROW] = arrowUp;
        handlers[KEY_DOWN_ARROW] = arrowDown;
        handlers[KEY_RETURN] = returnKey;
        handlers[KEY_ESC] = escKey;

        let keyCode = '' + e.keyCode;

        if (Object.keys(handlers).includes(keyCode)) {
            e.preventDefault();
            handlers[keyCode]();
        }
    };

    let arrowUp = () => {
        let currentlySelectedIndex = selectedIndex || 0;
        if (currentlySelectedIndex == 0) return; // do not select beyond the first item

        setSelectedIndex(currentlySelectedIndex - 1);
    };

    let arrowDown = () => {
        let currentlySelectedIndex = selectedIndex;

        if (currentlySelectedIndex == null) {
            // if none selected, select the first one
            setSelectedIndex(0);
            return;
        }
        else if (currentlySelectedIndex == suggestions.length - 1) {
            // do not select beyond last item
            return;
        }
        else {
            // select next item
            setSelectedIndex(currentlySelectedIndex + 1);
        }
    };

    let returnKey = () => {
        selectSuggestionItem(suggestions[selectedIndex]);
    };

    let escKey = () => {
        setSelectedIndex(null);
        setSuggestions([]);
    };

    let handleSuggestionItemClick = index => {
        setSelectedIndex(index);
        selectSuggestionItem(suggestions[index]);
    };
    
    let selectSuggestionItem = item => {
        setSelectedIndex(null);
        setSuggestions([]);
        
        if (item) {
            setSearch({
                searchValue: item.name,
                loading: true,
                results: []
            });

            fetch('/api/recommend?t=' + item.name)
            .then(result => result.json())
            .then(results => {
                setSearch({
                    searchValue: item.name,
                    loading: false,
                    results
                });
            });

            setValue(item.name);
        }
        // else {           
        //     onInputChange(value);
        // }
    };

    let getTemplate = () => (
        <div className={styles.searchBarWrapper}>
            
            <div className={styles.searchbar}>       
                <SearchIcon className={styles.searchIcon}></SearchIcon>
                <input type="text" placeholder={placeholder} onChange={handleChange} value={ value || '' } onKeyDown={handleKeyDown} { ...rest }></input>
            </div>
            
            {suggestions.length > 0 &&
            <div className={styles.suggestionsList}>
                {suggestions.map((suggestion, key) => {
                    let isItemSelected = key == selectedIndex;
                    
                    return (
                    <div key={key} onClick={() => handleSuggestionItemClick(key)} className={styles.suggestionsListItem + ' ' + (isItemSelected ? styles.selected : '')}>
                        <span>{suggestion.year}</span>{suggestion.name}
                    </div>);
                })}
            </div>}
        
        </div>);

    

    return getTemplate();
};

export default SearchBar;