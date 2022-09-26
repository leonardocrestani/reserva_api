export type HttpResponse = {
    statusCode: number,
    body: object
}

const ok = (data: object): HttpResponse => ({
  statusCode: 200,
  body: data
})

const created = (data: object): HttpResponse => ({
  statusCode: 201,
  body: data
})

const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: undefined
})

export { ok, created, noContent }
