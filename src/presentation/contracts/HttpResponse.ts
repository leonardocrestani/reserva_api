export type HttpResponse = {
    statusCode: number,
    body: any
}

const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
});

const created = (data: any): HttpResponse => ({
    statusCode: 201,
    body: data
});

const noContent = (): HttpResponse => ({
    statusCode: 204,
    body: undefined
});

export { ok, created, noContent };