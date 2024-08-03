'use client'

import { useParams } from 'next/navigation';
import PromptsPlayPage from '../play/page';

export default function PromptDetailPage() {
    const { id } = useParams();

    return <PromptsPlayPage id={id as string} />;
}
