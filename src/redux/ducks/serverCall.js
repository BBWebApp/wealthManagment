//ACTIONS
export const GET_SLICEDIMAGE = "GET_SLICEDIMAGE";
export const SET_SLICEDIMAGE = "SET_SLICEDIMAGE";

//REDUCERS
export const getSlicedImage = (image) => ({
  type: GET_SLICEDIMAGE,
  image: image,
});

export const setSlicedImage = (slicedImage) => ({
  type: SET_SLICEDIMAGE,
  slicedImage: slicedImage,
});
// STATE
const initialState = {
  slicedImage: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SLICEDIMAGE:
      const { slicedImage } = action;
      return { ...state, slicedImage: slicedImage };
    default:
      return state;
  }
};
