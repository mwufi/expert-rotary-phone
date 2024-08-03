'use client'

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFirstCodeBlock } from '@/lib/utils';

interface PromptPreviewProps {
    output: string;
}

const PromptPreview: React.FC<PromptPreviewProps> = ({ output }) => {
    const [parsedHtml, setParsedHtml] = useState<string | null>(null);

    useEffect(() => {
        const htmlContent = getFirstCodeBlock(output, 'html');
        setParsedHtml(htmlContent);
    }, [output]);

    return (
        <Card className="w-full h-screen flex flex-col">
            {parsedHtml ? (
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
                            <div dangerouslySetInnerHTML={{ __html: parsedHtml || '' }} />
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
