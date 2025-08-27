import { useState } from "react";

type Props = {
  onChange: (gender: string | null) => void;
};

export function GenderFilter({ onChange }: Props) {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value || null;
    setValue(val || '');
    onChange(value);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Gender</label>
      <select
        value={value}
        onChange={handleChange}
        className="border rounded p-2"
      >
        <option value="">All</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Fluid">Fluid</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
}