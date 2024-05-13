import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { Loading } from "./Loading.tsx";
import { Tasks } from "./Tasks.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-slate-950 w-screen min-h-screen h-fit">
        <Suspense fallback={<Loading />}>
          <Tasks />
        </Suspense>
      </div>
    </QueryClientProvider>
  );
};
