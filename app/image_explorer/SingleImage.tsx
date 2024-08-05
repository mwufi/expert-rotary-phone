import { Image } from './types';
import { Download } from 'lucide-react';
import { useState, useRef } from 'react';

interface SingleImageProps {
    img: Image;
    alt: string;
    onImageClicked: (img: Image) => void;
}

export default function SingleImage({ img, alt, onImageClicked }: SingleImageProps) {
    const [isHovering, setIsHovering] = useState(false);
    const isDragging = useRef(false);
    const dragStartPos = useRef({ x: 0, y: 0 });

    const handleDownload = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const imgElement = document.querySelector(`#img-${img.key} img`) as HTMLImageElement;
            if (!imgElement) {
                throw new Error('Image element not found');
            }
            const downloadUrl = img.src;

            // Create a Blob from the downloadUrl
            const blob = await fetch(downloadUrl).then(res => res.blob());

            // Create a new URL object from the Blob
            const blobUrl = window.URL.createObjectURL(blob);

            // Create a link element and trigger download
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `image-${img.key}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the Blob URL
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = false;
        dragStartPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (Math.abs(e.clientX - dragStartPos.current.x) > 5 || Math.abs(e.clientY - dragStartPos.current.y) > 5) {
            isDragging.current = true;
        }
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isDragging.current) {
            console.log('Image clicked');
            onImageClicked(img);
        }
        isDragging.current = false;
    };

    return (
        <div
            key={img.key}
            className="grid_item relative"
            id={`img-${img.key}`}
            style={{
                position: 'absolute',
                width: `${img.width}px`,
                height: `${img.height}px`,
                left: `${img.x}px`,
                top: `${img.y}px`,
                overflow: 'hidden',
                borderRadius: '0.75rem', // equivalent to rounded-xl
                margin: '0.25rem', // equivalent to m-1
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // equivalent to shadow-md
                transition: 'box-shadow 0.3s ease-in-out, left 0.8s ease-in-out, top 0.8s ease-in-out',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                setIsHovering(true);
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                setIsHovering(false);
            }}
        >
            {/* <div className="bg-yellow-400 px-4">{img.key} -- {img.height}</div> */}
            <img
                src={img.src}
                alt={alt}
                className="grid_item_img"
                style={{
                    width: '110%',
                    height: '110%',
                    objectFit: 'cover',
                    transition: 'all 0.3s ease-in-out',
                    transform: 'scale(1.1)',
                    margin: '-5%',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.margin = '0';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.margin = '-5%';
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                draggable={false}
            />
            {isHovering && (
                <button
                    className="absolute bottom-2 right-2 p-2 bg-gray-200 bg-opacity-70 rounded-full hover:bg-opacity-100 transition-opacity"
                    onClick={handleDownload}
                >
                    <Download size={20} color="#4A5568" />
                </button>
            )}
        </div>
    )
}