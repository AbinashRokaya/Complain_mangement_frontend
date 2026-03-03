import React from "react";

function Home() {
  return (
    // <div className="h-screen flex justify-center     bg-slate-600 flex-col">
    //   <div className=" h-80 flex justify-center items-center flex-col">
    //     <h1 className="text-4xl ">Public Complain System</h1>
    //     <p className="text-slate-400 max-w-xl text-base leading-relaxed">
    //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
    //       ea excepturi corporis magni placeat libero nisi labore? Pariatur ab,
    //       et sequi nisi aspernatur nulla nesciunt repellendus numquam,
    //       voluptates animi dignissimos?
    //     </p>
    //   </div>

    //   <div className="w-full h-40 flex items-center gap-4 justify-around mt-5 bg-pink-200">
    //     <div>
    //       <p>2,500+</p>
    //       <p>complaints Filed</p>
    //     </div>
    //     <div>
    //       <p>89%</p>
    //       <p>Resolution Rate</p>
    //     </div>
    //     <div>
    //       <p>48hrs</p>
    //       <p>Avg. Response</p>
    //     </div>
    //     <div>
    //       <p>75</p>
    //       <p>Districts Covered</p>
    //     </div>
    //   </div>
    //   <div>
    //     <h2>Secure & Transparent</h2>
    //     <p>
    //       JWT-based authentication ensures your data is protected. Role-based
    //       access separates citizen and admin workflows for efficient complaint
    //       management.
    //     </p>
    //   </div>
    // </div>

    <div className="min-h-screen flex justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex-col">
      <div className="h-80 flex justify-center items-center flex-col text-center px-6 gap-4">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Public <span className="text-amber-400">Complaint</span> System
        </h1>
        <p className="text-slate-400 max-w-xl text-base leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
          ea excepturi corporis magni placeat libero nisi labore? Pariatur ab,
          et sequi nisi aspernatur nulla nesciunt repellendus numquam,
          voluptates animi dignissimos?
        </p>
      </div>
      <div className="w-full flex items-center gap-4 justify-around mt-5 bg-slate-800/60 border-y border-slate-700 py-8 px-4">
        <div className="flex flex-col items-center gap-1">
          <p className="text-3xl font-black text-amber-400">2,500+</p>
          <p className="text-slate-400 text-sm font-medium">Complaints Filed</p>
        </div>
        <div className="w-px h-10 bg-slate-700" />
        <div className="flex flex-col items-center gap-1">
          <p className="text-3xl font-black text-amber-400">89%</p>
          <p className="text-slate-400 text-sm font-medium">Resolution Rate</p>
        </div>
        <div className="w-px h-10 bg-slate-700" />
        <div className="flex flex-col items-center gap-1">
          <p className="text-3xl font-black text-amber-400">48hrs</p>
          <p className="text-slate-400 text-sm font-medium">Avg. Response</p>
        </div>
        <div className="w-px h-10 bg-slate-700" />
        <div className="flex flex-col items-center gap-1">
          <p className="text-3xl font-black text-amber-400">75</p>
          <p className="text-slate-400 text-sm font-medium">
            Districts Covered
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
