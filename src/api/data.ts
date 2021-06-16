import fs from 'fs'
import path from 'path'

function tryFiles(...files: string[]) {
  for (const file of files) {
    try {
      return fs.readFileSync(file).toString()
    } catch (e) {}
  }
}

const customStreetNames = path.join(__dirname, 'data/street-names.json')
const defaultStreetNames = path.join(__dirname, 'data/default/street-names.json')
export const streetNames: string[] = JSON.parse(tryFiles(customStreetNames, defaultStreetNames) || '[]')

const customStreetSuffixes = path.join(__dirname, 'data/street-suffixes.json')
const defaultStreetSuffixes = path.join(__dirname, 'data/default/street-suffixes.json')
export const streetSuffixes: string[] = JSON.parse(tryFiles(customStreetSuffixes, defaultStreetSuffixes) || '[]')

interface AssociationsMap {
  [key: string]: Associations
}

type Associations = string[]

const customWordAssociations = path.join(__dirname, 'data/word-associations.json')
const defaultWordAssociations = path.join(__dirname, 'data/default/word-associations.json')
export const wordAssociations: AssociationsMap = JSON.parse(tryFiles(customWordAssociations, defaultWordAssociations) || '{}')
