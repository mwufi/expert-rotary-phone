"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle } from "lucide-react";
import { checkDomains, DomainResult } from "./server";

function DomainResultItem({ result }: { result: DomainResult }) {
    return (
        <div key={result.name} className="flex items-center space-x-2 p-2 bg-gray-100 rounded">
            {result.available ? (
                <CheckCircle className="text-green-500" />
            ) : (
                <XCircle className="text-red-500" />
            )}
            <span className="font-medium">{result.name}</span>
            <>
                {result.available
                    ? <span className="ml-auto text-green-500">Available ({result.price})</span>
                    : <span className="ml-auto text-red-500">Taken</span>}
            </>
        </div>
    )
}

export default function DomainChecker() {
    const [domains, setDomains] = useState("");
    const [results, setResults] = useState<DomainResult[]>([]);

    const handleCheck = async () => {
        const domainList = domains.split('\n').map(d => d.trim()).filter(Boolean);
        const checkResults = await checkDomains(domainList);
        setResults(checkResults);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Domain Availability Checker</h1>
            <div className="space-y-4">
                <Textarea
                    value={domains}
                    onChange={(e) => setDomains(e.target.value)}
                    placeholder="Enter domains to check (one per line)"
                    className="w-full h-40"
                />
                <Button onClick={handleCheck}>Check Domains</Button>
                <div className="space-y-2">
                    {results.map((result) => (
                        <DomainResultItem result={result} />
                    ))}
                </div>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Demo Results</h2>
                    <div className="space-y-2">
                        <DomainResultItem
                            result={{
                                name: "example.com",
                                available: true,
                                price: "$9.99"
                            }}
                        />
                        <DomainResultItem
                            result={{
                                name: "google.com",
                                available: false
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
