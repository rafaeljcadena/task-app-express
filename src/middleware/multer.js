// Multer é um middleware que serve para fazer upload de arquivos no express
const multer = require('multer')

// executando o método multer nós definimos um conjunto de opções (local de destino do arquivo, validações)
const upload = multer({
  // dest: 'avatars', // Ao comentar essa linha o arquivo é passado para a rota ao invés de ir para a pasta selecionada
  limits: {
    fileSize: 100000000
  },
  fileFilter(req, file, cb) {
    if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(undefined, true)
    } else {
      cb(new Error('File must be a image file'))
    }

    // Possíveis callbacks
    // cb(new Error('File must be a PDF'))
    // cb(undefined, true)
    // cb(undefined, false)
  }
})

module.exports = upload;