import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinMeeting.css";
import { UserDataContext } from "./UserDataContext";
//import React from "react";

const JoinMeeting = () => {
  const { token, setNameGlobal } = useContext(UserDataContext);
  const [message, setMessage] = useState("");
  const [inputName, setInputName] = useState("");
  const navigate = useNavigate();
  //console.log("joinmeeting", token);
  //26IDIXU5
  const handleChange = (e) => {
    setInputName(e.target.value);
  };
  useEffect(() => {
    console.log(inputName);
  }, [inputName]);

  const handleSubmit = async (e) => {
    console.log(inputName);

    e.preventDefault();
    setNameGlobal(inputName);
    if (inputName && token) {
      navigate("/user-in-meeting");
    } else if (!token || token === undefined) {
      setMessage(`Necesitas el Id de la reunión\nVuelve al home`);
      setTimeout(() => {
        setMessage("");
      }, 1500);
    } else {
      setMessage("Necesitas proporcionar un nombre");
      setTimeout(() => {
        setMessage("");
      }, 1500);
    }
  };

  return (
    <div className="joinMeeting-container">
      <h1>Unirme al evento</h1>
      <form className="joinMeeting-inputs">
        <label htmlFor="nombre">¿Como te gusta que te llamen?</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          autoComplete="off"
          placeholder="Ej. Pepe"
          value={inputName}
          onChange={handleChange}
        />
        <span style={{ whiteSpace: "pre-line" }}>{message}</span>
        <button onClick={handleSubmit}>Unirme</button>
      </form>
      {/* Aquí va una redirección a la vista del usuario que se une y una petición para buscar el token y los datos de los dias*/}
    </div>
  );
};
export default JoinMeeting;
