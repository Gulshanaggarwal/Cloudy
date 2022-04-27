import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";


export default function Home() {

  const isUser = useContext(AuthContext);
  const router = useRouter();

  if (isUser) {
    router.push("/dashboard");
  }

  return (
    <div>Welcome to home page</div>
  )
}
