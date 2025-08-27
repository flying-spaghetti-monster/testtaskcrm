import { useState } from "react";
import countryList from '../../data/countryList.json';

type Props = {
  onChange: (country: string | null) => void;
};

export function CountryFilter({ onChange }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || null;
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Country</label>
      <select
        value={selected ?? ""}
        onChange={handleChange}
        className="border rounded p-2"
      >
        <option value="">All</option>
        {countryList.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}