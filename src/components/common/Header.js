import React from "react";
import { Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <div>
      <Navbar bg="danger" variant="dark">
        <Navbar.Brand href="#home">
          <strong>ShopBridge</strong>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}
