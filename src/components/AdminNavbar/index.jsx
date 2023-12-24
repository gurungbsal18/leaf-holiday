import React from "react";
import Image from "next/image";
import { adminNavItems } from "@/utils";

export default function AdminNavbar() {
  return (
    <div className="admin-navbar d-flex flex-column p-4 border-end">
      <div className="brand mb-5">
        <a href="/">
          <Image
            src="/images/logo.png"
            width={150}
            height={59}
            alt="leaf-holiday-logo"
            priority={true}
          />
        </a>
      </div>
      <div className="admin-navItems d-flex flex-column  gap-4">
        {adminNavItems.map((item) => (
          <div className="nav-item d-flex gap-2  " key={item.id}>
            <div className="nav-icon">{item.icon}</div>
            <div className="nav-label">
              <a href={item.path}>{item.label}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
