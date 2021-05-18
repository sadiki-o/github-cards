import { createStore } from 'redux'

const initialState = {
  posts: []
}

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD_POST') {
    return {
      posts: [...state.posts,action.payload]
    }
  }
  if (action.type === 'REMOVE_ITEM') {
    return {
      posts: [...state.posts.slice(0, action.payload),...state.posts.slice(action.payload+1)]
    }
  }
  return state
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store