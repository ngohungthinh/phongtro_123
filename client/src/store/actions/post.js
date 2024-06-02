import actionTypes from './actionTypes'
import { apiGetNewPosts, apiGetPosts, apiGetPostsLimit } from '../../services/post'

export const getPosts = () => async (dispatch) => {
    try {
        const response = await apiGetPosts()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS,
                posts: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS,
            posts: null
        })
    }
}
export const getPostsLimit = (query) => async (dispatch) => {
    try {
        const response = await apiGetPostsLimit(query)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                posts: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_LIMIT,
            posts: null
        })
    }
}
export const getNewPosts = () => async (dispatch) => {
    try {
        const response = await apiGetNewPosts()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                newPosts: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                msg: response.data.msg,
                newPosts: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_POST,
            newPosts: null
        })
    }
}

export const getOutstandingPost = () => async (dispatch) => {
    try {
        const response = await apiGetPostsLimit({
            limitPost: 5,
            order: ['star', 'DESC']
        })
        if (response?.data?.err === 0) {
            dispatch({
                type: actionTypes.GET_OUTSTANDING,
                outstandingPost: response.data.response.rows,
            })
        } else {
            dispatch({
                type: actionTypes.GET_OUTSTANDING,
                msg: response.data.msg,
                outstandingPost: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_OUTSTANDING,
            outstandingPost: null
        })
    }
}