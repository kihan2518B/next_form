"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { motion } from "framer-motion";

import InputField from "@/app/components/InputField";
import SelectField from "@/app/components/SelectField";
import TextAreaField from "@/app/components/TextAreaField";
import { Alert, AlertTitle, AlertDescription } from "@/app/components/ui/alert";

import { AlertCircle, Clock, Sparkles } from "lucide-react";

type FormData = {
    name: string;
    address: string;
    district: string;
    state: string;
    contact: string;
    category: string;
    otherTalent: string;
};

export const RegistrationForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        address: "",
        district: "",
        state: "",
        contact: "",
        category: "",
        otherTalent: "",
    });
    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
    });

    // Calculate time left until deadline
    useEffect(() => {
        const updateDeadline = () => {
            const deadline = new Date("2024-11-16T23:59:59");
            const now = new Date();
            const diff = deadline.getTime() - now.getTime();

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            setTimeLeft({ days, hours, minutes });
        };

        updateDeadline();
        const timer = setInterval(updateDeadline, 60000); // Update every minute

        return () => clearInterval(timer);
    }, []);

    const handleInputChange = (field: keyof FormData) => (e: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev: any) => ({
                ...prev,
                [field]: "",
            }));
        }
    };

    const validateForm = (): any => {
        const newErrors: any = {};

        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.address.trim()) newErrors.address = "Address is required.";
        if (!formData.district.trim()) newErrors.district = "District is required.";
        if (!formData.state.trim()) newErrors.state = "State is required.";
        if (!formData.contact.trim()) {
            newErrors.contact = "Contact number is required.";
        } else if (!formData.contact.match(/^[0-9]{10}$/)) {
            newErrors.contact = "Please enter a valid 10-digit number.";
        }
        if (!formData.category) newErrors.category = "Please select a category.";
        if (formData.category === "other" && !formData.otherTalent.trim()) {
            newErrors.otherTalent = "Please describe your talent.";
        }

        return newErrors;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            // Shake animation for form on error
            const form = document.querySelector('form');
            form?.classList.add('shake');
            setTimeout(() => form?.classList.remove('shake'), 500);
            return;
        }

        setIsSubmitting(true);
        setErrors({});
        console.log(formData);

        try {
            // Send data to check for duplicates and create user if none found
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Send all form data
            });

            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.message);
                setIsSubmitting(false);
                return;
            }

            const successData = await res.json();
            console.log(res.ok);

            toast.success(successData.message);

            // Reset form data
            setFormData({
                name: "",
                address: "",
                district: "",
                state: "",
                contact: "",
                category: "",
                otherTalent: "",
            });
        } catch (error) {
            toast.error("Failed to register. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 bg-gradient-to-r from-gray-900 to-gray-800">
            <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
            >
                <ToastContainer position="top-right" />

                <Alert className="mb-8 border-amber-300 bg-amber-50 shadow-lg">
                    <Clock className="h-5 w-5 text-amber-600" />
                    <AlertTitle className="text-amber-800 font-semibold">Registration Deadline</AlertTitle>
                    <AlertDescription className="text-amber-700">
                        Time remaining: {timeLeft.days} days, {timeLeft.hours} hours, and {timeLeft.minutes} minutes
                    </AlertDescription>
                </Alert>

                <motion.div
                    className="backdrop-blur-lg bg-white p-8 rounded-2xl shadow-xl border border-purple-100"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <Sparkles className="h-8 w-8 text-purple-600" />
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 p-2 bg-clip-text text-transparent">
                            Talent Registration Form
                        </h2>
                    </div>
                    <div className="font-semibold text-purple-500 pb-3 text-center">
                        <h4>
                            તળ વિસનગર નાગર સમાજ અને તળ વિસનગર યુવક મંડળ દ્વારા આયોજિત સ્નેહ સંમેલન રજીસ્ટ્રેશન ફોર્મ
                        </h4>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {Object.keys(errors).length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 p-4 rounded-xl border border-red-200 shadow-sm"
                            >
                                <div className="flex items-center gap-2 text-red-800">
                                    <AlertCircle className="h-5 w-5" />
                                    <span className="font-medium">Please correct the following errors:</span>
                                </div>
                            </motion.div>
                        )}

                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="relative">
                                <InputField
                                    label="Name"
                                    value={formData.name}
                                    onChange={handleInputChange("name")}
                                    error={errors.name}
                                />
                            </div>

                            <div className="relative">
                                <InputField
                                    label="Address"
                                    value={formData.address}
                                    onChange={handleInputChange("address")}
                                    error={errors.address}
                                />
                            </div>

                            <div className="relative">
                                <InputField
                                    label="District"
                                    value={formData.district}
                                    onChange={handleInputChange("district")}
                                    error={errors.district}
                                />
                            </div>

                            <div className="relative">
                                <InputField
                                    label="State"
                                    value={formData.state}
                                    onChange={handleInputChange("state")}
                                    error={errors.state}
                                />
                            </div>

                            <div className="relative">
                                <InputField
                                    label="Contact"
                                    type="tel"
                                    value={formData.contact}
                                    onChange={handleInputChange("contact")}
                                    error={errors.contact}
                                    pattern="^[0-9]{10}$"
                                />
                            </div>

                            <SelectField
                                label="Category"
                                value={formData.category}
                                onChange={handleInputChange("category")}
                                error={errors.category}
                            />

                            {formData.category === "other" && (
                                <div className="relative">
                                    <TextAreaField
                                        label="Please describe your talent"
                                        value={formData.otherTalent}
                                        onChange={handleInputChange("otherTalent")}
                                        error={errors.otherTalent}
                                    />
                                </div>
                            )}
                        </motion.div>

                        <motion.button
                            type="submit"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg w-full text-lg font-medium tracking-wide hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-purple-300"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
};

import { XOctagon, CalendarX } from "lucide-react";

export const RegistrationClosed = () => {
  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <Alert className="mb-8 border-red-300 bg-red-50 shadow-lg">
          <XOctagon className="h-5 w-5 text-red-600" />
          <AlertTitle className="text-red-800 font-semibold">Registration Closed</AlertTitle>
          <AlertDescription className="text-red-700">
            The registration deadline has passed. We are no longer accepting new submissions.
          </AlertDescription>
        </Alert>

        <motion.div
          className="backdrop-blur-lg bg-white p-8 rounded-2xl shadow-xl border border-purple-100"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <CalendarX className="h-8 w-8 text-purple-600" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 p-2 bg-clip-text text-transparent">
              Registration Period Ended
            </h2>
          </div>
          
          <div className="font-semibold text-purple-500 pb-3 text-center">
            <h4>
              તળ વિસનગર નાગર સમાજ અને તળ વિસનગર યુવક મંડળ દ્વારા આયોજિત સ્નેહ સંમેલન
            </h4>
          </div>

          <div className="text-center space-y-6 mt-8">
            <div className="flex justify-center">
              <Clock className="h-16 w-16 text-gray-400" />
            </div>
            <p className="text-xl text-gray-600">
              Thank you for your interest in participating.
            </p>
            <p className="text-gray-500">
              The registration period for this event has ended. We look forward to seeing all registered participants at the event.
            </p>
            <div className="bg-purple-50 p-6 rounded-xl mt-8">
              <p className="text-purple-600">
                For any queries regarding your existing registration or the event, please contact the event organizers.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
