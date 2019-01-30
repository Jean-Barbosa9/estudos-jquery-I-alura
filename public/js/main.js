var frase = $('.frase').text(),
tamanhoFrase = frase.split(' ').length,
numPalavras = $('#numero-palavras');

numPalavras.text(tamanhoFrase);
