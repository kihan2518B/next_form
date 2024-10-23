"use client"
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
    contact: string;
    category: string;
    otherTalent: string;
};

const RegistrationForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        address: "",
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
            const deadline = new Date("2024-11-10T23:59:59");
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
                            તળ વિસનગર નાગર સમાજ
                        </h2>
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
                                    label="Contact"
                                    type="tel"
                                    value={formData.contact}
                                    onChange={handleInputChange("contact")}
                                    error={errors.contact}
                                    pattern="^[0-9]{10}$"
                                    placeholder="10-digit mobile number"
                                />
                            </div>

                            <SelectField
                                label="Talent Category"
                                value={formData.category}
                                onChange={handleInputChange("category")}
                                error={errors.category}
                            />

                            {formData.category === "other" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <TextAreaField
                                        label="Describe Your Talent"
                                        value={formData.otherTalent}
                                        onChange={handleInputChange("otherTalent")}
                                        error={errors.otherTalent}
                                        placeholder="Tell us about your unique talent"
                                    />
                                </motion.div>
                            )}
                        </motion.div>

                        <motion.button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-purple-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-3">
                                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                    Submitting...
                                </span>
                            ) : (
                                "Submit Registration"
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>

            <style jsx global>{`
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
            
            .shake {
                animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
            }

            .error-message {
                color: #dc2626;
                font-size: 0.875rem;
                margin-top: 0.25rem;
            }
        `}</style>
        </div>
    );
};

export default RegistrationForm;