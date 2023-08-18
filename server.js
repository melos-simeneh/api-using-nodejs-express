const app = require("./app");
console.log("Env =>", app.get("env"));
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
