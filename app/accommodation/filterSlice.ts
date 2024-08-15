import { createSlice } from "@reduxjs/toolkit";
import {
  ALL_NAME_IDS,
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
};

const initialState: FilterState = {
  matchingNameIds: [...ALL_NAME_IDS],
  isPrivateRoom: false,
  havePrivateBathroom: false,
  haveSeparateBeds: false,
};

const toggleFilterPrivateRoom = (state: FilterState) => {
  const newFilterValue = !state.isPrivateRoom;
  const accommodationIds = filterAccommodation(
    newFilterValue,
    state.havePrivateBathroom,
    state.haveSeparateBeds,
  );

  state.matchingNameIds = accommodationIds;
  state.isPrivateRoom = newFilterValue;
};

const toggleFilterPrivateBathroom = (state: FilterState) => {
  const newFilterValue = !state.havePrivateBathroom;
  const accommodationIds = filterAccommodation(
    state.isPrivateRoom,
    newFilterValue,
    state.haveSeparateBeds,
  );

  state.matchingNameIds = accommodationIds;
  state.havePrivateBathroom = newFilterValue;
};

const toggleFilterSeparateBeds = (state: FilterState) => {
  const newFilterValue = !state.haveSeparateBeds;
  const accommodationIds = filterAccommodation(
    state.isPrivateRoom,
    state.havePrivateBathroom,
    newFilterValue,
  );

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
  },
});

const filterAccommodation = (
  isPrivateRoom: boolean,
  isPrivateBathroom: boolean,
  haveSeparateBeds: boolean,
) => {
  let accommodationIds = new Set(ALL_NAME_IDS);

  if (isPrivateRoom) {
    accommodationIds = accommodationIds.intersection(PRIVATE_ROOM_NAME_IDS);
  }

  if (isPrivateBathroom) {
    accommodationIds = accommodationIds.intersection(PRIVATE_BATHROOM_NAME_IDS);
  }

  if (haveSeparateBeds) {
    accommodationIds = accommodationIds.intersection(SEPARATE_BEDS_NAME_IDS);
  }

  return [...accommodationIds];
};
