import React, { useContext, useEffect } from "react";
import { UserDataContext } from "./UserDataContext";
import { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./MeetingId.css";

const MeetingId = () => {
  const { id } = useContext(UserDataContext);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    duracion: "",
    cantidad: 0,
    evento: "",
  });
  const params = useParams();
  const meetingId = params.id.replace(":", "");
  //console.log(params.id.replace(":", ""));
  useEffect(() => {
    async function fechData() {
      try {
        const res = await axios.get(
          `https://camtomx-4c4e45a60b73.herokuapp.com/api/apps/w2m/get-meeting-info/${meetingId}`,
          {
            params: {
              meetingId: id,
            },
          }
        );
        setForm({
          nombre: res.data.adminName,
          duracion: res.data.expirationDate,
          cantidad: res.data.lengthMeeting,
          evento: res.data.eventName,
        });

        //console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    fechData();
  }, [id, meetingId]);

  const handleCopyLink = () => {
    const linkToCopy = `https://whengomeetup.com/meeting-final/:${meetingId}`;
    try {
      navigator.clipboard.writeText(linkToCopy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      alert("No se pudo copiar el enlace: ", error);
    }
  };
  return (
    <div className="meeting-container">
      <section>
        <h1>¡Evento creado!</h1>
        <h5>
          Código de evento: <b>{meetingId}</b>
        </h5>
        <p>
          Podrás encontrar el mejor horario para ti y tus invitados en dabdo
          click en el botón de abajo.
        </p>
        <small>
          Invita a tus amigos a unirse a tu evento usando este enlace:
        </small>
        {copied && <span>copiado!</span>}
        <button className="copy-link" onClick={handleCopyLink}>
          {" "}
          <span>
            <ion-icon name="copy"></ion-icon>
          </span>
          Copy link
        </button>
        {/*
        <p>Evento {form.evento}</p>
        <p>Duracion del evento: {form.cantidad} días</p>
        <p>Tiempo: {form.duracion} minutos</p>
        */}

        <Link to={`/meeting-final/:${meetingId}`}>
          <button>Ver mejor horario</button>
        </Link>
        {/*Aqui debe ir una redirección al meetingFinal*/}
        <Link to={`/create-meeting`}>
          <button className="btn-excentrico">Crear nuevo evento</button>
        </Link>
        {/*Aqui va una redirección al createMeeting*/}
      </section>
    </div>
  );
};
export default MeetingId;
// 26IDIXU5 id de una reunion para pruebas
// enlace http://localhost:3000/meeting/26IDIXU5

/*
import React, { useContext } from "react";
import { UserDataContext } from "./UserDataContext";

const MeetingId = () => {
  const { form } = useContext(UserDataContext);
  const { id } = useContext(UserDataContext);
  const { nombre, duracion, cantidad } = form;

  console.log(nombre, duracion, cantidad, id);

  return (
    <div>
      <h1>Hola {nombre}</h1>
      <h5>El id de tu evento es: {id}</h5>
      <p>Nombre: {nombre}</p>
      <p>Duracion del evento: {cantidad} días</p>
      <p>Tiempo: {duracion} minutos</p>
    </div>
  );
};
export default MeetingId;
*/
