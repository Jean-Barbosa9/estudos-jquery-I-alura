var placar = $('.placar');

function mostraPlacar() {
  placar.stop().slideToggle(600, function(){
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

  corpoTabela.append(linha)

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

  $('.carregando').toggle()
  $.post('/placar', dados, function(){
    $('.placar').slideUp()
    $('.mensagem-placar-salvo').stop(true,true).fadeIn()
    setTimeout(function(){$('.mensagem-placar-salvo').fadeOut()},3000)
  }).fail(function(){
    $('.mensagem-erro').fadeIn()
    setTimeout(function(){
      $('.mensagem-erro').fadeOut()
    },3000)
  }).always(function(){
    $('.carregando').toggle()
  })
}

function consultaPlacar() {
  $.get('/placar',function(resposta){
    $(resposta).each(function(){
      inserePontuacao(this.usuario,this.pontos,this.tempo)
      console.log(resposta);
    })
  })
}
