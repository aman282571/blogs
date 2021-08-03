export function Reducer(state, action) {
  switch (action.type) {
    case "login":
      return { id: action.payload.id, img: action.payload.img };
    case "logout":
      return { id: null, img: null };
    case "updatePic":
      return { ...state, img: action.payload.img };
    case "deletePic":
      return { ...state, img: null };
    default:
      return state;
  }
}
