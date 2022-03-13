import { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaGem } from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";

const NavBar = () => {
  return (
    <ProSidebar collapsed={false} toggled={false} breakPoint="md">
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Cloud Manufacturing
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem icon={<FaGem />}>
            Inicio
            <Link to="/" />
          </MenuItem>
          <MenuItem icon={<FaGem />}>
            Lista de impresoras
            <Link to="/machine/list" />
          </MenuItem>
          <MenuItem icon={<FaGem />}>
            Nueva impresora
            <Link to={"/machine/new"} className="text-light" />
          </MenuItem>
          <MenuItem icon={<FaGem />}>
            Nueva orden
            <Link to={"/machine/newWorkFlow"} className="text-light" />
          </MenuItem>
          <MenuItem icon={<FaGem />}>
            Lista de órdenes
            <Link to={"/orders"} className="text-light" />
          </MenuItem>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};

export default NavBar;
