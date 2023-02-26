import { View, Text } from 'react-native';
import React, { useState, useContext } from 'react';
import { useQuery, useMutation, useQueries } from 'react-query';
import ScreenView from './ScreenView';
import axios from 'axios';
import { DataContext } from '../provider/Context';

const Airing = () => {
    const { page, setPage, keyword, setKeyword, status, setStatus } = useContext(DataContext);

    const GetApiCall = async (url) => {
        const resp = await axios(url);
        return resp;
    };

    const dataAnime = useQuery(['searchAnime', page, keyword, status], () => GetApiCall(`https://api.jikan.moe/v4/anime?page=${page}&letter=${keyword}&status=${status}&limit=25`), { keepPreviousData: true });

    return (
        <ScreenView anime={dataAnime} setKeyword={setKeyword} page={page} setPage={setPage} keyword={keyword} />
    );
};

export default Airing;