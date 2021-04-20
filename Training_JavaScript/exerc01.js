let arrA = [2, 4, 5];
let arrB = [2, 4, 7];

function solucao(arrA, arrB) {
  let resposta = 0;

  for (let i = 0; i < arrA.length; i++) {
    if (arrB.includes(arrA[i])) {
      resposta += arrA[i];
    }
  }
  return resposta;
}

solucao(arrA, arrB);

console.log(resposta);
