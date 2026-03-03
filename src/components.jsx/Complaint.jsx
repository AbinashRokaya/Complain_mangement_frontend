import React, { useContext, useRef, useState } from "react";
import { LoginContext } from "../context/LoginContext";

const steps = ["Details", "Location", "Evidence"];
const complaintTypes = [
  "Traffic Violation",
  "Road Damage",
  "Public Transport",
  "Parking Issue",
  "Noise Pollution",
];
const categories = ["Minor", "Moderate", "Severe", "Emergency"];

const district = [
  "Achham",
  "Arghakhanchi",
  "Baglung",
  "Baitadi",
  "Bajhang",
  "Bajura",
  "Banke",
  "Bara",
  "Bardiya",
  "Bhaktapur",
  "Bhojpur",
  "Chitwan",
  "Dadeldhura",
  "Dailekh",
  "Dang",
  "Darchula",
  "Dhading",
  "Dhankuta",
  "Dhanusha",
  "Dolakha",
  "Dolpa",
  "Doti",
  "Eastern Rukum",
  "Gorkha",
  "Gulmi",
  "Humla",
  "Ilam",
  "Jajarkot",
  "Jhapa",
  "Jumla",
  "Kailali",
  "Kalikot",
  "Kanchanpur",
  "Kapilvastu",
  "Kaski",
  "Kathmandu",
  "Kavrepalanchok",
  "Khotang",
  "Lalitpur",
  "Lamjung",
  "Mahottari",
  "Makwanpur",
  "Manang",
  "Morang",
  "Mugu",
  "Mustang",
  "Myagdi",
  "Nawalpur",
  "Nuwakot",
  "Okhaldhunga",
  "Palpa",
  "Panchthar",
  "Parasi",
  "Parbat",
  "Parsa",
  "Pyuthan",
  "Ramechhap",
  "Rasuwa",
  "Rautahat",
  "Rolpa",
  "Rupandehi",
  "Salyan",
  "Sankhuwasabha",
  "Saptari",
  "Sarlahi",
  "Sindhuli",
  "Sindhupalchok",
  "Siraha",
  "Solukhumbu",
  "Sunsari",
  "Surkhet",
  "Syangja",
  "Tanahun",
  "Taplejung",
  "Tehrathum",
  "Udayapur",
  "Western Rukum",
];

function Complaint() {
  const {
    login,
    setIsError,
    setError,
    errors,
    success,
    setIsSucces,
    setSucess,
    IsSuccess,
  } = useContext(LoginContext);
  const [step, setStep] = useState(0);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState([]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef();

  const handleNext = () => {
    if (step === 0) {
      if (!type || !category || !description) {
        setIsError(true);
        setError("Please fill all required fields");
        return;
      }
    }

    // Step 1 validation
    if (step === 1) {
      if (!location) {
        setIsError(true);
        setError("Please fill all required fields");

        return;
      }
    }

    setStep((s) => Math.min(s + 1, 2));
  };
  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFile((f) => ({ ...f, files: [...f.files, ...dropped] }));
  };

  const handleFileInput = (e) => {
    const selected = Array.from(e.target.files);
    setFile((f) => ({ ...f, files: [...f.files, ...selected] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const token = JSON.parse(localStorage.getItem("userdata"));
    // consle.log(token["access_token"]);
    fetch("/api/complain/post", {
      method: "POST",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        complain_type: type,
        category: category,
        description: description,
        location: location,
      }),
    })
      .then((response) => {
        return response.json().then((data) => {
          if (!response.ok) {
            throw data;
          }
          return data;
        });
      })
      .then((data) => {
        console.log("Server response:", data);

        setIsSucces(true);
        setSucess("Successfully added new complain");

        login(data);
        nagavitor("/home");
      })
      .catch((err) => {
        console.log(err);

        setIsError(true);

        if (err.detail && err.detail.length > 0) {
          setError(err.detail);
        } else {
          setError("Complain failed");
        }
      });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 font-sans">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-9 w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-white text-2xl font-bold">New Complaint</h1>
          <p className="text-gray-500 text-sm mt-1">
            Provide details about the transportation issue
          </p>
        </div>
        <div className="flex items-center justify-center mb-10">
          {steps.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div key={i} className="flex items-center">
                {i > 0 && (
                  <div
                    className={`h-0.5 w-20 ${done || active ? "bg-amber-400" : "bg-gray-700"}`}
                  />
                )}
                <div className="flex flex-col items-center relative">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
                      ${
                        done || active
                          ? "bg-amber-400 border-amber-400 text-gray-900"
                          : "bg-gray-800 border-gray-600 text-gray-500"
                      }`}
                  >
                    {done ? "✓" : i + 1}
                  </div>
                  <span
                    className={`absolute -bottom-6 text-xs font-medium whitespace-nowrap
                      ${active ? "text-amber-400" : done ? "text-amber-200" : "text-gray-500"}`}
                  >
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6">
          {/* Step 1 – Details */}
          {step === 0 && (
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  Complaint Type
                </label>
                <select
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-sm outline-none cursor-pointer focus:border-amber-400 transition-colors"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Select type...</option>
                  {complaintTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  Category
                </label>
                <select
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-sm outline-none cursor-pointer focus:border-amber-400 transition-colors"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category...</option>
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  Description
                </label>
                <textarea
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-sm outline-none resize-y min-h-28 focus:border-amber-400 transition-colors placeholder-gray-600 font-sans"
                  placeholder="Describe the issue in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2 – Location */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  Location
                </label>
                <select
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-sm outline-none cursor-pointer focus:border-amber-400 transition-colors"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">Select type...</option>
                  {district.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Map Placeholder */}
              <div className="relative bg-gray-800 border border-gray-700 rounded-xl h-48 overflow-hidden flex flex-col items-center justify-center gap-2">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(#4b5563 1px, transparent 1px), linear-gradient(90deg, #4b5563 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <span className="text-3xl z-10">📍</span>
                <span className="text-gray-500 text-sm z-10">
                  Map integration available in full version
                </span>
              </div>
            </div>
          )}

          {/* Step 3 – Evidence */}
          {step === 2 && (
            <div>
              <div
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer flex flex-col items-center gap-2 transition-all
                  ${
                    dragging
                      ? "border-amber-400 bg-amber-400/5"
                      : "border-gray-700 bg-gray-900 hover:border-gray-500"
                  }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <span className="text-4xl">📁</span>
                <p className="text-gray-200 font-semibold text-sm">
                  Drag & drop files here
                </p>
                <p className="text-gray-500 text-xs">
                  Supports images, videos, and documents
                </p>
                {file.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {file.map((f, i) => (
                      <span
                        key={i}
                        className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full"
                      >
                        {f.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileInput}
              />
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center mt-8 gap-3">
          {step > 0 && (
            <button
              className="px-5 py-3 rounded-lg border border-gray-700 text-gray-300 text-sm font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={handleBack}
            >
              ← Back
            </button>
          )}
          {step < 2 ? (
            <button
              className="ml-auto px-7 py-3 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-sm rounded-lg transition-colors cursor-pointer"
              onClick={handleNext}
            >
              Continue →
            </button>
          ) : (
            <button
              className="ml-auto px-7 py-3 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-sm rounded-lg transition-colors cursor-pointer"
              onClick={handleSubmit}
            >
              Submit Complaint ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
  //   return (
  // <div className=" min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex-col">
  //   <div>
  //     <h1>New Complaint</h1>
  //     <p>Provide details about the transportation issue</p>
  //   </div>
  //   <div>
  //     <div className="flex flex-col gap-2 mb-4">
  //       <label htmlFor="" className="font-sans font-medium text-md">
  //         Complaint Type
  //       </label>
  //       <select
  //         className="bg-slate-200 h-10 rounded-lg text-md p-2 border-2 border-slate-400 "
  //         placeholder="Your password"
  //         // value={password}
  //         // onChange={(e) => setPassword(e.target.value)}
  //       >
  //         {" "}
  //         <option>Option 1</option>
  //         <option>Option 2</option>
  //         <option>Option 3</option>
  //       </select>
  //     </div>
  //     <div className="flex flex-col gap-2 mb-4">
  //       <label htmlFor="" className="font-sans font-medium text-md">
  //         Category
  //       </label>
  //       <select
  //         className="bg-slate-200 h-10 rounded-lg text-md p-2 border-2 border-slate-400 "
  //         placeholder="Your password"
  //         // value={password}
  //         // onChange={(e) => setPassword(e.target.value)}
  //       >
  //         {" "}
  //         <option>Option 1</option>
  //         <option>Option 2</option>
  //         <option>Option 3</option>
  //       </select>
  //     </div>
  //     <div className="flex flex-col gap-2 mb-4 ">
  //       <label htmlFor="" className="font-sans font-medium text-md ">
  //         Password
  //       </label>
  //       <input
  //         type="text-area"
  //         className="bg-slate-200 h-10 rounded-lg text-md p-2 border-2 border-slate-400 "
  //         placeholder="Your password"
  //       />
  //     </div>
  //   </div>
  // </div>
  //   );
}

export default Complaint;
