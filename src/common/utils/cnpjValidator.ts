import { cnpj } from 'cpf-cnpj-validator'

export default (placeCpnj: string) => {
  return cnpj.isValid(placeCpnj)
}
