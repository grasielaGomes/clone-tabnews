import database from "infra/database";

async function status(request, response) {
  const databaseName = process.env.POSTGRES_DB;
  const updatedAt = new Date().toISOString();
  const queryDatabaseStatus = `
      SHOW server_version;
      SHOW max_connections;
    `;

  const [resultVersion, resultMaxConnections] =
    await database.query(queryDatabaseStatus);

  const resultOpenedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const pgVersionNumber = resultVersion.rows[0].server_version;
  const maxConenctions = resultMaxConnections.rows[0].max_connections;
  const openedConnections = resultOpenedConnections.rows[0].count;

  const databaseStatus = {
    version: parseInt(pgVersionNumber),
    max_connections: parseInt(maxConenctions),
    opened_connections: openedConnections,
  };
  response.status(200).json({
    updated_at: updatedAt,
    database: databaseStatus,
  });
}

export default status;
