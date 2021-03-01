import express from 'express'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs'
import Session from './routes/Session'
import Dados from './routes/Dados'
import Vacinas from './routes/Vacinas'
import Doses from './routes/Doses'
import Configuration from './class/Configuration'

//Instância do servidor
const app = express()
app.use(express.json())

//Configurações
Configuration(app)

//Rotas
app.use('/api/', Session)
app.use('/api/', Dados)
app.use('/api/vacinas', Vacinas)
app.use('/api/vacinas/doses', Doses)

//Devolução do app
app.use('/', express.static(path.join(__dirname, '../app/')))
app.use('*', (req, res) => {
  if (!res.headersSent) {
    const index = path.join(__dirname, '../app/index.html')
    if (fs.existsSync(index)) {
      res.sendFile(index)
    } else {
      res.send('O App não foi encontrado')
    }
  }
})

app.listen(80, () => {
  if (process.env.INFO == 'true') {
    console.info(chalk.greenBright(`Servidor iniciado na porta ${process.env.PORT}`))
  }
})