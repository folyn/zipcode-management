import "./App.css";
import React from "react";
import ZipCodeManagement from "./containers/zipCodeManagement";
import { CodeManagementContextProvider } from "./context/CodeManagementContext";
const App = () => {
  return (
    <div className="app">
      <div className="zip-code-list">
        <CodeManagementContextProvider>
          <ZipCodeManagement />
        </CodeManagementContextProvider>
      </div>
    </div>
  );
};
export default App;
