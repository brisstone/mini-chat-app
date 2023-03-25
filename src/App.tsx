import React from "react";
import "./App.css";
import ChatScreen from "./views/chat/ChatScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/chat" element={<ChatScreen />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
