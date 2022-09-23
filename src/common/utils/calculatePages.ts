import { NotFound } from '../../application/errors'

export default (limit: number, currentPage: number, total: number) : number => {
  if (limit > total && limit === 0) {
    return 1
  }
  const pages = Math.ceil(total / limit)
  if (currentPage > pages) {
    throw new NotFound(`Page ${currentPage} does not exists, page cannot be greater than pages = ${pages}`)
  }
  return pages
}
