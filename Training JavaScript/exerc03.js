let n = 1;

function solucao(n) {
  let possiveisPiramidesPerfeitas = 0;
  let pecasFaltantesParaProximaPiramidePerfeita = 0;
  let anterior = 0;
  let menorPiramide = 3;
  let soma = 0;

  while (soma <= n) {
    anterior = anterior + 1;
    console.log(soma);
    if (soma >= menorPiramide) {
      possiveisPiramidesPerfeitas++;
    }
    soma = soma + anterior;
  }
  pecasFaltantesParaProximaPiramidePerfeita = soma - n;

  console.log('peças faltantes: ' + pecasFaltantesParaProximaPiramidePerfeita);
  console.log('possiveis: ' + possiveisPiramidesPerfeitas);
  console.log('anterior: ' + anterior);

  console.log([
    possiveisPiramidesPerfeitas,
    pecasFaltantesParaProximaPiramidePerfeita,
  ]);
}

solucao(n);
