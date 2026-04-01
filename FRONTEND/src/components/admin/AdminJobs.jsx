import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs' // Ensure import

const AdminJobs = () => {
  useGetAllAdminJobs(); // 🔥 This MUST be here to trigger the sync
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
        </div>
        <AdminJobsTable search={search}/>
      </div>
    </div>
  )
}

export default AdminJobs