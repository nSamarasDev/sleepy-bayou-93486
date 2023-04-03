import {
  GET_CONTACT,
  CONTACT_ERROR,
  GET_CONTACTS,
  DELETE_CONTACT,
  CLEAR_CONTACTS,
} from "../actions/types";

const initialState = {
  contact: null,
  contacts: [],
  loading: true,
  error: {},
};

export default function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTACT:
      return {
        ...state,
        contact: payload,
        loading: false,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        contact: null,
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: payload,
        loading: false,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact._id !== payload),
        loading: false,
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contact: null,
        loading: false,
      };
    default:
      return state;
  }
}
