import database from "infra/database";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  response.status(200).json({ message: "Feliz aniversário, coração!" });
}

export default status;
