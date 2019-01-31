var frase = $('.frase').text(),
tamanhoFrase = frase.split(' ').length,
numPalavras = $('#numero-palavras');

numPalavras.text(tamanhoFrase);

var campo = $('.campo-digitacao')

campo.on('input', function() {
  var qtdPalavras = campo.val().split(/\S+/).length - 1
  var qtdCaracteres = campo.val().replace(/\s+/g,'').length
  $('#contador-caracteres').text(qtdCaracteres)
  $('#contador-palavras').text(qtdPalavras)
})
