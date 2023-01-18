import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Prize() {
    const { user, status, login, logout } = useAuth();
    const [gift, setGift] = useState(null);
    const getGifts = async (email) => {
        const res = await fetch(`/api/gift/${email}`, {
            method: "GET",
        });
        if (res) {
            const data = await res.json();
            //   console.log(data);
            if (data) setGift(data);
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
                setGift(null)
            }
            //   console.log(gift);
        }
    };

    const handleGiftDoneChange = async (e, email) => {
        e.preventDefault();
        const body = {
            giftRecieved: e.target.checked,
        };
        const res = await fetch(`/api/gift/${email}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "access-token": localStorage.getItem("user"),
            },
            body: JSON.stringify(body),
        });
        getGifts(email);
    };

    return (
        <div className="p-4 md:p-10 flex flex-col gap-4">
            <h1 className="text-3xl">Prize</h1>
            <form
                onSubmit={(e) => {
                    getGifts(e.target[0].value);
                    console.log(gift)
                    e.preventDefault();
                }}>
                <div className="flex flex-row gap-2 items-center">
                    <label>Email : </label>
                    <input type="text" name="email" className="w-3/4 md:1/2" />
                </div>
                <div className="mt-4 flex flex-row gap-2 items-center">
                    <button type="submit" className="btn">Search</button>
                    <button type="reset" className="btn" onClick={(e) => {
                        setGift(null)
                    }}>Clear</button>
                </div>
            </form>
            <table className="border-separate border-spacing-2 w-full">
                <thead style={{ backgroundColor: "lightgray" }}>
                    <tr>
                        <th className="w-1/4 hidden md:block">ID</th>
                        <th className="w-1/4">Email</th>
                        <th className="w-1/4">Name</th>
                        <th className="w-1/4">Gift Recieved</th>
                    </tr>
                </thead>
                <tbody>
                    {gift &&
                        <tr key={gift._id}>
                            <td className="hidden md:block">{gift._id}</td>
                            <td>{gift.email}</td>
                            <td>{gift.name}</td>
                            <td className="text-center">
                                <input
                                    type="checkbox"
                                    checked={gift?.giftRecieved}
                                    onChange={(e) => handleGiftDoneChange(e, gift?.email)}
                                    className=""
                                />
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
