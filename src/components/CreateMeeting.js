//import { AuthContext } from "./Auth";
import React, { useContext, useEffect } from "react";
import { UserDataContext } from "./UserDataContext";
import { useState } from "react";
import axios from "axios";
import "./CreateMeeting.css";
import SelectAvailableHours from "./SelectAvailableHours";

const CreateMeeting = () => {
  //const { currentUser } = useContext(AuthContext);
  const { setIdGlobal, formGlobal, setFormG } = useContext(UserDataContext);
  const [form, setForm] = useState({
    nombre: "",
    duracion: "",
    cantidad: 0,
    evento: "",
    horarios: {
      domingo: {
        isChecked: false,
        schedule: [],
      },
      lunes: {
        isChecked: false,
        schedule: [],
      },
      martes: {
        isChecked: false,
        schedule: [],
      },
      miercoles: {
        isChecked: false,
        schedule: [],
      },
      jueves: {
        isChecked: false,
        schedule: [],
      },
      viernes: {
        isChecked: false,
        schedule: [],
      },
      sabado: {
        isChecked: false,
        schedule: [],
      },
    },
  });

  let [error, setError] = useState("");

  const hours = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  //ME TRAJE ESTO -------------------------------
  /*const horas = [
    "00:00",
    "00:15",
    "00:30",
    "00:45",
    "01:00",
    "01:15",
    "01:30",
    "01:45",
    "02:00",
    "02:15",
    "02:30",
    "02:45",
    "03:00",
    "03:15",
    "03:30",
    "03:45",
    "04:00",
    "04:15",
    "04:30",
    "04:45",
    "05:00",
    "05:15",
    "05:30",
    "05:45",
    "06:00",
    "06:15",
    "06:30",
    "06:45",
    "07:00",
    "07:15",
    "07:30",
    "07:45",
    "08:00",
    "08:15",
    "08:30",
    "08:45",
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
    "20:15",
    "20:30",
    "20:45",
    "21:00",
    "21:15",
    "21:30",
    "21:45",
    "22:00",
    "22:15",
    "22:30",
    "22:45",
    "23:00",
    "23:15",
    "23:30",
    "23:45",
  ];*/

  //cada vez que form cambia, el Form Global se actualiza
  useEffect(() => {
    setFormG(form);
    //console.log(form);
  }, [form]);

  /*la primera vez que el componente carga, 
  / se revisa si FormGlobal contiene info y la carga, de lo contrario se inicia form vacio*/
  useEffect(() => {
    if (Object.keys(formGlobal).length !== 0) {
      setForm(formGlobal);
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    //console.log(form);
  };

  //esta funcion actualiza el horario segun los cambios del componente SelectAvailableHours
  const setFormSchedule = (schedule) => {
    //console.log(form);
    setForm({ ...form, horarios: schedule });
  };

  const handleSubmit = async (e, form) => {
    e.preventDefault();
    if (form.duracion !== "" && form.nombre !== "" && form.cantidad !== "") {
      //convertir horarios a formato 'L-600-720'
      function getMinutesFromTime(time) {
        const [hours, minutes] = time.split(":");
        return parseInt(hours) * 60 + parseInt(minutes);
      }

      function convertIntervalsToMinutes(intervals) {
        const tiempoPropuesto = [];

        for (const day in intervals) {
          const daySchedule = intervals[day].schedule.map((interval) => {
            const [start, end] = interval.split("-");
            const startMinutes = getMinutesFromTime(start);
            const endMinutes = getMinutesFromTime(end);
            return `${day}--${startMinutes}-${endMinutes}`;
          });

          tiempoPropuesto.push(...daySchedule);
        }

        return tiempoPropuesto;
      }

      //CHECA EL OUPUT
      console.log(convertIntervalsToMinutes(form.horarios));
      const proposedHours = convertIntervalsToMinutes(form.horarios);

      const res = await axios.post(
        "https://camtomx-4c4e45a60b73.herokuapp.com/api/apps/w2m/new-meeting",
        {
          lengthMeeting: form.cantidad,
          expirationDate: form.duracion,
          adminName: form.nombre,
          eventName: form.evento,
          adminHours: proposedHours,
        }
      );
      const idMeeting = res.data.meetingId;
      setIdGlobal(form, idMeeting);
      //console.log(form);
      //console.log(res.data.meetingId);
    } else {
      setError("Necesitas completar todos los campos");
      setTimeout(() => {
        setError("");
      }, 2000);
      //console.log(setError);
    }
  };

  return (
    <div className="createmeeting-container">
      <h1>Crea un nuevo evento</h1>
      <form>
        <div className="label-container">
          <span className="createMeeting-span">1</span>
          <label htmlFor="nombre">¿Cómo te gusta que te llamen?</label>
        </div>
        <input
          onChange={handleChange}
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Ej. Pepe"
          autoComplete="off"
          value={form.nombre}
        />
        <div className="label-container">
          <span className="createMeeting-span">2</span>
          <label htmlFor="evento">Elige un nombre para tu evento</label>
        </div>
        <input
          onChange={handleChange}
          type="text"
          id="evento"
          name="evento"
          placeholder="Nombre del evento"
          autoComplete="off"
          value={form.evento}
        />
        <div className="label-container">
          <span className="createMeeting-span">3</span>
          <label>Selecciona el limite del evento y su duración</label>
        </div>
        <div className="duration">
          <div className="duration-days">
            <input
              onChange={handleChange}
              type="number"
              name="cantidad"
              id="days"
              min="0"
              placeholder="0"
              value={form["cantidad"]}
            />
            <label htmlFor="days">Días</label>
          </div>
          <div className="duration-minutes">
            <select
              name="duracion"
              id="minutes"
              value={form.duracion}
              onChange={handleChange}
            >
              {hours.map((el, index) => (
                <option key={index} value={el}>
                  {el}
                </option>
              ))}
            </select>
            <label htmlFor="minutes">Minutos</label>
          </div>
        </div>
        {/*seccion calendario (dias/horas)*/}
        <div className="label-container">
          <span className="createMeeting-span">4</span>
          <label>
            Selecciona los días y horarios que propones para tu evento
          </label>
        </div>

        <SelectAvailableHours
          setFormScheduleParentComponent={setFormSchedule}
        />
        {/*Aqui acaba la seccion calendario*/}
        <span style={{ color: "red" }}>{error}</span>
        <button onClick={(e) => handleSubmit(e, form)}>Crear</button>
      </form>
      {/*}
      {currentUser ? (
        <p>
          You are logged - <Link to="/dashboard">View Dashboard</Link>
        </p>
      ) : (
        <p>
          <Link to="/login">Log In</Link>
        </p>
      )}*/}
    </div>
  );
};

export default CreateMeeting;
