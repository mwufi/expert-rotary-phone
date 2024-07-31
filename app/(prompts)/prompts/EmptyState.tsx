import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EmptyState() {
    return (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                    You have no prompts
                </h3>
                <p className="text-sm text-muted-foreground">
                    Add a prompt to begin!
                </p>
                <Button className="mt-4" asChild>
                    <Link href="/prompts/new">Add Prompt</Link>
                </Button>
            </div>
        </div>
    );
}