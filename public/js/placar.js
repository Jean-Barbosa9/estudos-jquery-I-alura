var usuario = 'Jean',
medidaTempo = $('#medida-tempo').text();

function inserePontuacao() {
  var corpoTabela = $('.placar').find('tbody'),
  qtdPalavras = $('#contador-palavras').text(),
  tempo = tempoInicial,
  linha = "<tr class='ultimo-adicionado green accent-1'>"+
            "<td>"+usuario+"</td>"+
            "<td>"+qtdPalavras+"</td>"+
            "<td>"+tempo+" "+medidaTempo+"</td>"+
            "<td><button class='remover  btn-floating btn-medium waves-effect waves-light orange lighten-1'><i class='small material-icons'>delete</i></button></td>"+
          "</tr>";
  corpoTabela.append(linha)
  window.scrollTo(0,alturaTela)
  setTimeout(function(){
    $('.ultimo-adicionado').removeClass('ultimo-adicionado green accent-1')
  },3000)

}

function removeLinha(linha) {
  $(linha).closest('tr').remove()
}

$('body').on('click','.remover',function() {
  removeLinha(this)
})
