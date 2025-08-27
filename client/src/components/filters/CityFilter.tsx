import { useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  onChange: (city: string | null) => void;
};

export function CityFilter({ onChange }: Props) {
  const [value, setValue] = useState<string | null>(null);

  const debounced = useDebouncedCallback(
    (value) => {
      onChange(value);
    }, 1000);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || null;
    setValue(value);
    debounced(value)
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">City</label>
      <input
        type="text"
        placeholder="Enter city..."
        value={value ?? ""}
        onChange={handleChange}
        className="border rounded p-2"
      />
    </div>
  );
}