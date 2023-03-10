import Image from "next/image";
import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Swal from "sweetalert2";
import Login from "@/components/Login";
import { qrForm } from "@/constants/qrform";
import Link from "next/link";
import { useRouter } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, status, login, logout } = useAuth();
  const [forms, setForms] = useState([]);
  const [qrImage, setQRImage] = useState("");
  const [countRecieved, setCountRecieved] = useState(0);

  const router = useRouter();

  const getQr = async () => {
    const res = await fetch("/api/qrcode", {
      headers: {
        "access-token": localStorage.getItem("user"),
      },
    });
    if (res) {
      const data = await res.json();
      if (data?.forms) setForms(data.forms);
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
      console.log(forms);
    }
  };

  const getCountRecieved = async () => {
    const res = await fetch(`/api/user/countGiftRecieved`, {
      method: "GET",
      headers: {
        "access-token": localStorage.getItem("user"),
      },
    });
    if (res) {
      const data = await res.json();
      if (data) setCountRecieved(data);
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
        setCountRecieved(0);
      }
      console.log(countRecieved);
    }
  };
  useEffect(() => {
    console.log({ status, user });
    getQr();
    // getCountRecieved();
    const interval = setInterval(() => {
      if (status == "authenticated") {
        getQr();
        // getCountRecieved();
      }
      router.refresh();
    }, 60000 * 5);
    return () => clearInterval(interval);
  }, [status, user]);

  const handleChange = (value) => {
    forms.map((form, idx) => {
      if (form.form_type == value) {
        setQRImage(form.qr_code);
      }
    });
  };

  return (
    <>
      <main>
        <div>
          <div className="min-h-[120vh]">
            {status == "loading" ? (
              <p>Loading...</p>
            ) : status == "unauthenticated" ? (
              <Login />
            ) : status == "authenticated" ? (
              <div>
                <div className="text-2xl text-center">
                  <p className="bg-orange-600 text-white py-2">
                    Login as
                    <span className="ml-2 text-gray-100 font-bold">
                      {user.name}
                    </span>
                    <button
                      onClick={logout}
                      className="bg-red-500 p-2 m-4 text-white rounded-xl"
                    >
                      Log out
                    </button>
                  </p>
                  {}
                </div>
                <div className="flex justify-center items-center gap-4 flex-wrap">
                  <Link href="/report" className="btn mt-4">
                    ???????????? Report ??????????????? ???
                  </Link>
                  {/* <Link href="/prize" className="btn mt-4">
                    ??????????????????????????????????????? ???
                  </Link>
                  <Link href="/stamp" className="btn mt-4">
                    ???????????? Stamp ???
                  </Link>
                  <Link href="/password" className="btn mt-4">
                    ???????????? Reset Password ???
                  </Link> */}
                </div>
                <div className="flex flex-col justify-center items-center gap-y-5">
                  <span className="btn">
                    ?????????????????????????????????????????????{" "}
                    <span className="bg-red-500 p-0.5 rounded-lg">1320</span> ??????
                    ???
                  </span>
                  {/* <h2 className="text-xl -mt-3">????????????????????????????????????</h2> */}
                  {/* <div className="relative w-1/2 mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <select
                      className="w-full p-2.5 text-gray-900 font-medium bg-white text-center border rounded-md shadow-sm outline-none appearance-none focus:border-juicy-100 focus:ring-juicy-100"
                      aria-label="Select Type"
                      onChange={(e) => handleChange(e.target.value)}
                    >
                      <option defaultValue={0} value="0">
                        ???????????????????????????????????????????????????
                      </option>
                      {qrForm.length != 0
                        ? qrForm.map((qr, id) => {
                            return (
                              <option key={id} value={qr.type}>
                                {qr.name}
                              </option>
                            );
                          })
                        : null}
                    </select>
                  </div> */}
                  {qrImage != "" ? (
                    <div className="qr border">
                      <Image
                        src={qrImage}
                        alt="qrcode"
                        width="500"
                        height="500"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <>Error</>
            )}
          </div>
        </div>
        {/* Footer dev */}
        <div className="text-black py-2  text-center bottom-0 bg-gray-200 w-full">
          <p className="text-xl font-bold">
            Developed by{" "}
            <Link href="https://github.com/ChaiyapatOam" className="underline">
              Kabigon
            </Link>{" "}
            &{" "}
            <Link href="https://github.com/nut1414" className="underline">
              Nut
            </Link>
          </p>
          <Link href="/contact" className="text-red-500 text-lg">
            ??????????????????????????????
          </Link>
          <p className="text-md">CPE, KMUTT {" : )"}</p>
        </div>
      </main>
    </>
  );
}
