//ACTIONS
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";

//REDUCERS
export const uploadImage = (image, reportId, favourite) => {
  return {
    type: UPLOAD_IMAGE,
    image,
    reportId,
    favourite,
  };
};

// STATE
const initialState = {
  image: undefined,
  reportId: undefined,
  favourite: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      const { image, reportId, favourite } = action;
      return {
        ...state,
        image: image,
        reportId: reportId,
        favourite: favourite,
      };

    default:
      return state;
  }
};
