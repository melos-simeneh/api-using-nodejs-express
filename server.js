const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

console.log("Env =>", app.get("env"));
console.log("Env =>", process.env.NODE_ENV);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
