const host = "api.frankfurter.app";
$(document).on("ready", function () {
  inputChnage("BRL");
  inputChnage("EUR");
  calcular();
  const host = "api.frankfurter.app";
  fetch(`https://${host}/currencies`)
    .then((resp) => resp.json())
    .then((data) => {
      for (const i of Object.keys(data)) {
        $("#selector_uno").append(
          '<option name="' + i + '">' + i + "</option>"
        );
        $("#selector_dos").append(
          '<option name="' + i + '">' + i + "</option>"
        );
      }
    });
});

function inputChnage(item) {
  let inputMXNEu = document.getElementById("inputMXNEu");
  let inputMXNBrl = document.getElementById("inputMXNBrl");
  let resulMXNEu = document.getElementById("resul1");
  let resulMXNBrl = document.getElementById("resul2");

  fetch(`https://${host}/latest?amount=${inputMXNEu.value}&from=MXN&to=${item}`)
    .then((resp) => resp.json())
    .then((data) => {
      if (data.rates.EUR) resulMXNEu.innerText = data.rates.EUR;
      if (data.rates.BRL) resulMXNBrl.innerText = data.rates.BRL;
    });
}

const selectorUno = document.getElementById("selector_uno");
const cantidadUno = document.getElementById("cantidad_uno");
const selectorDos = document.getElementById("selector_dos");
const elementoRate = document.getElementById("rate");
function calcular() {
  const cantidad_uno = selectorUno.value; //MXN
  const cantidad_dos = selectorDos.value; //USD

  fetch(
    `https://${host}/latest?amount=${cantidadUno.value}&from=${cantidad_uno}&to=${cantidad_dos}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[cantidad_dos];
      elementoRate.innerText = `1 ${cantidad_uno} = ${rate} ${cantidad_dos}`;
    });
}

selectorUno.addEventListener("change", calcular);
cantidadUno.addEventListener("input", calcular);
selectorDos.addEventListener("change", calcular);
