import { useContext, useEffect } from "react";
import { UserDataContext } from "./UserDataContext";
import "./UserInMeeting.css";
import axios from "axios";
import { useState } from "react";
import SelectAvailableHours from "./SelectAvailableHours";
import { useNavigate } from "react-router-dom";

const UserInMeeting = () => {
  const { token, handleChange, name } = useContext(UserDataContext);

  const [admin, setAdmin] = useState();
  const [duracion, setDuracion] = useState();
  const [minutos, setMinutos] = useState();
  const [idReunion, setIdReunion] = useState();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  //26IDIXU5
  useEffect(() => {
    async function fetch() {
      console.log("nombre desde user in meeting", name);
      try {
        const res = await axios(
          `https://camtomx-4c4e45a60b73.herokuapp.com/api/apps/w2m/get-meeting-info/${token}`
        );
        setAdmin(res.data.adminName);
        setDuracion(res.data.expirationDate);
        setMinutos(res.data.lengthMeeting);
        setIdReunion(res.data.meetingId);
        console.log(res);
      } catch (err) {
        console.log(err);
        // Poner un alert?
      }
    }
    fetch();
  }, []);

  const { formGlobal, setFormG } = useContext(UserDataContext);
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

  //ME TRAJE ESTO -------------------------------
  //cada vez que form cambia, el Form Global se actualiza
  useEffect(() => {
    setFormG(form);
    console.log(form)
  }, [form]);

  /*la primera vez que el componente carga, 
  / se revisa si FormGlobal contiene info y la carga, de lo contrario se inicia form vacio*/
  useEffect(() => {
    if (Object.keys(formGlobal).length !== 0) {
      setForm(formGlobal);
    }
  }, []);

  //esta funcion actualiza el horario segun los cambios del componente SelectAvailableHours
  const setFormSchedule = (schedule) => {
    setForm({ ...form, horarios: schedule });
  };

  const handleSubmit = async () => {
    const newNameUser = name;
    console.log(newNameUser);
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

    try {
      const res = await axios.put(
        "https://camtomx-4c4e45a60b73.herokuapp.com/api/apps/w2m/new-user-in-meeting",
        {
          meetingId: token,
          userName: name,
          availableHours: proposedHours,
        }
      );
      navigate(`/meeting-final/:${idReunion}`)
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const AddUserToMeeting = async (e) => {
    e.preventDefault();

    setMessage("Buscando reunión...");

    try {
      const res = await axios.get(
        `https://camtomx-4c4e45a60b73.herokuapp.com/api/apps/w2m/get-meeting-info/${token}`
      );
      console.log(res);

      if (res.status === 200) {
        navigate(`/join-meeting`);
        setMessage("Has entrado a la reunión");
        setTimeout(() => {
          setMessage("");
        }, 1500);
      }
    } catch (err) {
      if (err.response.status === 404) {
        setMessage("Token no encontrado");
        setTimeout(() => {
          setMessage("");
        }, 1500);
      }
    }
  };

  return (
    <div className="userInMeeting-container">
      {token && name ? (
        <>
          <h1>Nombre de reunión</h1>
          <p className="nombre">Bienvenid@ {name}</p>
          <div className="data-reunion">
            <p>
              El administrador del evento es <b>{admin}</b>
            </p>
            <p>
              Evento programado para <b>{duracion}</b> días
            </p>
            <p>
              Duración del evento: <b>{minutos}</b> minutos
            </p>
            <p>
              ID de la reunión: <b>{idReunion}</b>
            </p>
          </div>
          <div className="label-container">
            <span>1</span>
            <label>Elige el horario que mejor te funciona</label>
          </div>
          <section className="select-schedules">
            <SelectAvailableHours
              setFormScheduleParentComponent={setFormSchedule}
            />
            <span style={{ color: "red" }}>{error}</span>
            <button onClick={(e) => handleSubmit(e, form)}>Unirse</button>
          </section>
        </>
      ) : (
        <>
          <form className="form-desubicado">
            <p>ID requerido</p>
            <input
              type="text"
              placeholder="Ingresa el código aquí"
              id="token"
              value={token}
              name="token"
              onChange={handleChange}
              autoComplete="off"
            />

            <span>{message}</span>
            <button onClick={AddUserToMeeting}>Unirte al evento</button>
          </form>
        </>
      )}
    </div>
  );
};
export default UserInMeeting;
