'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Download, Upload, RefreshCw } from 'lucide-react';

const InstagramCardMaker = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [leftImage, setLeftImage] = useState<HTMLImageElement | null>(null);
  const [rightImage, setRightImage] = useState<HTMLImageElement | null>(null);
  const [leftText, setLeftText] = useState('코치님 설명\n"이해했니?"');
  const [rightText, setRightText] = useState('데이터로 통하는\n"완벽한 소통"');
  const [leftSubText, setLeftSubText] = useState('"네... (사실 모름)"');
  const [rightSubText, setRightSubText] = useState('"아! 이거였군요!"');

  const loadDefaultLeftImage = () => {
    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1616055193765-b1a7f6c35c24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
    img.crossOrigin = "Anonymous";
    img.onload = () => setLeftImage(img);
  };

  const loadDefaultRightImage = () => {
    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
    img.crossOrigin = "Anonymous";
    img.onload = () => setRightImage(img);
  };

  useEffect(() => {
    loadDefaultLeftImage();
    loadDefaultRightImage();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, side: 'left' | 'right') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          if (side === 'left') setLeftImage(img);
          if (side === 'right') setRightImage(img);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1080;
    const height = 1080;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    const drawImageCover = (img: HTMLImageElement | null, x: number, y: number, w: number, h: number) => {
      if (!img) {
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(x, y, w, h);

        ctx.fillStyle = '#d1d5db';
        ctx.font = '100px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('📷', x + w/2, y + h/2);
        return;
      }

      const imgRatio = img.width / img.height;
      const targetRatio = w / h;
      let sx, sy, sw, sh;

      if (imgRatio > targetRatio) {
        sh = img.height;
        sw = img.height * targetRatio;
        sx = (img.width - sw) / 2;
        sy = 0;
      } else {
        sw = img.width;
        sh = img.width / targetRatio;
        sx = 0;
        sy = (img.height - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
    };

    drawImageCover(leftImage, 0, 0, width / 2, height);
    drawImageCover(rightImage, width / 2, 0, width / 2, height);

    const gradient = ctx.createLinearGradient(0, height - 400, 0, height);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.8)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, height - 400, width, height);

    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();

    const drawBadge = (text: string, x: number, color: string) => {
      ctx.fillStyle = color;
      const badgeW = 160;
      const badgeH = 50;
      const badgeX = x - badgeW / 2;
      const badgeY = 40;

      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 10);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x, badgeY + badgeH/2 + 2);
    };

    drawBadge('BEFORE', width / 4, '#ef4444');
    drawBadge('AFTER', (width / 4) * 3, '#2563eb');

    const drawText = (main: string, sub: string, x: number) => {
      ctx.textAlign = 'center';

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 56px sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      const lines = main.split('\n');
      lines.forEach((line, i) => {
        ctx.fillText(line, x, height - 200 + (i * 70));
      });

      ctx.font = 'bold 36px sans-serif';
      ctx.fillStyle = '#fcd34d';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillText(sub, x, height - 80);
    };

    drawText(leftText, leftSubText, width / 4);
    drawText(rightText, rightSubText, (width / 4) * 3);

  }, [leftImage, rightImage, leftText, rightText, leftSubText, rightSubText]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'insta-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen font-sans">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              ⚡️ 3초 카드뉴스 제조기
            </h1>
            <p className="text-gray-500 text-sm mt-1">로그인 필요 없음! 사진만 올리면 완성됩니다.</p>
          </div>
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-md w-full sm:w-auto justify-center"
          >
            <Download size={20} />
            이미지 저장
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 p-6">
          {/* Preview Area */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-inner border border-gray-300">
              <canvas
                ref={canvasRef}
                width={1080}
                height={1080}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">* 실제 저장되는 이미지는 고화질(1080px) 입니다.</p>
          </div>

          {/* Controls Area */}
          <div className="space-y-6">

            {/* Left Side Controls */}
            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
              <div className="flex items-center gap-2 mb-3 text-red-800 font-bold">
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">BEFORE</span>
                <span>왼쪽 (소통 불가)</span>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-center w-full h-12 border-2 border-red-200 border-dashed rounded-lg cursor-pointer hover:bg-red-100 transition-colors bg-white">
                  <div className="flex items-center space-x-2 text-red-500">
                    <Upload size={18} />
                    <span className="text-sm font-semibold">사진 변경하기 (선택)</span>
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'left')} className="hidden" />
                </label>

                <button
                  onClick={loadDefaultLeftImage}
                  className="w-full py-2 text-xs text-red-400 hover:text-red-600 flex items-center justify-center gap-1 transition-colors border border-dashed border-red-200 rounded"
                >
                  <RefreshCw size={12} />
                  <span>기본 이미지(고민하는 선수) 복구</span>
                </button>

                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">큰 글씨</label>
                  <textarea
                    value={leftText}
                    onChange={(e) => setLeftText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">작은 글씨</label>
                  <input
                    type="text"
                    value={leftSubText}
                    onChange={(e) => setLeftSubText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Right Side Controls */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-3 text-blue-800 font-bold">
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">AFTER</span>
                <span>오른쪽 (원활한 소통)</span>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-center w-full h-12 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer hover:bg-blue-100 transition-colors bg-white shadow-sm ring-2 ring-blue-100 animate-pulse">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Upload size={18} />
                    <span className="text-sm font-bold">👉 우측 이미지 올리기</span>
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'right')} className="hidden" />
                </label>

                <button
                  onClick={loadDefaultRightImage}
                  className="w-full py-2 text-xs text-blue-400 hover:text-blue-600 flex items-center justify-center gap-1 transition-colors border border-dashed border-blue-200 rounded"
                >
                  <RefreshCw size={12} />
                  <span>기본 이미지(하이파이브) 복구</span>
                </button>

                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">큰 글씨</label>
                  <textarea
                    value={rightText}
                    onChange={(e) => setRightText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">작은 글씨</label>
                  <input
                    type="text"
                    value={rightSubText}
                    onChange={(e) => setRightSubText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-6 text-gray-400 text-sm">
        <p>Made with ❤️ | <a href="https://ryohi5.com" className="text-blue-500 hover:underline">ryohi5.com</a></p>
      </div>
    </div>
  );
};

export default InstagramCardMaker;
