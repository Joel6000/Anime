import React, { useState, createContext } from "react";

export const DataContext = createContext();

const DataContextProvider = (props) => {
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [status, setStatus] = useState('airing');

    return (
        <DataContext.Provider value={{ page, setPage, keyword, setKeyword, status, setStatus }}>
            {props.children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;