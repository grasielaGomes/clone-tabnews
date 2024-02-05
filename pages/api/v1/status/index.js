import database from "infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const queryDatabaseStatus = `
      SHOW server_version;
      SHOW max_connections;
      SELECT COUNT(*) FROM pg_stat_activity;
    `;

  const [resultVersion, resultMaxConnections, resultOpenedConnections] =
    await database.query(queryDatabaseStatus);

  const pgVersionNumber = resultVersion.rows[0].server_version;
  const maxConenction = resultMaxConnections.rows[0].max_connections;
  const openedConnection = resultOpenedConnections.rows[0].count;

  const databaseStatus = {
    version: pgVersionNumber,
    max_connections: parseInt(maxConenction),
    opened_connections: parseInt(openedConnection),
  };
  response.status(200).json({
    updated_at: updatedAt,
    database: databaseStatus,
  });
}

export default status;
