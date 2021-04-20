let mapa = ['0++++++++XXXXXXX', 'XXXXXXXX++XXXXXX', '++++XXXXX++++++D'];

function solucao(mapa) {
  let distanciaCaminho = 0;
  for (let i = 0; i < mapa.length; i++) {
    for (let y = 0; y < mapa[i].length; y++) {
      if (mapa[i].charAt(y) == '+') {
        distanciaCaminho++;
      }
      if (mapa[i].charAt(y + 1) == 'X') {
        y = y - 1;
        i++;
      }
    }
  }
  console.log(distanciaCaminho);
}
solucao(mapa);
