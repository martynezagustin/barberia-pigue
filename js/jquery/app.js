//in this archive, the most important topics are the form and the hour

//inputs
const name = $("#myForm__first-name");
const lastName = $("#myForm__last-name");
const inputDate = $("#myForm__datepicker");
const myForm = $("#myForm");

//hour
const setHour = () => {
  setInterval(() => {
    const fecha = new Date();
    //get dia string
    const dayWeeks = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const dayNumber = fecha.getDay();
    const dayString = dayWeeks[dayNumber];
    //get mes string
    const month = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const monthNumber = fecha.getMonth();
    const monthString = month[monthNumber];
    //get año
    const year = fecha.getFullYear();
    $("#hour").html(
      `<i>${dayString}. ${fecha.getDate()} de ${monthString} del ${year}. Son las <strong>${fecha.getHours()}:${fecha
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${fecha
        .getSeconds()
        .toString()
        .padStart(2, "0")}</strong></i>`
    );
    $("#hour").css("color", "white");
  }, 1000);
};

const setToast = (text, bgColor) => {
  return Toastify({
    text: text,
    close: true,
    style: {
      color: "white",
      background: bgColor,
      boxShadow: "none",
    },
  }).showToast();
}

setHour();

const sendForm = async (event) => {
  event.preventDefault();
  let data = new FormData(event.target);
  if (name.value == "" || lastName.value == "" || inputDate.value == "") {
    alert("Hay campos vacios.");
  } else {
    const fechaActual = new Date();
    const fechaForm = new Date(inputDate.val())
    console.log(fechaActual);
    console.log(fechaForm);
    if (fechaForm < fechaActual) {
      setToast("No puedes ingresar una fecha anterior a la actual.", "red");
    } else {
      fetch(event.target.action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            setToast("¡Felicidades! Acabas de agendar tu turno.", "black")
          } else {
            alert("UPS... Ocurrio un error, intentalo otro dia");
          }
        })
        .catch((err) => console.log("Hubo un error " + err));
    }
  }
};

myForm.submit(sendForm);
