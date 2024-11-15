"use client"
import Loader from "@/app/components/Loader";
import { useState } from "react";
import { RegistrationClosed } from "./components/RegistrationForm";

export default function Home() {
  const [showRegistrationForm, setShowRegistrationForm] = useState<boolean>(false)

  setTimeout(() => {
    setShowRegistrationForm(true)
  }, 4500)

  if (showRegistrationForm) return <RegistrationClosed />
  else {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader />
      </div >
    )
  }
}
