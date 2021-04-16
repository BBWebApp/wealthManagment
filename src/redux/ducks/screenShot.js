//ACTIONS
export const SET_SCREENSHOTS = "SET_SCREENSHOTS";
export const GET_SCREENSHOTS = "GET_SCREENSHOTS";

//REDUCERS
export const getScreenShots = () => ({
  type: GET_SCREENSHOTS,
});
export const setScreenShots = (images) => ({
  type: SET_SCREENSHOTS,
  images: images,
});

// STATE
const initialState = {
  images: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREENSHOTS:
      const { images } = action;
      return { ...state, images: images };
    default:
      return state;
  }
};
