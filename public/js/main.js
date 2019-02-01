// declaração de variáveis globais
var tempoInicial = $('#tempo').text(),
  campo = $('.campo-digitacao');

// declaração de funções
function atualizaPalavras(){
  var frase = $('.frase').text(), tamanhoFrase = frase.split(' ').length;
  numPalavras = $('#numero-palavras');
  numPalavras.text(tamanhoFrase);
}

function inicializaContadores(){
  campo.on('input', function () {
    var qtdPalavras = campo.val().split(/\S+/).length - 1
    var qtdCaracteres = campo.val().replace(/\s+/g, '').length
    $('#contador-caracteres').text(qtdCaracteres)
    $('#contador-palavras').text(qtdPalavras)
  });
}

function inicializaCronometro(){
  var tempoRestante = $('#tempo').text();

  campo.one('focus', function () {
    var cronometro = setInterval(function () {
      tempoRestante--;
      $('#tempo').text(tempoRestante)

      if (tempoRestante < 1) {
        campo.attr('disabled', true)
        clearInterval(cronometro)
      }
    }, 1000)
  });
}

function reiniciaJogo() {
  $('#contador-caracteres').text('0')
  $('#contador-palavras').text('0')
  $('#tempo').text(tempoInicial)
  campo.attr('disabled',false).val('')
  inicializaCronometro()
}

// execução de funções
$(function(){
  atualizaPalavras()
  inicializaContadores()
  inicializaCronometro()
  $('#reiniciar').click(reiniciaJogo);
})
