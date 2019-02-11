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
  console.log(resposta)
  $('#idFraseEspecifica').val(novaFrase._id)
  atualizaPalavras()
  reiniciaJogo()
}

function buscaFrase(idFrase) {
  $('.carregando').toggle()

  var dados = {id: idFrase}

  $.get('/frases',dados,trocaFrase).fail(function(){
    $('.mensagem-erro').fadeIn()
    setTimeout(function(){$('.mensagem-erro').fadeOut()},3000)
  }).always(function(){
    $('.carregando').toggle()
  })
}

function trocaFrase(resposta) {
  $('.frase').text(resposta.texto)
  tempoInicial = resposta.tempo
  $('#tempo').text(resposta.tempo)
  atualizaPalavras()
  reiniciaJogo()
}
