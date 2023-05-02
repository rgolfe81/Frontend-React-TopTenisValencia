import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { Tournaments } from "../Tournaments/Tournaments";
import { Profile } from "../Profile/Profile";
import { SelectedTournament } from "../SelectedTournament/SelectedTournament";
import { PlayersTournament } from "../PlayersTournament/PlayersTournament";
import { TennisMatches } from "../TennisMatches/TennisMatches";
import { Results } from "../Results/Results";
import { ResultsTennisMatches } from "../ResultsTennisMatches/ResultsTennisMatches";
import { Clasification } from "../Clasification/Clasification";

export const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/selectedTournament" element={<SelectedTournament />} />
        <Route path="/playersTournament" element={<PlayersTournament />} />
        <Route path="/tennisMatches" element={<TennisMatches />} />
        <Route path="/result" element={<Results />} />
        <Route path="/resultsTennisMatches" element={<ResultsTennisMatches />} />
        <Route path="/clasification" element={<Clasification />} />
      </Routes>
    </>
  );
};
