import { Image } from './types';
import { Download } from 'lucide-react';
import { useState, useRef } from 'react';
import AbsoluteContainer from './AbsoluteContainer';

interface SingleImageProps {
    img: Image;
    alt: string;
    onImageClicked: (img: Image) => void;
}

const ImageContainer: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    return (
        <div
            className="grid_item relative overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
            {children}
        </div>
    );
};

const SingleImage: React.FC<SingleImageProps> = ({ img, alt, onImageClicked }) => {
    console.log("lol")
    const [isHovering, setIsHovering] = useState(false);
    const isDragging = useRef(false);
    const dragStartPos = useRef({ x: 0, y: 0 });

    const absolute = false;
    const handleDownload = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const imgElement = document.querySelector(`#img-${img.key} img`) as HTMLImageElement;
            if (!imgElement) {
                throw new Error('Image element not found');
            }
            const downloadUrl = img.src;

            const blob = await fetch(downloadUrl).then(res => res.blob());
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `image-${img.key}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

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


    const children = <>
        <ImageContainer>
            <img
                src={img.src}
                alt={alt}
                className="grid_item_img object-cover w-full h-full"
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
        </ImageContainer>
        {isHovering && (
            <button
                className="absolute bottom-2 right-2 p-2 bg-gray-200 bg-opacity-70 rounded-full hover:bg-opacity-100 transition-opacity"
                onClick={handleDownload}
            >
                <Download size={20} color="#4A5568" />
            </button>
        )}
    </>

    return absolute ? (
        <AbsoluteContainer img={img}>
            {children}
        </AbsoluteContainer>
    ) : <>{children}</>;
};

export default SingleImage;