//ACTIONS
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";

//REDUCERS
export const uploadImage = (image, reportId) => {
  
  return {
    type: UPLOAD_IMAGE,
    image,
    reportId,
  };
};

// STATE
const initialState = {
  image: undefined,
  reportId: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      const { image, reportId } = action;
      return { ...state, image: image, reportId: reportId };

    default:
      return state;
  }
};
