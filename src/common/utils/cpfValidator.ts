import { cpf } from 'cpf-cnpj-validator'

export default (userCpf: string) => {
  return cpf.isValid(userCpf)
}
