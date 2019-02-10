function fraseAleatoria() {
  $('.carregando').toggle()
  $.get('/frases', atualizaFrase).fail(function(err) {
    $('.mensagem-erro').fadeIn()
    setTimeout(function(){$('.mensagem-erro').fadeOut()},3000)
  }).always(function(){
    $('.carregando').toggle()
  })
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
