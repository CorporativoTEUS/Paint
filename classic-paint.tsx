"use client"

import React, { useRef, useState, useEffect } from 'react'
import { Pencil, Eraser } from 'lucide-react'

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedTool, setSelectedTool] = useState('brush')
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [isDrawing, setIsDrawing] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.fillStyle = 'white'
        context.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [])

  const tools = [
    { name: 'brush', icon: <Pencil className="w-4 h-4" /> },
    { name: 'eraser', icon: <Eraser className="w-4 h-4" /> },
  ]

  const colors = [
    '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
    '#FFFFFF', '#C0C0C0', '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF',
    '#FFFF80', '#80FF80', '#80FFFF', '#8080FF', '#FF80FF', '#FF8080'
  ]

  const menuOptions = [
    { name: 'File', items: ['New', 'Open', 'Save', 'Exit'] },
    { name: 'Edit', items: ['Undo', 'Repeat', 'Cut', 'Copy', 'Paste'] },
    { name: 'View', items: ['Tool Box', 'Color Box', 'Status Bar'] },
    { name: 'Image', items: ['Flip/Rotate', 'Stretch/Skew', 'Invert Colors'] },
    { name: 'Options', items: ['Draw Opaque'] },
    { name: 'Help', items: ['Help Topics', 'About Paint'] },
  ]

  const handleToolClick = (tool: string) => {
    setSelectedTool(tool)
  }

  const handleColorClick = (color: string) => {
    setSelectedColor(color)
    setSelectedTool('brush')
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.beginPath()
      }
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        context.lineWidth = selectedTool === 'eraser' ? 40 : 2
        context.lineCap = 'round'
        context.strokeStyle = selectedTool === 'eraser' ? 'white' : selectedColor

        if (selectedTool === 'eraser') {
          context.beginPath()
          context.arc(x, y, 20, 0, Math.PI * 2)
          context.fill()
        } else {
          context.lineTo(x, y)
          context.stroke()
        }

        context.beginPath()
        context.moveTo(x, y)
      }
    }
  }

  return (
    <div className="flex flex-col items-center p-4 bg-teal-600">
      <div className="w-[640px] bg-gray-300 border-t border-l border-white border-r border-b border-gray-800 p-1">
        <div className="bg-blue-900 text-white p-1 mb-1 flex justify-between items-center">
          <div className="text-sm">untitled - Paint</div>
          <div className="flex space-x-1">
            <div className="w-4 h-4 bg-gray-300 border border-gray-600 flex items-center justify-center text-xs text-black">_</div>
            <div className="w-4 h-4 bg-gray-300 border border-gray-600 flex items-center justify-center text-xs text-black">□</div>
            <div className="w-4 h-4 bg-gray-300 border border-gray-600 flex items-center justify-center text-xs text-black">×</div>
          </div>
        </div>
        <div className="text-sm mb-1 flex">
          {menuOptions.map((menu) => (
            <div key={menu.name} className="relative">
              <button
                className={`px-2 py-1 ${activeMenu === menu.name ? 'bg-gray-400' : ''}`}
                onClick={() => setActiveMenu(activeMenu === menu.name ? null : menu.name)}
              >
                {menu.name}
              </button>
              {activeMenu === menu.name && (
                <div className="absolute left-0 mt-1 bg-gray-300 border border-gray-600 shadow-md z-10">
                  {menu.items.map((item) => (
                    <button key={item} className="block w-full text-left px-4 py-1 hover:bg-gray-400">
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="w-10 bg-gray-200 border-r border-gray-400 mr-1">
            {tools.map((tool) => (
              <button
                key={tool.name}
                onClick={() => handleToolClick(tool.name)}
                className={`w-8 h-8 m-1 flex items-center justify-center ${selectedTool === tool.name ? 'bg-gray-400 border-t border-l border-white border-r border-b border-gray-600' : 'bg-gray-300 border border-gray-400'}`}
              >
                {tool.icon}
              </button>
            ))}
            <div className="grid grid-cols-2 gap-[1px] mt-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorClick(color)}
                  className={`w-3 h-3 m-[1px] border ${selectedColor === color ? 'border-white' : 'border-gray-600'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div>
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
      </div>
      <div className="w-[640px] bg-gray-300 border-t border-white mt-1 p-1 flex justify-between text-xs">
        <div>For Help, click Help Topics on the Help Menu.</div>
        <div className="flex space-x-4">
          <div>440,113</div>
          <div>10:27 PM</div>
        </div>
      </div>
    </div>
  )
}