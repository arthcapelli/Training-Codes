let mapa = ['c', 'c', 'd', 'd'];

function solucao(mapa) {
  let resposta = '';
  let x = 0;
  let y = 0;
  for (let i = 0; i < mapa.length; i++) {
    if (mapa[i] == 'c') {
      y++;
    } else if (mapa[i] == 'b') {
      y--;
    } else if (mapa[i] == 'd') {
      x++;
    } else if (mapa[i] == 'e') {
      x--;
    }
  }
  toString(x);
  toString(y);
  resposta = 'X:' + x + ',' + 'Y:' + y;
  console.log(resposta);
}

solucao(mapa);
