import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { api } from "../api/api";
import LoadingBar from "react-top-loading-bar";
// import   LoadingBarRef  from "react-top-loading-bar";
import { useRef } from "react";


export  function ProtectedRoute() {
  const loadingBarRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    loadingBarRef.current?.continuousStart();
    const checkAuth = async () => {
      try {
        await api.get("/auth/check"); 
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
        // console.error("Authentication check failed:", error);
      } finally {
        loadingBarRef.current?.complete();
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <>
    <LoadingBar
          color="#f11946"
          ref={loadingBarRef}
          height={4}
          shadow
        />
        </>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/auth/admin/login" replace />;
}


export function GuestRoute() {
  const loadingBarRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    loadingBarRef.current?.continuousStart();

    const checkAuth = async () => {
      try {
        await api.get("/auth/check");
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
        // console.log("Not authenticated",error);
      } finally {
        loadingBarRef.current?.complete();
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <>
        <LoadingBar
          color="#f11946"
          ref={loadingBarRef}
          height={4}
          shadow
        />
      </>
    );
  }

  return authenticated 
    ? <Navigate to="/" replace /> 
    : <Outlet />;
}