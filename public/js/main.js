// declaração de variáveis globais
var tempoInicial = $('#tempo').text(),
campo = $('.campo-digitacao'),
frase = $('.frase').text(),
digitacaoValida = true;

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
        $('#reiniciar').removeAttr('disabled')
      }
    }, 1000)
  });
}

function acompanhaDigitacao() {
  campo.on('input',function(){
    var digitado = campo.val(),
    comparavel = frase.substr(0,digitado.length);

    if(digitado == comparavel) {
      campo.addClass('certo').removeClass('errado')
    }
    else {
      campo.addClass('errado').removeClass('certo')
      digitacaoValida = false
    }
  })
}

function reiniciaJogo() {
  $('#contador-caracteres').text('0')
  $('#contador-palavras').text('0')
  $('#tempo').text(tempoInicial)
  campo.attr('disabled',false).val('')
  inicializaCronometro()
  $('#reiniciar').attr('disabled',true)
  campo.removeClass('certo errado')
}

// execução de funções
$(function(){
  atualizaPalavras()
  inicializaContadores()
  inicializaCronometro()
  acompanhaDigitacao()
  $('#reiniciar').click(reiniciaJogo);
})
