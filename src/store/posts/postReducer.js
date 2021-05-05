import * as actionTypes from "./postActionTypes";

const initialState = {
    error: false,
    loading: false,
    postsList: [],
    countries: []
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_POSTS_FETCH:
            return { ...state, loading: true, error: false }

        case actionTypes.FETCH_POSTS_SUCCESS:
            const {
                postsList = [],
                countries = [],
            } = action.payload;

            return { ...state, postsList: postsList, countries: countries, loading: false, error: false };

        case actionTypes.FETCH_POSTS_FAIL:
            return { ...state, loading: false, error: true }

        default:
            break;
    }

    return state;
};


export default postReducer;
