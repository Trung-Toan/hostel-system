import { matchPath, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import RouterUser from "./router/RouterUser";
import { useEffect } from "react";
import { useSessionStorage } from "./ultil/useSessionStorage";
import RouterManager from "./router/RouterManager";
import RouterOwner from "./router/RouterOwner";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hàm lấy thông tin user từ sessionStorage
  const user = useSessionStorage("user");

  // Ánh xạ role với đường dẫn hợp lệ
  const roleRedirects = {
    customer: "/",
    admin: "/admin",
    manager: "/manager",
  };

  const checkLogin = () => {

    if (!user) {
      // Chưa đăng nhập
      if (
        location.pathname !== "/login" &&
        location.pathname !== "/find_email" &&
        location.pathname !== "/forgot_password"
      ) {
        navigate("/login");
      }
    } else {
      // Đã đăng nhập
      const validPath = roleRedirects[user.role];
      if (!validPath) {
        // Role không hợp lệ, có thể logout hoặc redirect về trang mặc định
        navigate("/login");
        sessionStorage.removeItem("user");
        return;
      }

      // Kiểm tra đường dẫn hiện tại có phù hợp với role không
      if (!location.pathname.startsWith(validPath) && location.pathname !== validPath) {
        navigate(validPath);
      }
    }
  };

  useEffect(() => {
    checkLogin();

    // Lắng nghe sự kiện thay đổi sessionStorage (nếu cần)
    const handleStorageChange = () => checkLogin();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [location.pathname]); // Chỉ chạy khi pathname thay đổi

  return (
    <Routes>
      <Route path="/*" element={<RouterUser />} />
      <Route path="/manager/*" element={<RouterManager/>} />
      <Route path="/owner/*" element={<RouterOwner/>} />
    </Routes>
  );
}

export default App;