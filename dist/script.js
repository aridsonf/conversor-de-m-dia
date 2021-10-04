//Conversor de temperatura
//Criacao da funcao que vai ser passada no parametro onClick no HTML, dentro de um Input com a tag button
function tempconver(temp, temp1, temp2) {
  if (temp1 === "JPY") {
    var url =
      "https://economia.awesomeapi.com.br/last/" +
      temp1 +
      "-" +
      temp2 +
      ",BTC-" +
      temp2;
  } else {
    var url =
      "https://economia.awesomeapi.com.br/last/" +
      temp1 +
      "-" +
      temp2 +
      ",BTC-" +
      temp1;
  }
  let request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = function () {
    if (request.readyState == 4 && request.status == 200) {
      var resposta = JSON.parse(request.responseText);
      var convValor = resposta[temp1 + temp2].ask;
      var conv = parseFloat(temp) * parseFloat(convValor);
      document.getElementById("conve").innerHTML =
        '<p class="azul">Valor convertido de ' +
        temp +
        " " +
        temp1 +
        " para " +
        conv.toFixed(2) +
        " " +
        temp2 +
        " .</p>";
      //Calcula o valor em bitcoin para a moeda que vai ser convertida
      if (temp1 === "JPY") {
        var convValorBitcoin = resposta["BTC" + temp2].ask;
        var convBitcoin = parseFloat(conv) / parseFloat(convValorBitcoin);
      } else {
        var convValorBitcoin = resposta["BTC" + temp1].ask;
        var convBitcoin = parseFloat(temp) / parseFloat(convValorBitcoin);
      }

      document.getElementById("bitcoin").innerHTML =
        "Valor em bitcoins: " + convBitcoin.toFixed(5) + " ₿.";
    }
  };
  request.onerror = function () {
    console.log("Erro:" + request);
  };
  request.send();
  //Verifica quais sao as opcoes seleciondas na tela pelo usuario e faz o calculo necessario para a conversao das temperaturas selecionadas
  if (temp1 === temp2) {
    var conv = parseFloat(temp);
    document.getElementById("conve").innerHTML =
      '<p class="vermelho">Selecione moedas diferentes para fazer a conversão.</p>';
    document.getElementById("bitcoin").innerHTML = " ";
  }
}