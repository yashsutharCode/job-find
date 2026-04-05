import React from 'react'
import Navbar from './shared/Navbar'
import AppliedJobTable from './AppliedJobTable'

const AppliedJobs = () => {
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <h1 className='font-bold text-xl my-5'>Applied Jobs History</h1>
        <AppliedJobTable />
      </div>
    </div>
  )
}
export default AppliedJobs