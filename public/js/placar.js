var placar = $('.placar');

function mostraPlacar() {
  placar.stop().slideToggle(600, function(){
    $('html').animate({scrollTop: $('.placar').offset().top+'px'},1000)
  })
}

function inserePontuacao() {
  var corpoTabela = $('.placar').find('tbody'),
  qtdPalavras = $('#contador-palavras').text(),
  tempo = tempoInicial - tempoRestante,
  linha = "<tr class='ultimo-adicionado green accent-1'>"+
            "<td>"+usuario+"</td>"+
            "<td>"+qtdPalavras+"</td>"+
            "<td>"+tempo+" "+medidaTempo+"</td>"+
            "<td><button class='remover  btn-floating btn-medium waves-effect waves-light orange lighten-1'><i class='small material-icons'>delete</i></button></td>"+
          "</tr>";

  corpoTabela.append(linha)

  mostraPlacar()

  setTimeout(function(){
    $('.ultimo-adicionado').removeClass('ultimo-adicionado green accent-1')
  },3000)

}

function removeLinha(linha) {
  $(linha).closest('tr').fadeOut(1000, function(){
    $(linha).closest('tr').remove()
  })
}
