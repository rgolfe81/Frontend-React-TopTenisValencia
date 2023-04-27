import { createSlice } from "@reduxjs/toolkit";

export const tournamentSlice = createSlice({
  name: "tournamentId",
  initialState: {
    infoTournament: {}
  },
  reducers: {
    idTournament: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
  },
});

export const { idTournament } = tournamentSlice.actions;
export const tournamentIdData = (state) => state.tournamentId;
export default tournamentSlice.reducer;