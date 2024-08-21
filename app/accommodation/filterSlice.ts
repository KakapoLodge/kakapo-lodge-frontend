import { createSlice } from "@reduxjs/toolkit";
import {
  ACCOMMODATION_NAME_IDS,
  GROUND_FLOOR_NAME_IDS,
  PRIVATE_BATHROOM_NAME_IDS,
  PRIVATE_ROOM_NAME_IDS,
  SEPARATE_BEDS_NAME_IDS,
} from "./content";
import { AccommodationNameId } from "./types";

type FilterState = {
  matchingNameIds: AccommodationNameId[];
  isPrivateRoom: boolean;
  havePrivateBathroom: boolean;
  haveSeparateBeds: boolean;
  onGroundFloor: boolean;
};

const initialState: FilterState = {
  matchingNameIds: [...ACCOMMODATION_NAME_IDS],
  isPrivateRoom: false,
  havePrivateBathroom: false,
  haveSeparateBeds: false,
  onGroundFloor: false,
};

const toggleFilterPrivateRoom = (state: FilterState) => {
  const newFilterValue = !state.isPrivateRoom;
  const accommodationIds = filterAccommodation({
    ...state,
    isPrivateRoom: newFilterValue,
  });

  state.matchingNameIds = accommodationIds;
  state.isPrivateRoom = newFilterValue;
};

const toggleFilterPrivateBathroom = (state: FilterState) => {
  const newFilterValue = !state.havePrivateBathroom;
  const accommodationIds = filterAccommodation({
    ...state,
    havePrivateBathroom: newFilterValue,
  });

  state.matchingNameIds = accommodationIds;
  state.havePrivateBathroom = newFilterValue;
};

const toggleFilterSeparateBeds = (state: FilterState) => {
  const newFilterValue = !state.haveSeparateBeds;
  const accommodationIds = filterAccommodation({
    ...state,
    haveSeparateBeds: newFilterValue,
  });

  state.matchingNameIds = accommodationIds;
  state.haveSeparateBeds = newFilterValue;
};

const toggleFilterGroundFloor = (state: FilterState) => {
  const newFilterValue = !state.haveSeparateBeds;
  const accommodationIds = filterAccommodation({
    ...state,
    onGroundFloor: newFilterValue,
  });

  state.matchingNameIds = accommodationIds;
  state.haveSeparateBeds = newFilterValue;
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleFilterPrivateRoom,
    toggleFilterPrivateBathroom,
    toggleFilterSeparateBeds,
    toggleFilterGroundFloor,
  },
});

const filterAccommodation = (filterState: FilterState) => {
  let accommodationIds = new Set(ACCOMMODATION_NAME_IDS);

  if (filterState.isPrivateRoom) {
    accommodationIds = accommodationIds.intersection(PRIVATE_ROOM_NAME_IDS);
  }

  if (filterState.havePrivateBathroom) {
    accommodationIds = accommodationIds.intersection(PRIVATE_BATHROOM_NAME_IDS);
  }

  if (filterState.haveSeparateBeds) {
    accommodationIds = accommodationIds.intersection(SEPARATE_BEDS_NAME_IDS);
  }

  if (filterState.onGroundFloor) {
    accommodationIds = accommodationIds.intersection(GROUND_FLOOR_NAME_IDS);
  }

  return [...accommodationIds];
};
