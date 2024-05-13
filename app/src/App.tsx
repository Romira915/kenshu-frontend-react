import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tasks } from "./Tasks.tsx";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-slate-950 w-screen h-screen">
        <Tasks />
      </div>
    </QueryClientProvider>
  );
};
