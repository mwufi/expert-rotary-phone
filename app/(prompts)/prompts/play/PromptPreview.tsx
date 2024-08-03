'use client'

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PromptPreviewProps {
    output: string;
}

const PromptPreview: React.FC<PromptPreviewProps> = ({ output }) => {
    const [hasHtml, setHasHtml] = useState(false);

    useEffect(() => {
        // Simple check for HTML content
        setHasHtml(/<[a-z][\s\S]*>/i.test(output));
    }, [output]);

    return (
        <Card className="w-full h-screen flex flex-col">
            {hasHtml ? (
                <Tabs defaultValue="raw" className="w-full h-full flex flex-col">
                    <TabsList className="flex w-full">
                        <TabsTrigger value="raw" className="flex-1 py-1 px-2 text-sm">Raw Output</TabsTrigger>
                        <TabsTrigger value="preview" className="flex-1 py-1 px-2 text-sm">HTML Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="raw" className="flex-grow">
                        <ScrollArea className="h-full w-full rounded-md border p-4">
                            <pre className="whitespace-pre-wrap">{output}</pre>
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="preview" className="flex-grow">
                        <ScrollArea className="h-full w-full rounded-md border p-4">
                            <div dangerouslySetInnerHTML={{ __html: output }} />
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            ) : (
                <ScrollArea className="h-full w-full rounded-md border p-4">
                    <pre className="whitespace-pre-wrap">{output}</pre>
                </ScrollArea>
            )}
        </Card>
    );
};

export default PromptPreview;
