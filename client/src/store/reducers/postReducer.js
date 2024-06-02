import actionTypes from "../actions/actionTypes";
const initState = {
    posts: [],
    msg: '',
    count: 0,
    newPosts: [],
    outstandingPost: []
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS:
        case actionTypes.GET_POSTS_LIMIT:
            return {
                ...state,
                posts: action.posts || [],
                msg: action.msg || '',
                count: action.count || 0
            }
        case actionTypes.GET_NEW_POST:
            return {
                ...state,
                msg: action.msg || '',
                newPosts: action.newPosts || []
            }
        case actionTypes.GET_OUTSTANDING:
            return {
                ...state,
                msg: action.msg || '',
                outstandingPost: action.outstandingPost || []
            }
        default:
            return state;
    }

}

export default postReducer