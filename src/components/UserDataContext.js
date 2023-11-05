import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";

export const UserDataContext = React.createContext();

export const UserDataProvider = ({ children }) => {
  const navigate = useNavigate();
  let [id, setId] = useState("");
  let [name, setName] = useState("");

  const [isChecked, setIsChecked] = useState([]); //dias con check
  //const [myIndex, setMyIndex] = useState(0);
  const [arrayHours, setArrayHours] = useState([]);
  const [token, setToken] = useState("");
  const [nombre, setNombre] = useState("");

  //este estado almacena todos los cambios del form para crear una nueva meeting
  const [formGlobal, setFormGlobal] = useState({});

  // Funciones

  const setIdGlobal = async (form, idMeeting) => {
    const formData = {
      nombre: form.nombre,
      duracion: form.duracion,
      cantidad: form["cantidad"],
    };
    setId(idMeeting);
    navigate(`/meeting/${idMeeting}`, { state: { formData, idMeeting } });
    console.log(idMeeting);
  };

  const setNameGlobal = async (nombre) => {
    await setName(nombre);
    console.log("nombre desde el context", name);
  };

  //AGREGUE ESTA FUNCION -------------------------
  const setFormG = async (form) => {
    setFormGlobal(form);
  };
  //------------

  /*
  function handleClickRemove(e) {
    console.log(e.target.parentElement.parentElement.parentElement);
    console.log(arrayHours);
    const parentElement = e.target.parentElement.parentElement.parentElement;
    const removedIndex = parseInt(parentElement.getAttribute("id"), 10);

    const newArrayHours = arrayHours.filter(
      (element, index) => index !== removedIndex
    );

    setArrayHours(newArrayHours);
  }

  const handleChecked = (e) => {
    setIsChecked(!isChecked);
    if (arrayHours.length > 0) {
      setArrayHours([...arrayHours]);
    } else {
      setArrayHours([bla]);
    }
  };

  const bla = (
    <div key={myIndex} id={myIndex}>
      <div className="div-schedule">
        <select name="" id="">
          {horas.map((e, index) => (
            <option value="e" key={index}>
              {e}
            </option>
          ))}
        </select>
        <p>-</p>
        <select name="" id="">
          {horas.map((e, index) => (
            <option value="e" key={index}>
              {e}
            </option>
          ))}
        </select>
      </div>

      <div className="trash">
        <ion-icon name="trash" onClick={handleClickRemove}></ion-icon>
      </div>
    </div>
  );

  const handleClickAdd = () => {
    const newIndex = myIndex + 1;
    setMyIndex(newIndex);
    //console.log(myIndex);

    const newBla = (
      <div key={newIndex} id={newIndex}>
        <div className="div-schedule">
          <select name="" id="">
            {horas.map((e, index) => (
              <option value="e" key={index}>
                {e}
              </option>
            ))}
          </select>
          <p>-</p>
          <select name="" id="">
            {horas.map((e, index) => (
              <option value="e" key={index}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div className="trash">
          <ion-icon name="trash" onClick={handleClickRemove}></ion-icon>
        </div>
      </div>
    );
    setArrayHours([...arrayHours, newBla]);
  };*/

  const handleChange = (e) => {
    setToken(e.target.value);
  };
  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  useEffect(() => {
    console.log(arrayHours);
  }, [arrayHours]);
  useEffect(() => {
    console.log(token);
  }, [token]);
  useEffect(() => {
    console.log("nombre desde el context", name);
  }, [name]);
  const data = {
    setIdGlobal,
    setNameGlobal,
    handleChangeNombre,
    nombre,
    name,
    id,
    arrayHours,
    isChecked,
    handleChange,
    token,
    setToken,

    //AGREGUE ESTOS EXPORTS ------------------
    formGlobal,
    setFormG,
  };
  return (
    <UserDataContext.Provider value={data}>{children}</UserDataContext.Provider>
  );
};

/*
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserDataContext = React.createContext();

export const UserDataProvider = ({ children }) => {
  const navigate = useNavigate();
  let [error, setError] = useState("");
  let [id, setId] = useState(0);
  const [form, setForm] = useState({
    nombre: "",
    duracion: "",
    cantidad: 0,
  });

  // Funciones

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };

  const handleSubmit = (e, form) => {
    e.preventDefault();

    if (form.duracion !== "" && form.nombre !== "" && form.cantidad !== "") {
      console.log(form.nombre, form.duracion, form["cantidad"]);
      const formData = {
        nombre: form.nombre,
        duracion: form.duracion,
        cantidad: form["cantidad"],
      };
      const idMeeting = Math.floor(Math.random() * 999999999) + 1;
      //console.log(idMeeting);
      setId(idMeeting);
      navigate(`/meeting/:${idMeeting}`, { state: { formData, id } });
    } else {
      setError("Necesitas completar todos los campos");
      setTimeout(() => {
        setError("");
      }, 2000);
      //console.log(setError);
    }
  };

  const data = { form, handleChange, handleSubmit, error, id };
  return (
    <UserDataContext.Provider value={data}>{children}</UserDataContext.Provider>
  );
};

/*

let usuarios= [
    {
       userName: 'Mariana8765', 
       horariosDisponibles: ['23092023-120-430', '23092023-215-310', '24092023-450-320']
    },
    {
       userName: 'Pedro6755', 
       horariosDisponibles: ['23092023-210-430', '25092023-215-310', '24092023-250-320']
    },
    {
       userName: 'Lola0987', 
       horariosDisponibles: ['22092023-120-430', '23092023-215-310', '24092023-450-320']
    },
    ]

var fechaActual = new Date();
var diasASumar = 26;

 let dia;
let arrayDia = [];
    

for(var i = 1; i <= diasASumar; i++){
  var fechaNueva = new Date(fechaActual);
  fechaNueva.setDate(fechaActual.getDate() + i)
    
  var dd = fechaNueva.getDate()
  var mm = '0'.concat(fechaNueva.getMonth())
  var yy = fechaNueva.getFullYear()
   
  let claveDia = `${dd}-${mm}-${yy}`;
  let objDia = {};
  objDia[claveDia] = []
  dia.push(objDia)

   
  // Crear objeto con clave de cada dia y valor de array
  // para rellenarlo con tooodos los dias repetidos y comparar
  // para luego filtrar
  let clave = `${dd}${mm}${yy}`;
  let obj = {};
  obj[clave] = []
  arrayDia.push(obj)
  
  
  
   
}
  // Metiendo las horas en el dia correspondiente

   arrayDia.forEach(e => {
    const clave = Object.keys(e)[0];
    //console.log(clave)
        usuarios.forEach(el => {
     
            el.horariosDisponibles.forEach(element => {
                if (clave === element.split('-')[0]) {
                e[clave].push(element.replace(/^\d+-/, ''));
                }
                //console.log(element.replace(/^\d+-/, ''))
                //console.log(, 'hola')
            })
        })
 
    });
 
      
  
       console.log(arrayDia)


*/
