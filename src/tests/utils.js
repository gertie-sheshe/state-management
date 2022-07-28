import { QueryClient, QueryClientProvider } from "react-query";
import { render } from "@testing-library/react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 1,
      retry: 0,
    },
  },
});
function ProviderWrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

function customRender(component, options) {
  return render(component, { wrapper: ProviderWrapper, ...options });
}

export { customRender as render };
