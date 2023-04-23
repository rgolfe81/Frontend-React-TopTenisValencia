import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navigator.css";

export const Navigator = ({ ruta, destino }) => {
  const navigate = useNavigate();

  return (
    <div className="navigatorDesign" onClick={() => navigate(destino)}>
      {ruta}
    </div>
  );
};


