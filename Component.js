"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Pencil, Eraser } from 'lucide-react';

export default function Component() {
    const canvasRef = useRef(null);
    const [selectedTool, setSelectedTool] = useState('brush');
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [isDrawing, setIsDrawing] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
    }, []);

    // Aquí continúa el resto de tu código...

    return (
        <div className="flex flex-col items-center p-4 bg-teal-600">
            <div className="w-[640px] bg-gray-300 border-t border-l border-white border-r border-b border-gray-800 p-1">
                <canvas
                    ref={canvasRef}
                    width={500}
                    height={400}
                    className="border-2 border-gray-600 cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                />
            </div>
        </div>
    );
}
