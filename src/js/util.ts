export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function randomValue(collection: any[] | string) {
  return collection[randomNumber(0, collection.length)]
}

export function ensureArray(value: any[] | any) {
  if (Array.isArray(value)) return value
  return [value]
}

export function fillHoles(array: any[]) {
  for (let i = 0; i < array.length; i++) {
    if (array[i]) continue
    array[i] = null
  }
}
