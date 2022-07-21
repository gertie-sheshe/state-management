import { QueryClient, QueryClientProvider } from "react-query";
import { render } from "@testing-library/react";

function ProviderWrapper({ children }) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
}

function customRender(component, options) {
  return render(component, { wrapper: ProviderWrapper, ...options });
}

export { customRender as render };
