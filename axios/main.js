import axios from "axios";

axios
  .get("http://localhost:4000")
  .then((response) => console.log(response.data))
  .catch((error) => {
    console.error(error);
  });
