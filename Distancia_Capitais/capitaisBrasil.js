const csv = require('csv-parser');
const fs = require('fs');
const readline = require('readline');
const results = [];

// Criação de uma variável global que armazenará o custo por KM, permitindo que a mesma
// seja acessada em todas as partes do código
let custoKmGlobal = 0;

// Criação da interface para leitura de dados inseridos pelo usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Leitura do arquivo CSV e inserção dos dados na variável "results"
fs.createReadStream('DNIT-Distancias.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    function menu() {
      // Criação do MENU para interação com o usuário
      console.log('========= MENU =========');
      console.log('1 - Definir o custo por KM');
      console.log('2 - Verificar o custo entre duas cidades');
      console.log('3 - Verificar o custo de uma rota');
      console.log('4 - Sair');
      console.log('---------------------------------');

      rl.question('Escolha uma opção: ', (opcaoMenu) => {
        if (opcaoMenu == '1') {
          // Solicitação e captura de dados inseridos pelo usuário
          // referente ao custo por kilometro.
          rl.question('Informe o custo por KM: ', (custoKM) => {
            // Conversão dos dados inseridos, de String para Float
            custoKmGlobal = parseFloat(custoKM);

            // Validação caso o usuário digite número abaixo de zero ou digite
            // um valor que não seja um número.
            if (custoKmGlobal <= 0 || isNaN(custoKmGlobal)) {
              console.log('Insira um custo válido!');
              custoKmGlobal = 0;
              menu();
            } else {
              menu();
            }
          });
        } else if (opcaoMenu == '2') {
          // Validação do custo por KM
          if (custoKmGlobal <= 0 || isNaN(custoKmGlobal)) {
            console.log('Insira um custo válido!');
            menu();
          } else {
            let distancia = 0;
            let custo = 0;
            let cidadeExiste = true;
            let cidadeErrada = '';
            // Solicitação e captura de dados inseridos pelo usuário
            // referente a cidade de origem e de destino do trecho no qual
            // a distancia será consultada.
            rl.question('Digite a cidade de ORIGEM: ', (cidadeOrigem) => {
              rl.question('Digite a cidade de DESTINO: ', (cidadeDestino) => {
                // FOR para acessar a lista de results.
                for (let i = 0; i < results.length; i++) {
                  // Validação caso a cidade de Origem ou de Destino inseridas sejam inválidas.
                  if (!Reflect.has(results[i], cidadeOrigem.toUpperCase())) {
                    cidadeErrada = cidadeOrigem;
                    console.log(
                      'Cidade ' +
                        cidadeErrada +
                        ' inexistente ou com nome errado!'
                    );
                    cidadeExiste = false;
                    break;
                  } else if (
                    !Reflect.has(results[i], cidadeDestino.toUpperCase())
                  ) {
                    cidadeErrada = cidadeDestino;
                    console.log(
                      'Cidade ' +
                        cidadeErrada +
                        ' inexistente ou com nome errado!'
                    );
                    cidadeExiste = false;
                    break;
                  }
                  if (cidadeExiste) {
                    for (let i = 0; i < results.length; i++) {
                      // Verificar se o objeto na posição [i] da lista tem o nome da cidadeOrigem
                      // e se o valor da distancia nessa posição [i], para essa cidade, é 0.
                      // Utilizar "toUpperCase()" para realizar a pesquisa do nome da cidade
                      // de maneira correta (considerando todas maiúsculas),
                      // ignorando se o usuário inseriu o nome das cidades
                      // com letra maiúscula ou minúscula.
                      if (
                        Reflect.get(results[i], cidadeOrigem.toUpperCase()) == 0
                      ) {
                        // Se passar na validação, indica que o objeto acessado
                        // é referente às distancias da cidadeOrigem com relação às outras.
                        // Sendo assim, capturar a distancia até a cidadeDestino.
                        distancia = Reflect.get(
                          results[i],
                          cidadeDestino.toUpperCase()
                        );
                      }
                    }
                  }
                }
                // Realizar o cálculo do custo da viagem
                custo = distancia * custoKmGlobal;
                console.log(
                  'A distância entre ' +
                    cidadeOrigem +
                    ' e ' +
                    cidadeDestino +
                    ' é de ' +
                    distancia +
                    ' km '
                );
                console.log('Custo de R$' + custo);
                menu();
              });
            });
          }
        } else if (opcaoMenu == '3') {
          // Validação do custo por KM
          if (custoKmGlobal <= 0 || isNaN(custoKmGlobal)) {
            console.log('Insira um custo válido!');
            menu();
          } else {
            let distancia = 0;
            let rotaArray = [];
            let distanciaTotal = 0;
            let custoTotal = 0;
            let litrosGastos = 0;
            let diasGastos = 0;
            let cidadeExiste = true;
            let cidadeErrada = '';

            // Solicitação e captura de dados inseridos pelo usuário referente
            // a rota na qual a distancia será consultada.
            rl.question(
              'Digite a rota desejada (separando as cidades com vírgula): ',
              (rota) => {
                // Recebendo as cidades separadas por ", " e utilizando o SPLIT para
                // separá-las antes de serem inseridas no rotaArray, que foi
                // iniciado anteriormente.
                rotaArray = rota.split(', ');

                // FOR para realizar a validação de todas as cidade presentes na
                // rota, verificando se todas estão com nome certo e se existem na lista de cidades.
                for (let x = 0; x < rotaArray.length; x++) {
                  if (!Reflect.has(results[x], rotaArray[x].toUpperCase())) {
                    cidadeErrada = rotaArray[x];
                    cidadeExiste = false;
                    break;
                  }
                }
                if (cidadeExiste) {
                  // FOR para verificar em qual objeto cada uma cidade
                  // possui distancia "0" e identificar a distancia até a cidade
                  // na posição seguinte do rotaArray.
                  for (let i = 0; i < rotaArray.length; i++) {
                    for (let y = 0; y < results.length; y++) {
                      // O IF para verificação se o objeto de posição [y]
                      // possui a cidade da posição [i] na rota e se a distancia nessa
                      // posição é 0.
                      // Utilizar novamente o "toUpperCase()" para realizar a pesquisa
                      // do nome da cidade de maneira correta (considerando todas maiúsculas),
                      // ignorando se o usuário inseriu o nome das cidades
                      // com letra maiúscula ou minúscula.
                      if (
                        Reflect.get(results[y], rotaArray[i].toUpperCase()) == 0
                      ) {
                        // Ocorrendo a validação do IF, capturar a distancia referente ao
                        // próximo item da rota ([i+1]), que seria o destino seguinte
                        // da cidade na posição [i] e acumular na distanciaTotal.
                        // Inserção de um IF para validação da cidade na posição [i+1]
                        // com a finalidade de impedir a ocorrência de "undefined", já que
                        // após o último item da lista, consequentemente, não irá ter mais
                        // o que ler.
                        if (rotaArray[i + 1] != undefined) {
                          distancia = Reflect.get(
                            results[y],
                            rotaArray[i + 1].toUpperCase()
                          );
                          distanciaInt = parseInt(distancia);
                          distanciaTotal = distanciaTotal + distanciaInt;
                          console.log(
                            rotaArray[i] +
                              ' -> ' +
                              rotaArray[i + 1] +
                              ' (' +
                              distancia +
                              'km)'
                          );
                        }
                      }
                    }
                  }
                  // Cálculo do custo total da viagem
                  custoTotal = distanciaTotal * custoKmGlobal;
                  // Cálculo do total de litros gastos na viagem
                  litrosGastos = distanciaTotal * 2.57;
                  // Cálculo do total de dias necessários para realização da viagem
                  diasGastos = distanciaTotal / 283;

                  // "Console log" dos resultados, utilizando "toFixed(2)" para arrededondar
                  // os valores em 2 casas após a vírgula
                  console.log('Distância total: ' + distanciaTotal + 'km');
                  console.log('O custo total é de R$' + custoTotal);
                  console.log(
                    'O total de litros gastos foi de: ' +
                      litrosGastos.toFixed(2) +
                      ' litros'
                  );
                  console.log(
                    'A viagem durou ' + diasGastos.toFixed(2) + ' dias'
                  );
                } else {
                  console.log('Cidade ' + cidadeErrada + ' inexistente!');
                }

                menu();
              }
            );
          }
        } else if (opcaoMenu == '4') {
          console.log('======Programa encerrado!======');
          rl.close();
        }
      });
    }
    menu();
  });
