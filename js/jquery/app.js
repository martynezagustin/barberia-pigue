//hour
setInterval(() => {
    const fecha = new Date()
    //get dia string
    const dayWeeks = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const dayNumber = fecha.getDay()
    const dayString = dayWeeks[dayNumber]
    //get mes string
    const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const monthNumber = fecha.getMonth()
    const monthString = month[monthNumber]
    //get año
    const year = fecha.getFullYear()
    $("#hour").html(`<i>${dayString}. ${dayNumber} de ${monthString} del ${year}. Son las ${fecha.getHours()}:${fecha.getMinutes().toString().padStart(2,"0")}:${fecha.getSeconds().toString().padStart(2,"0")}</i>`)
    $("#hour").css("color", "white")
}, 1000);