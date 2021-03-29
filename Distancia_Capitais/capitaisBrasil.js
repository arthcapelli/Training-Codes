const csv = require('csv-parser');
const fs = require('fs');
const readline = require('readline');
const results = [];

let custoKmGlobal = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.createReadStream('DNIT-Distancias.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    function menu() {
      console.log('========= MENU =========');
      console.log('1 - Definir o custo por KM');
      console.log('2 - Verificar o custo entre duas cidades');
      console.log('3 - Verificar o custo de uma rota');
      console.log('4 - Sair');
      console.log('---------------------------------');

      rl.question('Escolha uma opção: ', (opcaoMenu) => {
        if (opcaoMenu == '1') {
          rl.question('Informe o custo por KM: ', (custoKM) => {
            custoKmGlobal = parseFloat(custoKM);

            if (custoKmGlobal <= 0 || isNaN(custoKmGlobal)) {
              console.log('Insira um custo válido!');
              custoKmGlobal = 0;
              menu();
            } else {
              menu();
            }
          });
        } else if (opcaoMenu == '2') {
          if (custoKmGlobal <= 0 || isNaN(custoKmGlobal)) {
            console.log('Insira um custo válido!');
            menu();
          } else {
            let distancia = 0;
            let custo = 0;
            let cidadeExiste = true;
            let cidadeErrada = '';
            rl.question('Digite a cidade de ORIGEM: ', (cidadeOrigem) => {
              rl.question('Digite a cidade de DESTINO: ', (cidadeDestino) => {
                for (let i = 0; i < results.length; i++) {
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
                      if (
                        Reflect.get(results[i], cidadeOrigem.toUpperCase()) == 0
                      ) {
                        distancia = Reflect.get(
                          results[i],
                          cidadeDestino.toUpperCase()
                        );
                      }
                    }
                  }
                }
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

            rl.question(
              'Digite a rota desejada (separando as cidades com vírgula): ',
              (rota) => {
                rotaArray = rota.split(', ');

                for (let x = 0; x < rotaArray.length; x++) {
                  if (!Reflect.has(results[x], rotaArray[x].toUpperCase())) {
                    cidadeErrada = rotaArray[x];
                    cidadeExiste = false;
                    break;
                  }
                }
                if (cidadeExiste) {
                  for (let i = 0; i < rotaArray.length; i++) {
                    for (let y = 0; y < results.length; y++) {
                      if (
                        Reflect.get(results[y], rotaArray[i].toUpperCase()) == 0
                      ) {
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
                  custoTotal = distanciaTotal * custoKmGlobal;
                  litrosGastos = distanciaTotal * 2.57;
                  diasGastos = distanciaTotal / 283;

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
