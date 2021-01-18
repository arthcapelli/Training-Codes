var arq = 65000;
var type = '';

function conversor() {
  arq = arq / 1024;
}

function print(arq, type) {
  console.log('O arquivo tem ' + arq.toFixed(2) + ' ' + type);
}

if (arq < 1024) {
  type = 'B';
  print(arq, type);
} else if (arq >= 1024) {
  type = 'KB';
  conversor(arq);
  if (arq < 1024) {
    print(arq, type);
  } else if (arq >= 1024) {
    type = 'MB';
    conversor(arq);
    if (arq < 1024) {
      print(arq, type);
    } else if (arq >= 1024) {
      type = 'GB';
      conversor(arq);
      if (arq < 1024) {
        print(arq, type);
      } else if (arq > 1024) {
        type = 'TB';
        conversor(arq);
        if (arq < 1024) {
          print(arq, type);
        } else if (arq > 1024) {
          type = 'PB';
          conversor(arq);
          if (arq < 1024) {
            print(arq, type);
          } else if (arq >= 1024) {
            type = 'EB';
            conversor(arq);
            if (arq < 1024) {
              print(arq, type);
            } else if (arq >= 1024) {
              type = 'ZB';
              conversor(arq);
              if (arq < 1024) {
                print(arq, type);
              } else if (arq >= 1024) {
                type = 'YB';
                conversor(arq);
                if (arq < 1024) {
                  print(arq, type);
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
