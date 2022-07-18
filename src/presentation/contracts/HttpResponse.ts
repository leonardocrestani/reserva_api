const ok = (data: any) => ({
    statusCode: 200,
    data
});

const created = (data: any) => ({
    statusCode: 201,
    data
});

const noContent = () => ({
    statusCode: 204
});

export { ok, created, noContent };