importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");

async function loadPyodideAndPackages() {
    self.pyodide = await loadPyodide();
    await self.pyodide.loadPackage(["numpy"]); // Pre-load common packages if needed
}

let pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (event) => {
    const { id, python, action } = event.data;

    if (action === "load") {
        await pyodideReadyPromise;
        self.postMessage({ action: "loaded" });
        return;
    }

    if (action === "run") {
        await pyodideReadyPromise;
        try {
            // Redirect stdout/stderr
            self.pyodide.setStdout({ batched: (msg) => self.postMessage({ action: "output", output: msg + "\n" }) });
            self.pyodide.setStderr({ batched: (msg) => self.postMessage({ action: "error", output: msg + "\n" }) });

            const result = await self.pyodide.runPythonAsync(python);
            if (result !== undefined && result !== null) {
                self.postMessage({ action: "output", output: result.toString() + "\n" });
            }
            self.postMessage({ action: "finished", id });
            self.postMessage({ action: "finished", id });
        } catch (error) {
            let errorMessage = error.toString();

            // Check for common incomplete code errors that cause internal Pyodide crashes
            if (errorMessage.includes("_pyodide/_base.py") || errorMessage.includes("SyntaxError: unexpected EOF")) {
                errorMessage = "⚠️ Syntax Error: Your code is likely incomplete.\n" +
                    "Make sure all functions and loops (def, for, if) have a body (indented code inside).\n" +
                    "Tip: Use 'pass' as a placeholder if you haven't finished writing a block.\n\n" +
                    errorMessage;
            }

            self.postMessage({ action: "error", output: errorMessage + "\n" });
            self.postMessage({ action: "finished", id });
        }
    }
};
