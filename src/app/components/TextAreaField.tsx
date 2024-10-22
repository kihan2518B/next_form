import { ChangeEvent } from "react";
import { AlertCircle } from "lucide-react";

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
}

const TextAreaField = ({
  label,
  value,
  onChange,
  error,
  placeholder = "",
}: TextAreaFieldProps) => (
  <div className="space-y-2">
    <label className="block font-medium text-gray-700">
      {label}
      <span className="text-red-500">*</span>
    </label>
    <textarea
      value={value}
      onChange={onChange}
      rows={3}
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${error ? "border-red-500 bg-red-50" : "border-gray-300"
        } hover:border-purple-400 transition-all duration-200 ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
      placeholder={placeholder}
    />
    {error && (
      <div className="flex items-center gap-1 text-red-500 text-sm">
        <AlertCircle size={16} />
        <span>{error}</span>
      </div>
    )}
  </div>
);

export default TextAreaField;
