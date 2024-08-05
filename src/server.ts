// src/server.ts
import app from "./app";

const port = 3000; // Or use process.env.PORT if you decide to use environment variables

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


