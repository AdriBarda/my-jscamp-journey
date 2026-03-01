import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

let content = ''

if (process.permission.has('fs.read', 'file.txt')) {
  content = await readFile('./file.txt', 'utf-8')
  console.log(content)
} else {
  console.log(`You don't have permissions to read this file`)
}

const outputDir = join('output', 'files', 'documents')
if (process.permission.has('fs.write', outputDir)) {
  await mkdir(outputDir, { recursive: true })

  const upperCaseContent = content.toUpperCase()

  const outputFile = join(outputDir, 'uppercase-file.txt')
  await writeFile(outputFile, upperCaseContent)
} else {
  console.log(`You don't have permission to write in the specified directory`)
}
