function calcularIMC(peso, altura) {
  imc = peso / (altura * altura);
  classificacao = '';

  if (imc < 18.5) {
    classificacao = 'magro';
  } else if (imc < 25) {
    classificacao = 'normal';
  } else if (imc < 30) {
    classificacao = 'com sobrepeso';
  } else if (imc < 40) {
    classificacao = 'obeso';
  } else {
    classificacao = 'obeso com gravidade';
  }
  console.log('Seu IMC é', imc.toFixed(2));
  console.log('Você é considerado', classificacao);
}

calcularIMC(72, 1.73);
