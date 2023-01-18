import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect, useState } from "react";

export default function Report() {
  const { user, status, login, logout } = useAuth();
  const [report, setReport] = useState([]);
  const getReports = async () => {
    const res = await fetch("/api/report", {
      headers: {
        "access-token": localStorage.getItem("user"),
      },
    });
    if (res) {
      const data = await res.json();
      if (data?.reports) setReport(data.reports);
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
      console.log(report);
    }
  };
  useEffect(() => {
    console.log({ status, user });
    getReports();
    const interval = setInterval(() => {
      if (status == "authenticated") {
        getReports();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [status, user]);

  const handleReportDoneChange = async (e, id) => {
    e.preventDefault();
    const body = {
      done: e.target.checked,
    };
    const res = await fetch(`/api/report/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("user"),
      },
      body: JSON.stringify(body),
    });
    getReports();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/report/${id}`, {
      method: "DELETE",
      headers: {
        "access-token": localStorage.getItem("user"),
      },
    });
    getReports();
  };
  return (
    <div>
      <h1 className="text-3xl">Reports</h1>
      <button onClick={getReports} className="btn">
        Refresh
      </button>
      <table>
        <thead style={{ backgroundColor: "lightgray" }}>
          <tr>
            <th>Report ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Description</th>
            <th>Done</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {report.map((report) => (
            <tr key={report._id}>
              <td>{report._id}</td>
              <td>{report.name}</td>
              <td>{report.contact}</td>
              <td style={{ maxWidth: "200px" }}>{report.problem}</td>
              <td>
                <input
                  type="checkbox"
                  checked={report?.done}
                  onChange={(e) => handleReportDoneChange(e, report?._id)}
                ></input>
              </td>
              <td>
                <button onClick={() => handleDelete(report?._id)} className="text-red-400">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
