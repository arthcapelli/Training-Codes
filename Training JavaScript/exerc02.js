var times = ['gremio', 'inter', 'juv', 'flamengo', 'sl', 'sl2'];
var ordem = [3, 4, 1, 2, 5, 6];

function solucao(times, ordem) {
  var resposta = [];

  for (var i = 0; i < times.length; i += 2) {
    resposta.push(`${times[ordem[i] - 1]} x ${times[ordem[i + 1] - 1]}`);
  }

  console.log(resposta);
  // return resposta;
}
solucao(times, ordem);
