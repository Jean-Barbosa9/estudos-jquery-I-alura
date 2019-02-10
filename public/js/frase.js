function fraseAleatoria() {
  $.get('/frases', atualizaFrase)
}

function atualizaFrase(resposta) {
  var indiceAleatorio = numeroAleatorio(resposta.length)
  var novaFrase = resposta[indiceAleatorio]
  $('.frase').text(novaFrase.texto)
  tempoInicial = novaFrase.tempo
  $('#tempo').text(novaFrase.tempo)
  atualizaPalavras()
  reiniciaJogo()
}
