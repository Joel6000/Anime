export const INCREASE_PAGE_NUMBER = 'INCREASE_PAGE_NUMBER';
export const DECREASE_PAGE_NUMBER = 'DECREASE_PAGE_NUMBER';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE';

export const addFavour = anime => dispatch => {
    dispatch({
        type: ADD_FAVOURITE,
        payload: anime,
    });
};

export const removeFavour = anime => dispatch => {
    dispatch({
        type: REMOVE_FAVOURITE,
        payload: anime,
    });
};