import PredictionForm from "@/components/PredictionForm";

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 relative overflow-hidden">
            {/* Decorative background blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 blur-3xl" />
            </div>

            <div className="z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
                <header className="mb-12 text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
                        <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">Navi<span className="text-blue-600">Estimate</span></h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Instant, AI-driven house price predictions for Navi Mumbai real estate.
                    </p>
                </header>

                <PredictionForm />

                <footer className="mt-16 text-center text-sm text-slate-500 font-medium">
                    <p>Powered by XGBoost & FastAPI • Clean Architecture Design</p>
                </footer>
            </div>
        </main>
    );
}
