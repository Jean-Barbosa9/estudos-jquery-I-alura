function fraseAleatoria() {
  $('.carregando').toggle()
  try{
    clearInterval(cronometro)
  }
  catch(err) {
    console.log('err: ', err);
  }
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
  tempoRestante = tempoInicial = novaFrase.tempo
  $('#tempo').text(novaFrase.tempo)
  $('#idFraseEspecifica').val(novaFrase._id)
  atualizaPalavras()
}

function buscaFrase(idFrase) {
  $('.carregando').toggle()
  try{
    clearInterval(cronometro)
  }
  catch(err) {
    console.log('err: ', err);
  }
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
  tempoRestante = tempoInicial = resposta.tempo
  $('#tempo').text(resposta.tempo)
  atualizaPalavras()
}
