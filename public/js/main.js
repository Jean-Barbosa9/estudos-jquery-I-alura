// declaração de variáveis globais
var alturaTela = window.screen.height,
tempoInicial = $('#tempo').text(),
tempoRestante = $('#tempo').text(),
medidaTempo = $('#medida-tempo').text(),
campo = $('.campo-digitacao'),
frase = $('.frase').text(),
digitacaoValida = false,
numPalavras = $('#numero-palavras'),
usuario = $('#usuarios').val();

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
  window.cronometro = setInterval(function () {
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
  var frase = $('.frase').text(),
  digitado = campo.val(),
  comparavel = frase.substr(0,digitado.length),
  certo = (digitado == comparavel);

  campo.toggleClass('certo',certo)
  campo.toggleClass('errado',!certo)
  digitacaoValida = certo

  if(certo && (digitado.length == $('.frase').text().length)) {
    clearInterval(cronometro)
    finalizaJogo()
  }
}

function reiniciaJogo() {
  clearInterval(cronometro)
  $('#contador-caracteres').text('0')
  $('#contador-palavras').text('0')
  $('#tempo').text(tempoInicial)
  tempoRestante = tempoInicial
  campo.attr('disabled',false).val('')
  setTimeout(function(){
    inicializaCronometro()
  },500)
  $('.reiniciar').attr('disabled',true)
  campo.removeClass('certo errado')
  fecharModal()
  campo.focus()
  $('.placar').stop().slideUp()
}

function finalizaJogo() {
  campo.attr('disabled', true)
  $('.reiniciar').removeAttr('disabled')
  if(digitacaoValida) {
    var palavras = $('#contador-palavras').text(),
    tempo = tempoInicial - tempoRestante
    console.log('tempo: ', tempo);
    inserePontuacao(usuario,palavras,tempo,true)
  }
  else {
    var textoMensagem = 'Olá '+usuario+', infelizmente não poderei marcar sua pontuação, porque o seu texto não foi digitado corretamente. Se quiser tentar de novo, clique no botão de reiniciar abaixo.';
    $('.mensagem').text(textoMensagem)
    $('.errado').removeClass('errado')
    exibirModal()
  }
  $('#tempo').text(0)
}

function exibirModal() {
  $('.mensagem-modal').fadeIn()
}

function fecharModal() {
  $('.mensagem-modal').fadeOut()
}

function numeroAleatorio(numMaximo) {
  return Math.floor(Math.random() * numMaximo)
}

function bindEvents() {
  $('.reiniciar').click(reiniciaJogo);
  campo.on('input', function(e) {
    // TODO: Impedir usuário de colar qualquer tipo de informação nesse campo
    acompanhaDigitacao()
    inicializaContadores()

  })
  campo.one('focus',function(){
    inicializaCronometro()
  })

  $('.fechar').click(fecharModal)

  $('body').on('click','.remover',function() {
    removeLinha(this)
  })

  $('.mostra-placar').click(function(){
    mostraPlacar()
  })

  $('.nova-frase').click(fraseAleatoria)

  $('.nova-frase-especifica').click(function(){
    buscaFrase($('#idFraseEspecifica').val())
  })

  $('.salva-placar').click(salvaPlacar)

  $('#usuarios').change(function(){
    usuario = $(this).val()
    console.log('usuario: ', usuario);
  })

  $('#usuarios').selectize({
    create: true,
    sortField: 'text'
  })

  $('.tooltip').tooltipster({
    trigger: 'custom'
  })
}
// execução de funções
$(function(){
  console.log(usuario)
  bindEvents()
  atualizaPalavras()
  consultaPlacar()
})
