import React from "react";
import { Outlet } from "react-router-dom";
import UserButton from "../components/UserButton";
import UpdateSummary from "../components/UpdateSummary";
import NavButton from "../components/NavButton";
import NavBar from "../components/NavBar";
import "../styles/layouts/MainPage.scss";

// function MainPage() {
//   return (
//     <div className="container">
//       <nav>
//         <div className="brand">
//           <img src="/img/icon.png" alt="Dibrysoft logo" />
//           <a>Dibrysoft</a>
//         </div>
//         <UserButton to="/profile" />
//         <ul>
//           <li>
//             <NavButton to="/" icon="las la-home">
//               Home
//             </NavButton>
//             <NavButton to="/store" icon="las la-shopping-cart">
//               Store
//             </NavButton>
//             <NavButton to="/library" icon="las la-th-large">
//               Library
//             </NavButton>
//           </li>
//         </ul>
//         <Spacer grow={1} />
//         <UpdateSummary />
//         <NavButton to="/settings" icon="las la-cog">
//           Settings
//         </NavButton>
//       </nav>
//       <main>
//         <Outlet />
//       </main>
//     </div>
//   );
// }

function MainPage() {
  return (
    <div className="container">
      <div className="nav-container">
        <NavBar>
          <div className="brand">
            <img src="/img/icon.png" alt="Dibrysoft logo" />
            <a>Dibrysoft</a>
          </div>
          <UserButton to="/profile" />
          <NavButton to="/" icon="las la-home">
            Home
          </NavButton>
          <NavButton to="/store" icon="las la-shopping-cart">
            Store
          </NavButton>
          <NavButton to="/library" icon="las la-th-large">
            Library
          </NavButton>
          <UpdateSummary navend />
          <NavButton to="/settings" icon="las la-cog" navend>
            Settings
          </NavButton>
        </NavBar>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainPage;
