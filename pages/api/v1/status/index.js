function status(request, response) {
  response.status(200).json({ message: "Feliz aniversário, coração!" });
}

export default status;
