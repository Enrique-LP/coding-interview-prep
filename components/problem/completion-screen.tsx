"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Trophy, ArrowRight, RotateCcw, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

interface CompletionScreenProps {
    problemId: string;
    onReview: () => void;
}

export default function CompletionScreen({ problemId, onReview }: CompletionScreenProps) {
    const router = useRouter();

    useEffect(() => {
        // 1. Disparar el confeti al cargar el componente
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        const randomInRange = (min: number, max: number) =>
            Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // Lanza confeti desde dos puntos aleatorios
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        // Overlay oscuro de fondo
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">

            {/* Tarjeta con animación de entrada */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full max-w-md p-1"
            >
                {/* El borde gradiente rosa/morado brillante */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur opacity-75" />

                <div className="relative flex flex-col items-center rounded-2xl bg-zinc-900 p-8 text-center border border-zinc-800 shadow-2xl">

                    {/* Icono de Trofeo */}
                    <div className="mb-6 rounded-full bg-yellow-500/10 p-4 ring-1 ring-yellow-500/50">
                        <Trophy className="h-10 w-10 text-yellow-500" />
                    </div>

                    <h2 className="mb-2 text-2xl font-bold text-white">
                        Problem Completed!
                    </h2>

                    {/* Frase inspiradora */}
                    <div className="mb-8 rounded-lg bg-zinc-800/50 p-4 italic text-zinc-400">
                        "The best way to predict the future is to create it."
                    </div>

                    {/* Botón Principal (Siguiente Lección) */}
                    <button
                        onClick={() => router.push('/')} // Por ahora redirige al home, luego podemos hacer que vaya al siguiente
                        className="group mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                    >
                        Back to Dashboard
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    {/* Botones Secundarios */}
                    <div className="flex w-full justify-between gap-4">
                        <button
                            onClick={onReview}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700"
                        >
                            <RotateCcw className="h-4 w-4" />
                            Review Solution
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
