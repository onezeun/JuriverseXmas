"use client";

import dynamic from 'next/dynamic';

const ChristmasEnvelope = dynamic(() => import('../components/ChristmasEnvelope'), { ssr: false });

export default function Page() {
    return <ChristmasEnvelope />;
}