import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, MapPin } from "lucide-react"; // Added MapPin icon
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = ({ search }) => {
  const { companies } = useSelector((store) => store.company);
  const navigate = useNavigate();

  // ✅ FILTER USING TOP INPUT
  const filteredCompanies = companies?.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead> {/* Added Location Header */}
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredCompanies?.length === 0 ? (
            <TableRow>
              {/* Increased colSpan to 5 to account for the new column */}
              <TableCell colSpan={5} className="text-center">
                No companies found.
              </TableCell>
            </TableRow>
          ) : (
            filteredCompanies.map((company) => (
              <TableRow key={company._id}>
                
                {/* LOGO */}
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={
                        company.logo ||
                        "https://toppng.com/uploads/preview/free-logo-design-11551057495oqoep79juj.png"
                      }
                    />
                  </Avatar>
                </TableCell>

                {/* NAME */}
                <TableCell className="font-medium">{company.name}</TableCell>

                {/* LOCATION */}
                <TableCell>
                  {company.location ? (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 text-gray-500" />
                      <span>{company.location}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">Not set</span>
                  )}
                </TableCell>

                {/* DATE */}
                <TableCell>
                  {company.createdAt?.split("T")[0]}
                </TableCell>

                {/* ACTION */}
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-all"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>

              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;