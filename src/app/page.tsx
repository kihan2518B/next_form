"use client"
import RegistrationForm from "@/app/components/RegistrationForm";
import Loader from "@/app/components/Loader";
import { useState } from "react";

export default function Home() {
  const [showRegistrationForm, setShowRegistrationForm] = useState<boolean>(false)

  setTimeout(() => {
    setShowRegistrationForm(true)
  }, 4500)

  if (showRegistrationForm) return <RegistrationForm />
  else {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader />
      </div >
    )
  }
}
