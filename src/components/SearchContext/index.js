import { useState, createContext } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState({
        searchValue: '',
        loading: false,
        results: null
    });    

    return (
        <SearchContext.Provider value={[ search, setSearch ]}>
            { children }
        </SearchContext.Provider>
    );
};