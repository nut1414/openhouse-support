import Image from "next/image";
import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Swal from "sweetalert2";
import Login from "@/components/Login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, status, login, logout } = useAuth();
  const [report, setReport] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    login(email.value, password.value);
  };

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

  return (
    <>
      <main>
        <div>
          <div>
            {status == "loading" ? (
              <p>Loading...</p>
            ) : status == "unauthenticated" ? (
              <Login />
            ) : status == "authenticated" ? (
              <>
                <p>Logged in as {user.name}</p>
                <button onClick={logout} className="btn">Logout</button>
              </>
            ) : (
              <>Error</>
            )}
          </div>
          <div>
            {status == "authenticated" ? (
              <div>
                <h1>Reports</h1>
                <button onClick={getReports} className="btn">Refresh</button>
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
                            onChange={(e) =>
                              handleReportDoneChange(e, report?._id)
                            }
                          ></input>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(report?._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p> /ᐠ｡‸｡ᐟ\</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
