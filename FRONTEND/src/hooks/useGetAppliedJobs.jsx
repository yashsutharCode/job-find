import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "@/redux/jobSlice"; // ✅ Added import

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    // ✅ Fixed: Changed 'applications' to 'application' to match backend
                    dispatch(setAllAppliedJobs(res.data.application)); 
                }
            } catch (error) {
                console.log("Error fetching applied jobs:", error);
            }
        }
        fetchAppliedJobs();
    }, [dispatch]);
};

export default useGetAppliedJobs;