const ok = (data: any) => ({
    statusCode: 200,
    data
})

const create = (data: any) => ({
    statusCode: 201,
    data
})

export { ok, create };