import { lazy } from "react";
// import { Suspense, useState } from "react";
import "@/assets/styles/app.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { Outlet } from "react-router-dom";
import Home from "@/pages/Home";
import { router_path } from "@/routers";
// import LoadingIndicator from "@/components/LoadingIndicator";

const Error = lazy(() => import("@/pages/Error"));

const App: React.FC = () => {
  // const [isLoading, setIsLoading] = useState(true);

  // const renderRouteElement = (
  //   isLoading: boolean,
  //   element: React.ReactNode
  // ) => {
  //   if (isLoading) return <LoadingIndicator />;
  //   return <Suspense fallback={<LoadingIndicator />}>{element}</Suspense>;
  // };

  const routers = createBrowserRouter([
    {
      index: true,
      path: router_path.index,
      element: <Home key="Home" />,
    },
    // {
    //   path: router_path.generateImage,
    //   element: renderRouteElement(
    //     isLoading,
    //     <>
    //       <Outlet />
    //     </>
    //   ),
    //   children: [
    //     {
    //       index: true,
    //       element: <GenerateImage key="GenerateImage" />,
    //     },
    //     {
    //       path: router_path.generateImagePreview,
    //       element: <GenerateImagePreview key="GenerateImagePreview" />,
    //     },
    //     {
    //       path: router_path.generateImageResult,
    //       element: <GenerateImageResult key="GenerateImageResult" />,
    //     },
    //     {
    //       path: router_path.generateImageResultEdit,
    //       element: <GenerateImageResultEdit key="GenerateImageResultEdit" />,
    //     },
    //   ],
    // },
    {
      path: router_path.error,
      element: <Error key="Error" />,
    },
  ]);

  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
};

export default App;
