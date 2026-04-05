import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { MoreHorizontal, Check, X } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Badge } from './ui/badge'

const ApplicantsTable = ({ statusHandler }) => {
    const { applicants } = useSelector(store => store.application);

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>   
                        <TableHead className="text-right">Action</TableHead>
                        <TableHead>Status</TableHead>   
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                        item.applicant?.profile?.resume ? 
                                        <a className="text-blue-600 cursor-pointer hover:underline" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>

                                {/* ✅ Action Column */}
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 p-2 shadow-md">
                                            <div 
                                                onClick={() => statusHandler("accepted", item?._id)} 
                                                className='flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md transition-colors'
                                            >
                                                <Check className='w-4 text-green-600'/>
                                                <span className="text-sm font-medium">Accept</span>
                                            </div>
                                            <div 
                                                onClick={() => statusHandler("rejected", item?._id)} 
                                                className='flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md transition-colors'
                                            >
                                                <X className='w-4 text-red-600'/>
                                                <span className="text-sm font-medium">Reject</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>

                                {/* ✅ Status Column */}
                                <TableCell>
                                    {
                                        item?.status === "accepted" ? (
                                            <Badge variant="outline" className="bg-green-100 text-green-600 border-green-200 capitalize px-4 py-1 rounded-full flex items-center gap-1 w-fit">
                                                <Check size={14} strokeWidth={3} />
                                                <span>Accepted</span>
                                            </Badge>
                                        ) : item?.status === "rejected" ? (
                                            <Badge variant="outline" className="bg-red-100 text-red-600 border-red-200 capitalize px-4 py-1 rounded-full flex items-center gap-1 w-fit">
                                                <X size={14} strokeWidth={3} />
                                                <span>Rejected</span>
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-200 capitalize px-4 py-1 rounded-full w-fit">
                                                Pending
                                            </Badge>
                                        )
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable