import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"
import { router } from "./providers/RouteProvider"
import { SidebarProvider } from "./providers/SidebarProvider"; 
// import { router } from "./components/IconOnlySidebar/route";


function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative">
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </div>
    </QueryClientProvider>
  )
}

export default App
