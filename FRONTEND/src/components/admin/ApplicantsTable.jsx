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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, Check, X, Circle } from "lucide-react"; 
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        // Note: To see the change permanently without refresh, 
        // you should dispatch an action to update Redux state here.
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            {/* Added Permanent Status Head */}
            <TableHead>Status</TableHead> 
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item?.applicant?.fullname}</TableCell>
              <TableCell>{item?.applicant?.email}</TableCell>
              <TableCell>{item?.applicant?.phoneNumber}</TableCell>
              <TableCell>
                {item?.applicant?.profile?.resume ? (
                  <a className="text-blue-600 hover:underline" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                    {item?.applicant?.profile?.resumeOriginalName || "View Resume"}
                  </a>
                ) : <span>NA</span>}
              </TableCell>
              <TableCell>{item?.applicant?.createdAt?.split("T")[0]}</TableCell>
              
              {/* Permanent Status Badge Cell */}
              <TableCell>
                {item?.status === "accepted" ? (
                  <span className="flex items-center gap-1 w-fit px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm border border-green-200">
                    <Check size={14} /> Accepted
                  </span>
                ) : item?.status === "rejected" ? (
                  <span className="flex items-center gap-1 w-fit px-3 py-1 rounded-full bg-red-100 text-red-700 font-medium text-sm border border-red-200">
                    <X size={14} /> Rejected
                  </span>
                ) : (
                  <span className="flex items-center gap-1 w-fit px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-medium text-sm border border-gray-200">
                    <Circle size={12} className="fill-current" /> Pending
                  </span>
                )}
              </TableCell>

              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                  <PopoverContent className="w-32 p-2">
                    {shortlistingStatus.map((status, index) => (
                      <div
                        key={index}
                        onClick={() => statusHandler(status, item?._id)}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded transition-all"
                      >
                         {status === "Accepted" ? <Check size={16} className="text-green-600"/> : <X size={16} className="text-red-600"/>}
                         <span>{status}</span>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;