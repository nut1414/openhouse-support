import Swal from "sweetalert2";

export default function password() {
  const setPassword = async (email, password) => {
    const res = await fetch(`/api/recovery/${email}`, {
        method: "POST",
        headers: {
            "access-token": localStorage.getItem("user"),
        },
        body: JSON.stringify({
          password
        })
    });
    if (res) {
        const data = await res.json();
        if (data) Swal.fire("Success","","success");
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
        }
        //   console.log(gift);
    }
};

  return (
    <>
    <div className="p-4 md:p-10 flex flex-col gap-4">
            <h1 className="text-3xl">Reset Password</h1>
            <form
                onSubmit={(e) => {
                    setPassword(e.target[0].value, e.target[1].value);
                    e.preventDefault();
                }}>
                <div className="flex flex-row gap-2 items-center">
                  <div>
                    <label>Email : </label>
                    <input type="text" name="email" className="w-3/4 md:1/2" />
                  </div>
                  <div>
                  <label>New Password : </label>
                    <input type="password" name="password" className="w-3/4 md:1/2" />
                  </div>
                </div>
                <div className="mt-4 flex flex-row gap-2 items-center">
                    <button type="submit" className="btn">Set Password</button>
                </div>
            </form>
        </div>
    </>
  )
}