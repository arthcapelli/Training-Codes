function calcularNotaFinal(aluno, notas) {
  soma = 0;

  for (index = 0; index < notas.length; index++) {
    soma += notas[index];
  }
  notaFinal = soma / notas.length;

  if (notaFinal >= 7) {
    resultado = 'A';
  } else if (notaFinal >= 6 && notaFinal < 7) {
    resultado = 'R';
  } else if (notaFinal < 6) {
    resultado = 'X';
  }

  imprimirResultado(aluno, notaFinal, resultado);
}

calcularNotaFinal();

function imprimirResultado(aluno, notaFinal, resultado) {
  console.log('*** Resultado do aluno ' + aluno + ' ***');
  console.log('> Nota final: ' + notaFinal);

  if (resultado == 'A') {
    console.log('Aprovado');
  }

  if (resultado == 'R') {
    console.log('Recuperação');
  }

  if (resultado == 'X') {
    console.log('Reprovado');
  }
}
