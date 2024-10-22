import { ChangeEvent } from "react";
import { AlertCircle } from "lucide-react";

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    type?: "text" | "tel" | "email";
    pattern?: string;
    placeholder?: string;
}

const InputField = ({
    label,
    value,
    onChange,
    error,
    type = "text",
    pattern,
    placeholder = "",
}: InputFieldProps) => (
    <div className="space-y-2">
        <label className="block font-medium text-gray-700">
            {label}
            <span className="text-red-500">*</span>
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            pattern={pattern}
            placeholder={placeholder}
            className={`w-full px-4 py-2 transition-all duration-200 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${error ? "border-red-500 bg-red-50" : "border-gray-300"
                } hover:border-purple-400 transition-all duration-200 ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
        />
        {error && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
                <AlertCircle size={16} />
                <span>{error}</span>
            </div>
        )}
    </div>
);

export default InputField;
