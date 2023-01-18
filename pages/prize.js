import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Prize() {
  const { user, status, login, logout } = useAuth();
  const [gift, setGift] = useState([]);
  const getGifts = async ( email ) => {
    const res = await fetch(`/api/gift/${email}`, {
      method: "GET",
    //   headers: {
    //     "access-token": localStorage.getItem("user"),
    //   },
    });
    if (res) {
      const data = await res.json();
    //   console.log(data);
      if (data) setGift(data);
      if (data?.error)
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
      console.log(gift);
    }
  };
//   useEffect(() => {
//     console.log({ status, user });
//     // getGifts();
//     const interval = setInterval(() => {
//       if (status == "authenticated") {
//         // getGifts();
//       }
//     }, 10000);
//     return () => clearInterval(interval);
//   }, [status, user]);

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
    <div className="p-10 flex flex-col gap-4">
      <h1 className="text-3xl">Prize</h1>
      {/* <button onClick={getGifts} className="btn">
        Refresh
      </button> */}
      <form onSubmit={(e)=>{
        getGifts(e.target[0].value);
        e.preventDefault();
        }}>
        <label>Email : </label>
        <input type="text" name="email" />
        <button type="submit" className="btn">Search</button>
      </form>
      <table>
        <thead style={{ backgroundColor: "lightgray" }}>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Gift Recieved</th>
          </tr>
        </thead>
        <tbody>
          { 
            <tr key={gift._id}>
              <td>{gift._id}</td>
              <td>{gift.email}</td>
              <td>{gift.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={gift?.giftRecieved}
                  onChange={(e) => handleGiftDoneChange(e, gift?.email)}
                  className="mx-10"
                />
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
}
