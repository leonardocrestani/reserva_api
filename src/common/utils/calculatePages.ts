import { NotFound } from '../../application/errors'

export default (limit: number, offset: number, total: number) : number => {
  if (limit === 0) {
    return 1
  }
  if (limit > total) {
    return 1
  }
  const pages = Math.ceil(total / limit)
  if (offset > pages) {
    throw new NotFound(`Page ${offset} does not exists, page cannot be greater than pages = ${pages}`)
  }
  return pages
}
