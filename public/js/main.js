// declaração de variáveis
var frase = $('.frase').text(),
  tamanhoFrase = frase.split(' ').length,
  numPalavras = $('#numero-palavras'),
  campo = $('.campo-digitacao'),
  tempoRestante = $('#tempo').text();

// ações
numPalavras.text(tamanhoFrase);

campo.on('input', function () {
  var qtdPalavras = campo.val().split(/\S+/).length - 1
  var qtdCaracteres = campo.val().replace(/\s+/g, '').length
  $('#contador-caracteres').text(qtdCaracteres)
  $('#contador-palavras').text(qtdPalavras)
});

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
