export default function cnpjFormatter (cnpj: string): string {
  const cnpjFormat = cnpj.split('')
  cnpjFormat.forEach((item, index) => {
    if (isNaN(parseInt(item, 10))) {
      cnpjFormat.splice(index, 1)
    }
  })
  cnpj = cnpjFormat.join('')
  return cnpj
}
