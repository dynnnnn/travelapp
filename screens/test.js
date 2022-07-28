import axios from "axios";
import { useEffect } from "react/cjs/react.production.min";

const [text, setText] = useState("");

useEffect(() => {
  async function getData() {
    const request = await axios.get(fetchURL);
    setText(request.data);
    return request;
  }

  getData();
}, [fetchURL]);
