// import App from "../src/App";

import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  router.push("culture-accessibility");
  // return <App />;
}
