import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { qrForm } from "@/constants/qrform";

const StampCheck = ({name, display, checked, setStamp, allstamps}) => {
  const handleChange = (e) => {
    const newAr =  [...allstamps.stamps]
    newAr[newAr.findIndex((value) => value.name == name)].done = e.target.checked
    console.log(newAr)
    setStamp({...allstamps,stamps:newAr})
  };

  return (
    <>
      <span className="text-left">
        <label><input type="checkbox" label={name} checked={checked} onChange={handleChange}/>{display}</label>
      </span>
      <br/>
    </>
  )
}

export default function Stamp() {
    const { user, status, login, logout } = useAuth();
    const [userStamp, setUserStamp] = useState(null);
    const getUserStamp = async (email) => {
        const res = await fetch(`/api/stamp/${email}`, {
            method: "GET",
            headers: {
                "access-token": localStorage.getItem("user"),
            },
        });
        if (res) {
            const data = await res.json();
            //   console.log(data);
            if (data) setUserStamp(data);
            if (data?.error) {
                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                }).fire({
                    icon: "error",
                    title: data.error,
                });
                setUserStamp(null)
            }
            //   console.log(gift);
        }
    };

    const handleStampSubmit = async (e) => {
        e.preventDefault();
        const body = {
            estamp: userStamp.stamps,
        };

        const res = await fetch(`/api/stamp/${userStamp.email}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "access-token": localStorage.getItem("user"),
            },
            body: JSON.stringify(body),
        });
        getUserStamp(userStamp.email);
    };

    return (
        <div className="p-4 md:p-10 flex flex-col gap-4">
            <h1 className="text-3xl">Estamp</h1>
            <form
                onSubmit={(e) => {
                    getUserStamp(e.target[0].value);
                    // console.log(userStamp)
                    e.preventDefault();
                }}>
                <div className="flex flex-row gap-2 items-center">
                    <label>Email : </label>
                    <input type="text" name="email" className="w-3/4 md:1/2" />
                </div>
                <div className="mt-4 flex flex-row gap-2 items-center">
                    <button type="submit" className="btn">Search</button>
                    <button type="reset" className="btn" onClick={(e) => {
                        setUserStamp(null)
                    }}>Clear</button>
                </div>
            </form>
            <table className="border-separate border-spacing-2 w-full">
                <thead style={{ backgroundColor: "lightgray" }}>
                    <tr>
                        <th className="w-1/4 hidden md:block">ID</th>
                        <th className="w-1/4">Email</th>
                        <th className="w-1/4">Name</th>
                        <th className="w-1/4">Stamp Recieved</th>
                    </tr>
                </thead>
                <tbody>
                    {userStamp &&
                        <tr key={userStamp._id}>
                            <td className="hidden md:block">{userStamp._id}</td>
                            <td>{userStamp.email}</td>
                            <td>{userStamp.name}</td>
                            <td className="text-left">
                              {userStamp?.stamps?.map((s) => {
                                return (<StampCheck key={s.name} name={s.name} display={qrForm.find(qr => qr.type == s.name)?.name || s.name} checked={s.done} allstamps ={userStamp} setStamp={setUserStamp}/>)
                              })}
                                <button className="bg-emerald-300 p-2" onClick={handleStampSubmit}>Save</button>
                            </td>
                        </tr>

                    }
                </tbody>
            </table>
        </div>
    );
}
