var placar = $('.placar');

function mostraPlacar() {
  placar.stop(true, true).slideToggle(600, function(){
    $('html').animate({scrollTop: $('.placar').offset().top+'px'},1000)
  })
}

function inserePontuacao(usuario,palavras,tempo, placar = false) {
  var corpoTabela = $('.placar').find('tbody'),
  linha = "<tr class='ultimo-adicionado green accent-1'>"+
            "<td>"+usuario+"</td>"+
            "<td>"+palavras+"</td>"+
            "<td>"+tempo+"</td>"+
            "<td><button class='remover  btn-floating btn-medium waves-effect waves-light orange lighten-1'><i class='small material-icons'>delete</i></button></td>"+
          "</tr>";

  corpoTabela.prepend(linha)

  if(placar) {
    mostraPlacar()
  }

  setTimeout(function(){
    $('.ultimo-adicionado').removeClass('ultimo-adicionado green accent-1')
  },3000)

}

function removeLinha(linha) {
  $(linha).closest('tr').fadeOut(1000, function(){
    $(linha).closest('tr').remove()
  })
}

function salvaPlacar() {
  var   placar = []

  $('tbody>tr').each(function(){
    var usuario = $(this).find('td:nth-child(1)').text()
    var palavras = $(this).find('td:nth-child(2)').text()
    var tempo = $(this).find('td:nth-child(3)').text()
    var pontuacao = {
      usuario: usuario,
      pontos: palavras,
      tempo: tempo
    }
    console.log('pontuacao: ', pontuacao);

    placar.push(pontuacao)
  })

  var dados = {
    placar: placar
  }

  $('.tooltip').tooltipster('open').tooltipster('content','Salvando placar...')
  $.post('/placar', dados, function(){
    $('.placar').slideUp()
    $('.tooltip').tooltipster('open').tooltipster('content','Salvo com sucesso!')
  }).fail(function(){
    $('.tooltip').tooltipster('open').tooltipster('content','Ocorreu um erro ao salvar o placar')
  }).always(function(){
    setTimeout(function(){
      $('.tooltip').tooltipster('close')
    },3000)
  })
}

function consultaPlacar() {
  $.get('/placar',function(resposta){
    $(resposta).each(function(){
      inserePontuacao(this.usuario,this.pontos,this.tempo)
    })
  })
}
