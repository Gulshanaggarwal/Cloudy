import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";
import style from "./../styles/Home.module.css";
import Image from "next/image";
import mockup from "./../assets/mockups.png";
import iphone from "./../assets/iphone.png";
import mac from "./../assets/mac.png";
import { Button, Container, Typography } from "@mui/material";
import Link from "next/link"

export default function Home() {
  const isUser = useContext(AuthContext);
  const router = useRouter();

  if (isUser) {
    router.push("/dashboard");
  }

  return (
    <Container maxWidth="lg">
      <Container
        sx={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Container
            fixed
            sx={{
              width: "100%",
            }}
          >
            <Typography variant="h4" marginBottom={"20px"}>
              Secure Cloud Storage and Communication Privacy by Design
            </Typography>
            <Button variant="contained" color={"primary"}>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </Container>
          <Image src={mockup} alt={"heroImage"} className={style.heroImage} />
        </Container>
      </Container>
      <Container
        sx={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse",
          }}
        >
          <Container
            fixed
            sx={{
              width: "100%",
            }}
          >
            <Typography variant="h4" marginBottom={"20px"}>
              Secure and Easy File Sharing
            </Typography>
          </Container>
          <Image src={mockup} alt={"heroImage"} className={style.heroImage} />
        </Container>
      </Container>
    </Container>
  );
}
