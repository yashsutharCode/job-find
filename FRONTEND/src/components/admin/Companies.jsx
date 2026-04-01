import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies"; // Import added

const Companies = () => {
  useGetAllCompanies(); // 🔥 Added: Syncs Redux state with your (now empty) MongoDB
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); 

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>

        <CompaniesTable search={search} />
      </div>
    </div>
  );
};

export default Companies;