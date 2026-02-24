"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export default function PredictionForm() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        location: "airoli",
        area_sqft: 1000,
        bhk: 2,
        bathrooms: 2,
        floor: 5,
        total_floors: 10,
        age_of_property: 5,
        parking: 1,
        lift: 1,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: ["location"].includes(name) ? value : Number(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
            const res = await fetch(`${backendUrl}/api/v1/predict/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Failed to fetch prediction");
            }

            const data = await res.json();
            setResult(data.predicted_price);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl border-0 overflow-hidden bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
                <CardTitle className="text-3xl font-bold tracking-tight">Property Value Estimator</CardTitle>
                <p className="text-blue-100 mt-2 text-lg">Enter property details for Navi Mumbai to get a real-time AI valuation.</p>
            </CardHeader>
            <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
                            <select
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            >
                                <option value="airoli">Airoli</option>
                                <option value="ulwe">Ulwe</option>
                                <option value="panvel">Panvel</option>
                                <option value="kharghar">Kharghar</option>
                                <option value="ghansoli">Ghansoli</option>
                                <option value="nerul">Nerul</option>
                                <option value="vashi">Vashi</option>
                                <option value="cbd belapur">CBD Belapur</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Area (sq. ft.)</label>
                            <input
                                type="number"
                                name="area_sqft"
                                value={formData.area_sqft}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Bedrooms (BHK)</label>
                            <input
                                type="number"
                                step="0.5"
                                name="bhk"
                                value={formData.bhk}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Bathrooms</label>
                            <input
                                type="number"
                                step="0.5"
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Floor Number</label>
                            <input
                                type="number"
                                name="floor"
                                value={formData.floor}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Floors</label>
                            <input
                                type="number"
                                name="total_floors"
                                value={formData.total_floors}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Age of Property (Years)</label>
                            <input
                                type="number"
                                step="0.1"
                                name="age_of_property"
                                value={formData.age_of_property}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="flex gap-4 col-span-1 md:col-span-2 mt-2">
                            <div className="flex-1 space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Parking</label>
                                <select name="parking" value={formData.parking} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                                    <option value={1}>Yes (1)</option>
                                    <option value={0}>No (0)</option>
                                </select>
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Lift</label>
                                <select name="lift" value={formData.lift} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                                    <option value={1}>Yes (1)</option>
                                    <option value={0}>No (0)</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-transform transform active:scale-95 flex justify-center items-center gap-2"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : "Calculate Estimated Price"}
                    </button>
                </form>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-6 p-4 bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800"
                        >
                            <p className="font-semibold">{error}</p>
                        </motion.div>
                    )}

                    {result !== null && !error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="mt-8 p-8 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-emerald-900/20 dark:to-green-900/40 rounded-2xl border border-green-200 dark:border-green-800 text-center shadow-inner"
                        >
                            <h4 className="text-green-800 dark:text-green-300 text-sm font-bold uppercase tracking-wider mb-2">Estimated Market Value</h4>
                            <p className="text-5xl font-extrabold text-green-600 dark:text-green-400">
                                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(result)}
                            </p>
                            <p className="text-green-700/80 dark:text-green-400/80 text-sm mt-4 font-medium">Powered by ML Regression Model • High Confidence</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}
