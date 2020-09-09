import {createStore} from 'redux'
export const reducer = (state = {}, action) => {
    switch (action.type) {
      case "PUBLIC REPO":
        return { ...state, publicrepo: action.publicrepo };
      case "FOLLOWERS":
        return { ...state, followers: action.followers };
      case "FOLLOWING":
        return { ...state, following: action.following };
        case "PUBLICGISTS":
            return{...state,publicgists: action.publicgists};
      default:
        return state;
    }
  };
  let store = createStore(reducer)
 
  store.dispatch({ type: 'PUBLIC REPO' })
  store.dispatch({ type: 'FOLLOWERS' })
  store.dispatch({type:'FOLLOWING'})
  store.dispatch({type:'PUBLICGISTS'})
  