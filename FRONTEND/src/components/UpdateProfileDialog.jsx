import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Loader2, Camera } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_END_POINT } from "../utils/constant.js";
import { setUser } from "../redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        bio: "",
        skills: "",
        file: null,
        profilePhoto: null,
    });

    useEffect(() => {
        if (user && open) {
            setInput({
                fullname: user?.fullname || "",
                email: user?.email || "",
                phoneNumber: user?.profile?.phoneNumber || user?.phoneNumber || "",
                bio: user?.profile?.bio || "",
                skills: Array.isArray(user?.profile?.skills) ? user.profile.skills.join(", ") : user?.profile?.skills || "",
                file: null,
                profilePhoto: null,
            });
        }
    }, [user, open]);

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, [e.target.name]: file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        
        // Ensure these keys match your backend multer configuration
        if (input.file) formData.append("file", input.file);
        if (input.profilePhoto) formData.append("profilePhoto", input.profilePhoto);

        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-106.25 bg-white rounded-2xl p-6" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="font-bold text-gray-800 text-xl">Update Profile</DialogTitle>
                    <DialogDescription className="text-xs">Edit your details and upload a professional photo.</DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div className="space-y-1">
                        <Label className="text-[10px] font-bold uppercase text-gray-500 flex items-center gap-1"><Camera size={12}/> Profile Photo</Label>
                        <Input type="file" name="profilePhoto" accept="image/*" onChange={fileChangeHandler} className="h-9 cursor-pointer" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-500">Full Name</Label>
                            <Input name="fullname" value={input.fullname} onChange={changeEventHandler} className="h-9" />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-500">Phone</Label>
                            <Input name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className="h-9" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[10px] font-bold uppercase text-gray-500">Bio</Label>
                        <Input name="bio" value={input.bio} onChange={changeEventHandler} className="h-9" />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[10px] font-bold uppercase text-gray-500">Skills</Label>
                        <Textarea name="skills" value={input.skills} onChange={changeEventHandler} className="min-h-16 text-xs" />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[10px] font-bold uppercase text-gray-500">Resume (PDF)</Label>
                        <Input type="file" name="file" accept="application/pdf" onChange={fileChangeHandler} className="h-9 cursor-pointer" />
                    </div>
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold h-10 rounded-xl mt-2" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;