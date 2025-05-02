import { Flex, Spinner } from "@chakra-ui/react";
import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Aside from "./Aside";
import Container from "./Container";
import { Header } from "./Header";
import { LayoutBaseCss } from "./style";

export default function LayoutBase() {
  return (
    <LayoutBaseCss>
      <Header />
      <Aside />
      <Container>
        <Suspense
          fallback={
            <Flex
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Spinner />
            </Flex>
          }
        >
          <Outlet />
        </Suspense>
      </Container>
    </LayoutBaseCss>
  );
}
