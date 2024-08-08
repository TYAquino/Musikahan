// //app/components/signIn.js
// "use client";

// import React, { useState } from "react";
// import { useUserAuth } from "../../_utils/auth-context";
// import Link from "next/link";

// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const auth = useUserAuth();

//   console.log('Auth:', auth); // Add this line to debug

//   if (!auth) {
//     return <p>Loading...</p>; // Handle case where context is not available
//   }

//   const { emailSignIn } = auth;

//   const handleSignIn = async () => {
//     try {
//       await emailSignIn(email, password);
//       setMessage("Successfully signed in!");
//     } catch (error) {
//       setMessage(error.message);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-1xl text-center font-bold italic mb-5">Welcome Back!!!</h2>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         className="w-full p-2 border mb-4"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         className="w-full p-2 border rounded mb-12"
//       />
//       <button onClick={handleSignIn} className="w-full p-2 bg-blue-500 text-white mb-4 rounded transition-colors duration-300 hover:bg-blue-700">
//         Sign In
//       </button>
//       {message && <p className="text-red-500 mt-2">{message}</p>}
//       <div className="sign-up-link">
//           <Link href="/signUp"
//             className="text-pink-700 text-sm hover:underline active:text-green-500">Sign Up
//           </Link>
//       </div>
//       </div>

//   );
// }
