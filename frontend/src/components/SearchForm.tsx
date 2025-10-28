"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";

type Props = {
  onSearch: (query: string, save?: boolean) => void;
  initialQuery?: string;
};

type FormValues = {
  query: string;
  saveToHistory: boolean;
};

export default function SearchForm({ onSearch, initialQuery = "" }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: { query: initialQuery, saveToHistory: true },
  });

  useEffect(() => {
    setValue('query', initialQuery || '');
  }, [initialQuery, setValue]);

  const onSubmit = (data: FormValues) => {
    if (data.query.trim().length === 0) return;
    onSearch(data.query.trim(), data.saveToHistory);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <input
          type="text"
          {...register("query", { required: "Please enter a search query." })}
          placeholder="Search… (e.g., nestjs, cats, typescript)"
          style={{ flex: 1, padding: "0.6rem 0.8rem" }}
        />
        <button type="submit" style={{ padding: "0.6rem 1rem" }}>
          Search
        </button>
      </div>
      {errors.query && (
        <div style={{ color: "crimson", marginTop: 4 }}>{errors.query.message}</div>
      )}
      <label style={{ display: "flex", gap: "0.5rem", marginTop: "0.6rem" }}>
        <input type="checkbox" {...register("saveToHistory")} />
        Save to history
      </label>
    </form>
  );
}
