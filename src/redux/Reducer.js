import { ADD_FAVOURITE, REMOVE_FAVOURITE } from './Action';

const initialState = {
    anime: []
};

function favReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FAVOURITE:
            return { ...state, anime: [...state.anime, action.payload] };
        case REMOVE_FAVOURITE:
            return { ...state, anime: state.anime.filter(obj => obj.mal_id !== action.payload.mal_id) };
        default:
            return state;
    }
}

export default favReducer;