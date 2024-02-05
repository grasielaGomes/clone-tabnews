describe("Status at localhost/api/v1/status", () => {
  test("Should return 200", async () => {
    const { status } = await makeSut();
    expect(status).toBe(200);
  });

  test("Should return a valid updated at date", async () => {
    const { responseBody } = await makeSut();
    const parsedDate = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toBeDefined();
    expect(responseBody.updated_at).toEqual(parsedDate);
  });

  test("Should return a valid postgres database version", async () => {
    const { responseBody } = await makeSut();
    const version = responseBody.database.version
    expect(version).toBeDefined();
    expect(Number(version)).toBeGreaterThan(15);
  });

  test("Should return database max connections", async () => {
    const { responseBody } = await makeSut();
    const maxConnections = responseBody.database.max_connections;
    expect(maxConnections).toBeDefined();
    expect(Number(maxConnections)).toBeGreaterThanOrEqual(100);
  });

  test("Should return database opened connections", async () => {
    const { responseBody } = await makeSut();
    const openedConnections = responseBody.database.opened_connections;
    expect(openedConnections).toBeDefined();
    expect(openedConnections).toBeGreaterThanOrEqual(1);
  });
});

const makeSut = async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  return { status: response.status, responseBody };
};
