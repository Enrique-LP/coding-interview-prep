"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { useMediaQuery } from "@/hooks/use-media-query"

interface MainLayoutProps {
    leftPanel: React.ReactNode
    rightPanel: React.ReactNode
}

export function MainLayout({ leftPanel, rightPanel }: MainLayoutProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (!isDesktop) {
        return (
            <div className="flex flex-col min-h-screen bg-zinc-950">
                <div className="w-full h-[50vh] border-b border-zinc-800">
                    {leftPanel}
                </div>
                <div className="w-full h-[50vh]">
                    {rightPanel}
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen w-full bg-background text-foreground overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={40} minSize={30} className="bg-background">
                    {leftPanel}
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={60} minSize={30} className="bg-zinc-950">
                    {rightPanel}
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
