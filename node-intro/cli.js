import { readdir, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import chalk from 'chalk'

// 1. get the folder you want to list
const dir = process.argv[2] ?? '.'

const flags = process.argv.filter((a) => a.startsWith('--'))
const flagsSet = new Set(flags)

const extensionFlag = flags.find((a) => a.startsWith('--ext='))
const wantedExtensionRaw = extensionFlag?.split('=')[1]

const wantedExtension = wantedExtensionRaw
  ? (wantedExtensionRaw.startsWith('.')
      ? wantedExtensionRaw
      : `.${wantedExtensionRaw}`
    ).toLowerCase()
  : null

// 2. Simple size format
const formatBytes = (size) => {
  if (size < 1024) return `${size} B`
  return `${(size / 1024).toFixed(2)} KB`
}

// 3. Read names without info
const files = await readdir(dir)

// 4. Retrieve files info
const entries = (
  await Promise.all(
    files.map(async (name) => {
      const fullPath = join(dir, name)
      const info = await stat(fullPath)

      const isDir = info.isDirectory()
      const isFile = info.isFile()

      if (wantedExtension && extname(name).toLowerCase() !== wantedExtension) return null
      if (wantedExtension && !isFile) return null
      if (flagsSet.has('--files-only') && !isFile) return null
      if (flagsSet.has('--dirs-only') && !isDir) return null

      return {
        name,
        isDir,
        size: isFile ? formatBytes(info.size) : null
      }
    })
  )
).filter(Boolean)

entries.sort(
  (a, b) =>
    Number(b.isDir) - Number(a.isDir) ||
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
)

if (entries.length < 1) console.log(chalk.redBright(`File or directory doesn't exist`))

for (const entry of entries) {
  const icon = entry.isDir ? '📁' : '📄'
  const size = entry.isDir ? '' : `${entry.size}`

  const namePadded = entry.name.padEnd(25)

  const entryName = entry.isDir ? chalk.yellow(namePadded) : chalk.magentaBright(namePadded)

  console.log(`${icon} ${entryName}${size ? '.....' : ''}${chalk.greenBright(size)}`)
}
