import React from "react";

export default function Contact() {
  return (
    <div className="icons-container flex flex-col justify-center items-center my-20">
      <h1 className="py-4 text-4xl">ติดต่อด่วน</h1>
      <div className="flex flex-row items-center space-x-6 w-1/2 rounded-md border border-gray-400 hover:border hover:border-juicy-100 p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-telephone-fill h-4 w-4 text-juicy-100"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
          />
        </svg>
        <a
          href="tel:0630715705"
          className="text-black font-bold text-base underline"
        >
          0630715705 (Kabigon)
        </a>
      </div>
      <div className="flex flex-row items-center space-x-6 w-1/2 rounded-md border border-gray-400 hover:border hover:border-juicy-100 p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-telephone-fill h-4 w-4 text-juicy-100"
          viewBox="0 0 16 16"
        >
          
        </svg>
        <a
          href=""
          className="text-black font-bold text-base underline"
        >
          Discord: nut1414#6428 (Nut)
        </a>
      </div>
    </div>
  );
}
