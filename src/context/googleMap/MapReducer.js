import {
  QUERY_MAP,
  TABLE_VISIBLE_ROWS_CHANGE_MAP,
  CHANGE_BOUNDS_MAP,
  TABLE_HOVERED_ROWS_INDEX_CHANGE_MAP,
  MARKER_HOVER_INDEX_CHANGE_MAP,
  SHOW_POPUP_MAP,
} from "../types";

// cada reducer tiene su propio state
const initialState = {
  data: [],
  dataFiltered: [],
  mapInfo: {
    center: [-34.8833, -56.1667],
    // set for server rendering for popular screen res
    bounds: [
      60.325132160343145, 29.13415407031249, 59.546382183279206,
      31.54015992968749,
    ],
    marginBounds: [
      60.2843135300829, 29.21655153124999, 59.58811868963835, 31.45776246874999,
    ],
    zoom: 13,
  },
  openPopupIndex: -1,
  hoverMarkerIndex: -1,
  tableRowsInfo: {
    hoveredRowIndex: -1,
    visibleRowFirst: 0,
    visibleRowLast: 5,
    maxVisibleRows: 5,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case QUERY_MAP:
      return {
        ...state,
        openPopupIndex: -1,
      };
    case TABLE_VISIBLE_ROWS_CHANGE_MAP:
      return {
        ...state,
        tableRowsInfo: { ...state.tableRowsInfo, ...action.payload },
        openPopupIndex: -1,
      };
    case CHANGE_BOUNDS_MAP:
      return {
        ...state,
        openPopupIndex: -1,
        mapInfo: action.payload,
      };
    case TABLE_HOVERED_ROWS_INDEX_CHANGE_MAP:
      return {
        ...state,
        tableRowsInfo: action.payload,
      };
    case MARKER_HOVER_INDEX_CHANGE_MAP:
      return {
        ...state,
        hoverMarkerIndex: action.payload,
      };
    case SHOW_POPUP_MAP:
      return {
        ...state,
        openPopupIndex: action.payload,
      };

    default:
      return state;
  }
}
