'use client'
import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { feedback, LeetCodeQuestion } from './server';

const LeetCodeSwiper: React.FC = async ({ questions }: { questions: LeetCodeQuestion[] }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const controls = useAnimation();
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-300, 0, 300], [-10, 0, 10]);
    const backgroundColor = useTransform(
        x,
        [-300, 0, 300],
        ['rgba(239, 68, 68, 0.2)', 'rgba(255, 255, 255, 1)', 'rgba(34, 197, 94, 0.2)']
    );

    useEffect(() => {
        const preventDefault = (e: Event) => e.preventDefault();
        document.addEventListener('touchmove', preventDefault, { passive: false });
        return () => document.removeEventListener('touchmove', preventDefault);
    }, []);
    const handleSwipe = async (direction: 'left' | 'right') => {
        await controls.start({
            x: direction === 'left' ? -300 : 300,
            opacity: 0,
            transition: { duration: 0.3 },
        });

        const currentQuestion = questions[currentIndex];
        await feedback(currentQuestion.id, direction === 'left' ? 'skip' : 'solve');

        setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
        controls.set({ x: 0, opacity: 1 });
    };

    const currentQuestion = questions[currentIndex];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-8">LeetCode Swiper</h1>
            <motion.div
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
                animate={controls}
                style={{ x, rotate, backgroundColor }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset, velocity }) => {
                    if (offset.x < -100) handleSwipe('left');
                    else if (offset.x > 100) handleSwipe('right');
                    else controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } });
                }}
            >
                <h2 className="text-2xl font-semibold mb-2">{currentQuestion.title}</h2>
                <p className={`text-sm mb-4 ${currentQuestion.difficulty === 'Easy' ? 'text-green-500' :
                    currentQuestion.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                    {currentQuestion.difficulty}
                </p>
                <p className="text-gray-600">{currentQuestion.description}</p>
            </motion.div>
            <div className="flex mt-8">
                <button
                    className="bg-red-500 text-white px-6 py-2 rounded-full mr-4"
                    onClick={() => handleSwipe('left')}
                >
                    Skip
                </button>
                <button
                    className="bg-green-500 text-white px-6 py-2 rounded-full"
                    onClick={() => handleSwipe('right')}
                >
                    Solve
                </button>
            </div>
        </div>
    );
};

export default LeetCodeSwiper;