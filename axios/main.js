import axios from "axios";

axios
    .post("http://localhost:3000/user")
    .then((res) => console.log(res.data))
    .catch((error) => {
        console.error(error);
    });


