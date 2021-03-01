import {exec} from 'child_process'
import path from 'path'
import fs from 'fs-extra'

const root = process.cwd()
const buildFolder = path.join(root, './__build')

const files: arquivos = [
  ['./.limits.json', './.limits.json', 'FILE'],

  ['./src/database', './database', 'FOLDER'],
  ['./src/database/fotos', './database/fotos', 'FOLDER'],
  ['./src/database/fotos/desconhecido.jpg', './database/fotos/desconhecido.jpg', 'FILE'],
  ['./src/database/database.db', './database/database.db', 'FILE'],
  ['./src/database/vacinas.json', './database/vacinas.json', 'FILE'],

  ['./src/database/database.db', './database/database.db', 'FILE'],
  ['./app*', './app', 'FOLDER']
]

exec('npx tsc', () => {
  files.forEach((arrayFile) => {
    if (arrayFile.length == 3) {
      const entry = path.join(root, arrayFile[0])
      const dest = path.join(buildFolder, arrayFile[1])
      const tipo = arrayFile[2]
      if (tipo == 'FILE') fs.copyFileSync(entry, dest)
      if (tipo == 'FOLDER' && !fs.existsSync(dest)) {
        fs.mkdirSync(dest)
      }
    }
  })
  copyPackage()
})

const copyPackage = () => {
  const packageEntry = path.join(root, './package.json')
  const packageLockEntry = path.join(root, './package-lock.json')
  const packageDest = path.join(buildFolder, './package.json')
  const packageLockDest = path.join(buildFolder, './package-lock.json')
  if (fs.existsSync(packageEntry)) {
    const packageJson = fs.readJSONSync(packageEntry)
    packageJson.main = 'index.js'
    delete packageJson.devDependencies
    delete packageJson.scripts.build
    packageJson.scripts.start = 'node index.js'
    fs.writeFileSync(packageDest, JSON.stringify(packageJson))
  }
  if (fs.existsSync(packageLockEntry)) {
    fs.copyFileSync(packageLockEntry, packageLockDest)
  }
}

type arquivos = Array<[string, string, 'FILE' | 'FOLDER']>