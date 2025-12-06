import { useEffect, useRef, useState, useCallback } from "react";

interface PyodideOutput {
    type: "stdout" | "stderr";
    text: string;
}

export function usePyodide() {
    const workerRef = useRef<Worker | null>(null);
    const [output, setOutput] = useState<PyodideOutput[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        workerRef.current = new Worker("/pyodide-worker.js");

        workerRef.current.onmessage = (event) => {
            const { action, output: text } = event.data;

            if (action === "loaded") {
                setIsReady(true);
            } else if (action === "output") {
                setOutput((prev) => [...prev, { type: "stdout", text }]);
            } else if (action === "error") {
                setOutput((prev) => [...prev, { type: "stderr", text }]);
            } else if (action === "finished") {
                setIsRunning(false);
                setOutput((prev) => [...prev, { type: "stdout", text: "\n=== Execution finished ===\n" }]);
            }
        };

        workerRef.current.postMessage({ action: "load" });

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    const runCode = useCallback((code: string) => {
        if (!workerRef.current || !isReady) return;

        setIsRunning(true);
        setOutput([]); // Clear previous output
        workerRef.current.postMessage({ action: "run", python: code });
    }, [isReady]);

    return { runCode, output, isRunning, isReady };
}
