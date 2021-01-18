function principal(arq) {
  function conversor() {
    arq = arq / 1024;
  }
  type = '';
  if (arq < 1024) {
    type = 'B';
    printar(arq, type);
  } else if (arq >= 1024) {
    type = 'KB';
    conversor(arq);
    if (arq < 1024) {
      printar(arq, type);
    } else if (arq >= 1024) {
      type = 'MB';
      conversor(arq);
      if (arq < 1024) {
        printar(arq, type);
      } else if (arq >= 1024) {
        type = 'GB';
        conversor(arq);
        if (arq < 1024) {
          printar(arq, type);
        } else if (arq > 1024) {
          type = 'TB';
          conversor(arq);
          if (arq < 1024) {
            printar(arq, type);
          } else if (arq > 1024) {
            type = 'PB';
            conversor(arq);
            if (arq < 1024) {
              printar(arq, type);
            } else if (arq >= 1024) {
              type = 'EB';
              conversor(arq);
              if (arq < 1024) {
                printar(arq, type);
              } else if (arq >= 1024) {
                type = 'ZB';
                conversor(arq);
                if (arq < 1024) {
                  printar(arq, type);
                } else if (arq >= 1024) {
                  type = 'YB';
                  conversor(arq);
                  if (arq < 1024) {
                    printar(arq, type);
                  } else {
                    console.log('Erro');
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function printar(arq, type) {
  console.log('O arquivo tem ' + arq.toFixed(2) + ' ' + type);
}

principal(10000000);
