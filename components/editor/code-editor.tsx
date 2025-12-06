"use client"
import Editor, { OnMount, BeforeMount } from "@monaco-editor/react"
import { useStore } from "@/lib/store"
import { useRef } from "react"
import { toast } from "sonner"

interface CodeEditorProps {
  readOnly?: boolean
}

export function CodeEditor({ readOnly = false }: CodeEditorProps) {
  const { code, setCode, validateStep } = useStore()
  const editorRef = useRef<any>(null)

  const handleEditorWillMount: BeforeMount = (monaco) => {
    monaco.editor.defineTheme("custom-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#09090b", // Matches bg-zinc-950
      },
    })
  }

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor

    // Add keybinding for Shift+Enter to validate
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Enter, () => {
      const isValid = validateStep()
      if (isValid) {
        toast.success("Correct! Moving to next step.")
        // Insert newline manually to help user continue
        editor.trigger('keyboard', 'type', { text: '\n' })
      } else {
        toast.error("Incorrect code. Try again.")
      }
    })
  }

  return (
    <div className="h-full w-full bg-zinc-950">
      <Editor
        height="100%"
        defaultLanguage="python"
        value={code}
        onChange={(val) => setCode(val || "")}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        theme="custom-dark"
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 15,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 24, bottom: 24 },
          fontFamily: "var(--font-mono)",
          renderLineHighlight: "all",
          cursorBlinking: "smooth",
          smoothScrolling: true,
        }}
      />
      <div className="absolute bottom-4 right-6 text-xs text-zinc-500 pointer-events-none select-none z-10">
        Press <span className="font-bold text-zinc-400">Shift + Enter</span> to submit
      </div>
    </div>
  )
}
