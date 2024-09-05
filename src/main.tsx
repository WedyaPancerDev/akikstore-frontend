import { Suspense } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import Store from "store/Store";
import PageLoader from "components/PageLoader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Suspense fallback={<PageLoader />}>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={Store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </HelmetProvider>
  </Suspense>
);
