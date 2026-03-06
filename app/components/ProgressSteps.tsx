'use client';

import { Check } from 'lucide-react';

interface Props {
    currentStep: number;
}

export default function ProgressSteps({ currentStep }: Props) {
    const steps = [
        { num: 1, label: 'Cart' },
        { num: 2, label: 'Delivery' },
        { num: 3, label: 'Payment' },
    ];

    return (
        <div style={{ padding: '24px 16px 8px', maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                {steps.map((step, index) => {
                    const isActive = step.num === currentStep;
                    const isPast = step.num < currentStep;

                    return (
                        <div key={step.num} style={{ display: 'flex', alignItems: 'center' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    opacity: isActive || isPast ? 1 : 0.5,
                                    transition: 'opacity 0.2s',
                                }}
                            >
                                <div
                                    style={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: '50%',
                                        background: isPast ? '#277c4e' : isActive ? '#212121' : '#e0e0e0',
                                        color: isPast || isActive ? 'white' : '#666',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 13,
                                        fontWeight: 700,
                                        transition: 'background 0.3s',
                                    }}
                                >
                                    {isPast ? <Check size={16} /> : step.num}
                                </div>
                                <span
                                    style={{
                                        fontSize: 14,
                                        fontWeight: isActive ? 700 : 600,
                                        color: isActive ? '#212121' : isPast ? '#277c4e' : '#888',
                                    }}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {index < steps.length - 1 && (
                                <div
                                    style={{
                                        width: 40,
                                        height: 2,
                                        background: isPast ? '#277c4e' : '#e0e0e0',
                                        margin: '0 16px',
                                        borderRadius: 2,
                                        transition: 'background 0.3s',
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
