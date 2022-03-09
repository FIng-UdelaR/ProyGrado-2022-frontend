import { useReducer } from "react";
import MapReducer from "./MapReducer";
import MapContext from "./MapContext";
import {
  QUERY_MAP,
  TABLE_VISIBLE_ROWS_CHANGE_MAP,
  CHANGE_BOUNDS_MAP,
  TABLE_HOVERED_ROWS_INDEX_CHANGE_MAP,
  MARKER_HOVER_INDEX_CHANGE_MAP,
  SHOW_POPUP_MAP,
} from "../types";

const MapState = (props) => {
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
        60.2843135300829, 29.21655153124999, 59.58811868963835,
        31.45776246874999,
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
  const [state, dispatch] = useReducer(MapReducer, initialState);

  const changeBounds = ({ center, zoom, bounds, marginBounds }) => {
    dispatch({
      type: CHANGE_BOUNDS_MAP,
      payload: { center, zoom, bounds, marginBounds },
    });
  };

  const tableVisibleRowsChange = (params) => {
    dispatch({
      type: TABLE_VISIBLE_ROWS_CHANGE_MAP,
      payload: params,
    });
  };

  const tableHoveredRowIndexChange = (hoveredRowIndex) => {
    dispatch({
      type: TABLE_HOVERED_ROWS_INDEX_CHANGE_MAP,
      payload: hoveredRowIndex,
    });
  };

  const markerHoverIndexChange = (hoverMarkerIndex) => {
    dispatch({
      type: MARKER_HOVER_INDEX_CHANGE_MAP,
      payload: hoverMarkerIndex,
    });
  };

  const showPopup = (openPopupIndex) => {
    dispatch({
      type: SHOW_POPUP_MAP,
      payload: openPopupIndex,
    });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,
        changeBounds,
        tableVisibleRowsChange,
        tableHoveredRowIndexChange,
        markerHoverIndexChange,
        showPopup,
      }}
    >
      {props.children}
    </MapContext.Provider>
  );
};

export default MapState;
