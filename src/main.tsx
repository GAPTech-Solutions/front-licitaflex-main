import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import Axios from "axios";

import { RouterProvider } from "react-router-dom";
import router from "./Router/rotas";
import { AuthProvider } from "./Context/AuthContext";
import { MetaDadosProvider } from "./Context/MetaDadosContext";
import "./fonts.css";
import theme from "./assets/theme/theme";
import "./utils/date";
import "./utils/numberFormat";
/* A test for Mercure. */
// import { EventSourcePolyfill } from "event-source-polyfill";
// The subscriber subscribes to updates for the https://example.com/users/dunglas topic
// and to any topic matching https://example.com/books/{id}

Axios.defaults.baseURL = import.meta.env.VITE_API_URL;
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <MetaDadosProvider>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </MetaDadosProvider>
    </AuthProvider>
  </React.StrictMode>
);
