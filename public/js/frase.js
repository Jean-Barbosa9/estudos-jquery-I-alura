function fraseAleatoria() {
  $.get('/frases', atualizaFrase)
}

function atualizaFrase(resposta) {
  var indiceAleatorio = numeroAleatorio(resposta.length)
  $('.frase').text(resposta[indiceAleatorio].texto)
  inicializaContadores()
}
