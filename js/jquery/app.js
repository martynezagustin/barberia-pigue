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

setHour();

const fechaFormulario = new Date(inputDate.value);
const sendForm = async (event) => {
  event.preventDefault();
  let data = new FormData(event.target);
  const fechaActual = new Date();
  if (name.value == "" || lastName.value == "" || inputDate.value == "") {
    alert("Hay campos vacios.");
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
          Toastify({
            text: `Tus datos fueron enviados! Tu orden esta bajo el numero ${Math.floor(
              Math.random() * 6000
            )}`,
            close: true,
            style: {
              color: "white",
              background: "black",
              boxShadow: "none",
            },
          }).showToast();
        } else {
          alert("UPS... Ocurrio un error, intentalo otro dia");
        }
      })
      .catch((err) => console.log("Hubo un error " + err));
  }
};

const verificarFecha = () => {
  if (fechaFormulario < fechaActual) {
    alert("No puedes enviar una fecha anterior.");
  }
};

myForm.submit(sendForm);
