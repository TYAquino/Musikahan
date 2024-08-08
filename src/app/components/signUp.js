// //app/components/signUp.js
// "use client";

// import React, { useState } from "react";
// import { useUserAuth } from "../../_utils/auth-context";
// import Link from "next/link";

// export default function SignUp() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [message, setMessage] = useState("");
//   const auth = useUserAuth();

//   if (!auth) {
//     return <p>Loading...</p>; // Handle case where context is not available
//   }

//   const { emailSignUp } = auth;

//   const handleSignUp = async () => {
//     try {
//       await emailSignUp(email, password);
//       setMessage("Successfully signed up!");
//     } catch (error) {
//       setMessage(error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen ">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg opacity-90">
//         <div className="text-center mb-6">
//           {/* Logo */}
//           <img
//             src="/images/picture1.png" // Replace with the actual path to your logo
//             alt="logo"
//             width={100} // Adjust width as needed
//             height={100} // Adjust height as needed
//             className="mx-auto"
//           />
//           {/* Tagline */}
//           <p className="text-2xl font-semibold italic">Join Us in Music Exploration!</p>
//         </div>
//         <h2 className="text-xl font-bold text-center mb-6">Create an Account</h2>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           className="w-full p-3 border rounded mb-4"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="w-full p-3 border rounded mb-6"
//         />
//         <button onClick={handleSignUp} className="w-full p-3 bg-blue-500 text-white rounded transition-colors duration-300 hover:bg-blue-700">
//           Sign Up
//         </button>
//         {message && <p className="text-red-500 text-center mt-3">{message}</p>}
//         <div className="text-center mt-4">
//           <Link href="/signIn"
//             className="text-gray-900 text-sm hover:underline active:text-blue-800">Already have an account? Sign In
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
