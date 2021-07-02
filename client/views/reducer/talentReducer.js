import {
  TALENT_FIND_REQUEST,
  TALENT_FIND_SUCCESS,
  TALENT_FIND_FAIL,
  TALENT_FINDONE_REQUEST,
  TALENT_FINDONE_FAIL,
  TALENT_FINDONE_SUCCESS,
  TALENT_SEARCH_FAIL,
  TALENT_SEARCH_REQUEST,
  TALENT_SEARCH_SUCCESS,
  TALENT_PAGING_REQUEST,
  TALENT_PAGING_SUCCESS,
  TALENT_PAGING_FAIL
  
} from "../constants/talentConstans";

export const talentListReducer = (state = {}, action) => {
  switch (action.type) {
    case TALENT_FIND_REQUEST:
      return { loading: true };
    case TALENT_FIND_SUCCESS:
      return { loading: true, talent: action.payload.data };
    case TALENT_FIND_FAIL:
      return { loading: false, error: action.payload };

     
    default:
      return state;
  }
};

export const talentPageReducer = (state = {}, action) => {
  switch(action.type){
      case TALENT_PAGING_REQUEST:
          return {loading:true}
      case TALENT_PAGING_SUCCESS:
          return {loading:true, talent:action.payload}
      case TALENT_PAGING_FAIL:
          return {loading:false, error:action.payload}
          case TALENT_SEARCH_REQUEST:
            return { loading: true };
          case TALENT_SEARCH_SUCCESS:
            return { loading: false, searching: action.payload };
          case TALENT_SEARCH_FAIL:
            return { loading: false, error: action.payload };
      default:
          return state
  }
}

export const talentListOneReducer = (state = {}, action) => {
  switch (action.type) {
    case TALENT_FINDONE_REQUEST:
      return { loading: true };
    case TALENT_FINDONE_SUCCESS:
      return { loading: true, talent: action.payload };
    case TALENT_FINDONE_FAIL:
      return { loading: false, error: action.payload };

   
    default:
      return state;
  }
};
