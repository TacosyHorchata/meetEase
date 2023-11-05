import React, { useEffect } from "react";
import { useState } from "react";
import "./SelectAvailableHours.css";

const SelectAvailableHours = ({ setFormScheduleParentComponent }) => {
  const [form, setForm] = useState({
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

  const horas = [
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
  ];


  useEffect(() => {
    console.log(form);
    setFormScheduleParentComponent(form.horarios);
  }, [form]);

  /*const dias = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];*/

  const handleChecked = (e) => {
    //se crea un duplicado del form con el cambio check o unchecked al respectivo dia
    const newHorarios = {
      ...form.horarios,
      [e.target.name]: {
        ...form.horarios[e.target.name],
        isChecked: !form.horarios[e.target.name]?.isChecked,
      },
    };
    //se sobreescribe el form
    setForm({
      ...form,
      horarios: newHorarios,
    });
  };
  //agrega un intervalo de horas vacio (00:00 - 00:00)
  const handleAddSchedule = (e, dia) => {
    console.log(dia, form);
  
    let newSchedule;
    const currentSchedule = form.horarios[dia].schedule;
  
    if (currentSchedule.length === 0) {
      newSchedule = "00:00-00:15";
    } else {
      const lastInterval = currentSchedule[currentSchedule.length - 1];
      const [begin, end] = lastInterval.split("-");
      const [endHour, endMin] = end.split(":");
      let beginHourNew = Number(end.split(":")[0]);
      let beginMinNew = Number(endMin) + 15;
      let endHourNew = Number(end.split(":")[0]);
      let endMinNew = Number(endMin) + 30;

  
      if (beginMinNew >= 60) {
        beginMinNew -= 60;
        beginHourNew += 1;
      }

      if (endMinNew >= 60) {
        endMinNew -= 60;
        endHourNew += 1;
      }
  
      if (endHourNew >= 24) {
        return; // Don't add intervals past 23:45
      }

      if(beginMinNew==0){beginMinNew="00"}
  
      if (beginHourNew < 10) {
        newSchedule = `0${beginHourNew}:${beginMinNew}-${endHourNew}:${endMinNew}`;
      } else if (endHourNew<10){
        newSchedule = `0${beginHourNew}:${beginMinNew}-0${endHourNew}:${endMinNew}`;
      } else{
        newSchedule = `${beginHourNew}:${beginMinNew}-${endHourNew}:${endMinNew}`
      }
    }
  
    setForm({
      ...form,
      horarios: {
        ...form.horarios,
        [dia]: {
          ...form.horarios[dia],
          schedule: [...currentSchedule, newSchedule],
        },
      },
    });
  };
  
  const handleRemoveSchedule = (e, dia, indexToRemove) => {
    setForm((prevForm) => {
      const updatedHorarios = { ...prevForm.horarios };
      const updatedSchedule = [...updatedHorarios[dia].schedule];

      updatedSchedule.splice(indexToRemove, 1);

      updatedHorarios[dia] = {
        ...updatedHorarios[dia],
        schedule: updatedSchedule,
      };

      return {
        ...prevForm,
        horarios: updatedHorarios,
      };
    });
  };

  const handleSelectChange = (e, type, dia, index) => {
    const selectedValue = e.target.value;

    setForm((prevForm) => {
      const updatedHorarios = { ...prevForm.horarios };
      const updatedSchedule = [...updatedHorarios[dia].schedule];
      const inicioIntervalo = updatedSchedule[index].split("-")[0];
      const finIntervalo = updatedSchedule[index].split("-")[1];
      let updatedInterval;
  
      if (type === "inicio") {

        updatedInterval = selectedValue + "-" + finIntervalo;

        /*if (index > 0) {
          const intervaloFinalAnterior = updatedSchedule[index - 1]
            .split("-")[1]
            .replace(":", "");

          if (Number(selectedValue.replace(":", "")) < Number(intervaloFinalAnterior)) {
            console.log('horario sobrepuestos')
            return;
          }
        } */
      } else if (type === "fin") {
        updatedInterval = inicioIntervalo + "-" + selectedValue;

        /*if ( Number(selectedValue.replace(":", "")) < Number(inicioIntervalo.replace(":", ""))) {
          console.log('horario invalido')
          return;
        }*/
      } 

      updatedSchedule[index] = updatedInterval;
      updatedHorarios[dia] = {
        ...updatedHorarios[dia],
        schedule: updatedSchedule,
      };

      return {
        ...prevForm,
        horarios: updatedHorarios,
      };
    });
  };

 const daySchedule = (dia) =>{
  return(
      <div className="column-schedule">
      {form.horarios[dia].isChecked ? (
        form.horarios[dia]?.schedule?.map((intervalo, index) => (
          <div key={index} id={index}>
            <div className="div-schedule">
              <select
                onChange={(e) =>
                  handleSelectChange(e, "inicio", dia, index)
                }
              >
                {horas.map((horaInicio, indexHoras) => {
                  const startHour = Number(horaInicio.replace(":", ""));
                  const prevEndHour = Number(
                    form.horarios[dia]?.schedule[index - 1]?.split("-")[1].replace(":", "")
                  );
                  const currentEndHour = Number(
                    form.horarios[dia]?.schedule[index]?.split("-")[1].replace(":", "")
                  );
                  const isDisabled =
                    startHour <= prevEndHour ||
                    (startHour >= currentEndHour && currentEndHour !== 0);

                  if (!isDisabled) {
                    return (
                      <option key={indexHoras} 
                      value={horaInicio}
                      selected={horaInicio === intervalo.split("-")[0]}
                      >
                        {horaInicio}
                      </option>
                    );
                  }

                  return null; // Don't render the option
              })}

              </select>
              <p>-</p>
              <select
                onChange={(e) =>
                  handleSelectChange(e, "fin", dia, index)
                }
              >
                {horas.map((horaFin, indexHoras) => {
                  const endHour = Number(horaFin.replace(":", ""));
                  const startHour = Number(intervalo.split("-")[0].replace(":", ""));
                  const startHourNextIndex = Number(form.horarios[dia].schedule[index+1]?.split("-")[0].replace(":", ""))
                  const isDisabled = endHour <= startHour || endHour >= startHourNextIndex;

                  if(!isDisabled){
                    return (
                      <option
                        key={indexHoras}
                        value={horaFin}
                        selected={horaFin === intervalo.split("-")[1]}
                      >
                        {horaFin}
                      </option>
                    );
                  }
                  return null;
                })}

              </select>
            </div>

            <div className="trash">
              <ion-icon
                name="trash"
                onClick={(e) => handleRemoveSchedule(e, dia, index)}
              ></ion-icon>
            </div>
          </div>
        ))
      ) : (
        <span>No seleccionado</span>
      )}
    </div>
  )
 }


  return (
    <div className="Schedules-Form">
      <section className="schedules-container">

        <div className="day">
          <div className="column-day">
            <div className="checkbox">
              <input
                type="checkbox"
                name="domingo"
                id="domingo"
                checked={form.horarios.domingo.isChecked}
                onChange={handleChecked}
              />
              <label htmlFor="domingo">Domingo</label>
            </div>
            <div className="icons">
              <ion-icon
                name="add"
                onClick={(e) => handleAddSchedule(e, "domingo")}
              ></ion-icon>
              <ion-icon name="copy"></ion-icon>
            </div>
          </div>
          {daySchedule("domingo")}
        </div>

        <div className="day">
          <div className="column-day">
            <div className="checkbox">
              <input
                type="checkbox"
                name="lunes"
                id="lunes"
                checked={form.horarios.lunes.isChecked}
                onChange={handleChecked}
              />
              <label htmlFor="lunes">Lunes</label>
            </div>
            <div className="icons">
              <ion-icon
                name="add"
                onClick={(e) => handleAddSchedule(e, "lunes")}
              ></ion-icon>
              <ion-icon name="copy"></ion-icon>
            </div>
          </div>
          {daySchedule("lunes")}
        </div>

        <div className="day">
          <div className="column-day">
            <div className="checkbox">
              <input
                type="checkbox"
                name="martes"
                id="martes"
                checked={form.horarios.martes.isChecked}
                onChange={handleChecked}
              />
              <label htmlFor="martes">Martes</label>
            </div>
            <div className="icons">
              <ion-icon
                name="add"
                onClick={(e) => handleAddSchedule(e, "martes")}
              ></ion-icon>
              <ion-icon name="copy"></ion-icon>
            </div>
          </div>
          {daySchedule("martes")}
        </div>

        <div className="day">
          <div className="column-day">
            <div className="checkbox">
              <input
                type="checkbox"
                name="miercoles"
                id="miercoles"
                checked={form.horarios.miercoles.isChecked}
                onChange={handleChecked}
              />
              <label htmlFor="miercoles">Miércoles</label>
            </div>
            <div className="icons">
              <ion-icon
                name="add"
                onClick={(e) => handleAddSchedule(e, "miercoles")}
              ></ion-icon>
              <ion-icon name="copy"></ion-icon>
            </div>
          </div>
          {daySchedule("miercoles")}
        </div>

        <div className="day">
          <div className="column-day">
            <div className="checkbox">
              <input
                type="checkbox"
                name="jueves"
                id="jueves"
                checked={form.horarios.jueves.isChecked}
                onChange={handleChecked}
              />
              <label htmlFor="jueves">Jueves</label>
            </div>
            <div className="icons">
              <ion-icon
                name="add"
                onClick={(e) => handleAddSchedule(e, "jueves")}
              ></ion-icon>
              <ion-icon name="copy"></ion-icon>
            </div>
          </div>
          {daySchedule("jueves")}
        </div>

        <div className="day">
          <div className="column-day">
            <div className="checkbox">
              <input
                type="checkbox"
                name="viernes"
                id="viernes"
                checked={form.horarios.viernes.isChecked}
                onChange={handleChecked}
              />
              <label htmlFor="viernes">Viérnes</label>
            </div>
            <div className="icons">
              <ion-icon
                name="add"
                onClick={(e) => handleAddSchedule(e, "viernes")}
              ></ion-icon>
              <ion-icon name="copy"></ion-icon>
            </div>
          </div>
          {daySchedule("viernes")}
        </div>

        <div className="day">
          <div className="column-day">
            <div className="checkbox">
              <input
                type="checkbox"
                name="sabado"
                id="sabado"
                checked={form.horarios.sabado.isChecked}
                onChange={handleChecked}
              />
              <label htmlFor="sabado">Sábado</label>
            </div>
            <div className="icons">
              <ion-icon
                name="add"
                onClick={(e) => handleAddSchedule(e, "sabado")}
              ></ion-icon>
              <ion-icon name="copy"></ion-icon>
            </div>
          </div>
          {daySchedule("sabado")}
        </div>
      </section>
    </div>
  );
};

export default SelectAvailableHours;
/*
    {dias.map((dia) => (
          <div className="day">
            <div className="column-day">
              <div className="checkbox">
                <input
                  type="checkbox"
                  name={dia}
                  id={dia}
                  checked={form.horarios[dia]?.isChecked}
                  onChange={handleChecked}
                />
                <label htmlFor={dia}>{dia}</label>
              </div>
              <div className="icons">
                <ion-icon
                  name="add"
                  onClick={(e) => handleAddSchedule(e, dia)}
                ></ion-icon>
                <ion-icon name="copy"></ion-icon>
              </div>
            </div>
            <div className="column-schedule">
              {form.horarios[dia]?.isChecked ? (
                form.horarios[dia]?.schedule?.map((intervalo, index) => (
                  <div key={index} id={index}>
                    <div className="div-schedule">
                      <select
                        onChange={(e) =>
                          handleSelectChange(e, "inicio", dia, index)
                        }
                      >
                        {horas.map((horaInicio, index) => (
                          <option
                            key={index}
                            value={horaInicio}
                            selected={horaInicio === intervalo.split("-")[0]}
                          >
                            {horaInicio}
                          </option>
                        ))}
                      </select>
                      <p>-</p>
                      <select
                        onChange={(e) =>
                          handleSelectChange(e, "fin", dia, index)
                        }
                      >
                        {horas.map((horaFin, index) => (
                          <option
                            key={index}
                            value={horaFin}
                            selected={horaFin === intervalo.split("-")[1]}
                          >
                            {horaFin}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="trash">
                      <ion-icon
                        name="trash"
                        onClick={(e) => handleRemoveSchedule(e, dia, index)}
                      ></ion-icon>
                    </div>
                  </div>
                ))
              ) : (
                <span>No seleccionado</span>
              )}
            </div>
          </div>
        ))}
*/
//
