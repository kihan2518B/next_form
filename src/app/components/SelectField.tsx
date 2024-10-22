import { ChangeEvent } from "react";
import { AlertCircle } from "lucide-react";

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const SelectField = ({ label, value, onChange, error }: SelectFieldProps) => (
  <div className="space-y-2">
    <label className="block font-medium text-gray-700">
      {label}
      <span className="text-red-500">*</span>
    </label>
    <select
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
        error ? "border-red-500 bg-red-50" : "border-gray-300"
      } hover:border-purple-400`}
    >
      <option value="">Select a category</option>
      <option value="shlok">Shlok gaan - 3 shloks</option>
      <option value="singing">Singing - 3-4 mins</option>
      <option value="dancing">Dancing - 3-4 mins</option>
      <option value="mimicry">Mimicry - Max 4 mins</option>
      <option value="act">Act - Max 3-4 mins</option>
      <option value="instrument">Instrument playing - 3-4 mins</option>
      <option value="other">Other - Max 4 mins</option>
    </select>
    {error && (
      <div className="flex items-center gap-1 text-red-500 text-sm">
        <AlertCircle size={16} />
        <span>{error}</span>
      </div>
    )}
  </div>
);

export default SelectField;
