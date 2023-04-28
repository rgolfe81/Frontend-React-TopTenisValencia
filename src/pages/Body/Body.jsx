import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { Tournaments } from "../Tournaments/Tournaments";
import { Profile } from "../Profile/Profile";
import { SelectedTournament } from "../SelectedTournament/SelectedTournament";
import { PlayersTournament } from "../SelectedTournament/PlayersTournament";

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
      </Routes>
    </>
  );
};
