import axios from "axios";

axios
  .get("http://localhost:4000")
  .then((response) => response.data)
  .catch((error) => {
    console.error(error);
  });
