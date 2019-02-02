// declaração de variáveis globais
var alturaTela = window.screen.height,
tempoInicial = $('#tempo').text(),
medidaTempo = $('#medida-tempo').text(),
campo = $('.campo-digitacao'),
frase = $('.frase').text(),
digitacaoValida = false,
numPalavras = $('#numero-palavras'),
usuario = 'Jean',
textoMensagem = 'Olá '+usuario+', infelizmente não poderei marcar sua pontuação, porque o seu texto não foi digitado corretamente. Se quiser tentar de novo, clique no botão de reiniciar abaixo.';

// declaração de funções
function atualizaPalavras(){
  var frase = $('.frase').text(), tamanhoFrase = frase.split(' ').length;
  numPalavras.text(tamanhoFrase);
}

function inicializaContadores(){
  var qtdPalavras = campo.val().split(/\S+/).length - 1
  var qtdCaracteres = campo.val().replace(/\s+/g, '').length
  $('#contador-caracteres').text(qtdCaracteres)
  $('#contador-palavras').text(qtdPalavras)
}

function inicializaCronometro(){
  var tempoRestante = $('#tempo').text();

  var cronometro = setInterval(function () {
    tempoRestante--;
    $('#tempo').text(tempoRestante)

    if(tempoRestante < 6) {
      $('#tempo').closest('li').addClass('tempo-acabando')
    }

    if (tempoRestante < 1) {
      clearInterval(cronometro)
      finalizaJogo()
      $('#tempo').closest('li').removeClass('tempo-acabando')
    }
  }, 1000)
}

function acompanhaDigitacao() {
  // Caso o navegador suporte ES6 é possível usar a função "startsWith(valor digitado)"
  var digitado = campo.val(),
  comparavel = frase.substr(0,digitado.length),
  certo = (digitado == comparavel);

  campo.toggleClass('certo',certo)
  campo.toggleClass('errado',!certo)
  digitacaoValida = certo
}

function reiniciaJogo() {
  $('#contador-caracteres').text('0')
  $('#contador-palavras').text('0')
  $('#tempo').text(tempoInicial)
  campo.attr('disabled',false).val('')
  inicializaCronometro()
  $('.reiniciar').attr('disabled',true)
  campo.removeClass('certo errado')
  fecharModal()
  campo.focus()
}

function inserePontuacao() {
  var corpoTabela = $('.placar').find('tbody'),
  qtdPalavras = $('#contador-palavras').text(),
  tempo = tempoInicial,
  linha = "<tr class='last-added'>"+
            "<td>"+usuario+"</td>"+
            "<td>"+qtdPalavras+"</td>"+
            "<td>"+tempo+" "+medidaTempo+"</td>"+
          "</tr>";
  corpoTabela.append(linha)
  window.scrollTo(0,alturaTela)
  setTimeout(function(){
    $('.last-added').removeClass('last-added')
  },3000)

}

function finalizaJogo() {
  campo.attr('disabled', true)
  $('.reiniciar').removeAttr('disabled')
  if(digitacaoValida) {
    inserePontuacao()
  }
  else {
    $('.mensagem').text(textoMensagem)
    exibirModal()
  }
}

function exibirModal() {
  $('.mensagem-modal').fadeIn()
}

function fecharModal() {
  $('.mensagem-modal').fadeOut()
}

function bindEvents() {
  $('.reiniciar').click(reiniciaJogo);
  campo.on('input', function() {
    acompanhaDigitacao()
    inicializaContadores()
  })
  campo.one('focus',function(){
    inicializaCronometro()
  })

  $('.fechar').click(fecharModal)
}

// execução de funções
$(function(){
  bindEvents()
  atualizaPalavras()
})
