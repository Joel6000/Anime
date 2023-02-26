import { View, Text } from 'react-native';
import React from 'react';
import axios from 'axios';

const GetApiCall = async (url) => {
    const resp = await axios(url);
    return resp;
};

export { GetApiCall };