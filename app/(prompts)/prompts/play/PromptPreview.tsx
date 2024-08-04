'use client'

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFirstCodeBlock } from '@/lib/utils';
import { createPortal } from 'react-dom';

interface PromptPreviewProps {
    output: string;
    waiting: boolean;
}

function IFrame({ children }) {
    const [ref, setRef] = useState<HTMLIFrameElement | null>(null);
    const container = ref?.contentWindow?.document?.body;

    return (
        <iframe ref={setRef} className='w-full h-full' style={{ border: 'none' }}>
            {container && createPortal(children, container)}
        </iframe>
    );
}


const PromptPreview: React.FC<PromptPreviewProps> = ({ output, waiting }) => {
    const [parsedHtml, setParsedHtml] = useState<string | null>(null);

    useEffect(() => {
        const htmlContent = getFirstCodeBlock(output, 'html');
        setParsedHtml(htmlContent);
    }, [output]);

    return (
        <Card className="w-full h-full flex flex-col">
            {waiting ? (
                <div className="flex items-center justify-center h-full">
                    <p className="text-lg">Waiting for AI...</p>
                </div>
            ) : parsedHtml ? (
                <Tabs defaultValue="raw" className="w-full h-full flex flex-col">
                    <TabsList className="flex w-full">
                        <TabsTrigger value="raw" className="flex-1 py-1 px-2 text-sm">Raw Output</TabsTrigger>
                        <TabsTrigger value="preview" className="flex-1 py-1 px-2 text-sm">HTML Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="raw" className="flex-grow">
                        <ScrollArea className="h-[70vh] w-full rounded-md border p-4">
                            <pre className="whitespace-pre-wrap">{output}</pre>
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="preview" className="flex-grow">
                        <div className="h-[70vh] w-full rounded-md border">
                            <IFrame>
                                <div dangerouslySetInnerHTML={{ __html: parsedHtml || '' }} />
                            </IFrame>
                        </div>
                    </TabsContent>
                </Tabs>
            ) : (
                <ScrollArea className="h-full w-full rounded-md border p-4">
                    <ScrollArea className="h-[70vh] w-full rounded-md border p-4">
                        <pre className="whitespace-pre-wrap">{output}</pre>
                    </ScrollArea>
                </ScrollArea>
            )}
        </Card>
    );
};

export default PromptPreview;
