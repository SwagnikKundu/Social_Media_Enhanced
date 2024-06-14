import app from "./index.js";
import { connectToDb } from "./src/config/db.js";

app.listen(8080, async () => {
  await connectToDb();
  console.log(`server is running at port 8080`);
});
