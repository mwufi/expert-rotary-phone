import { Image } from './types';

interface SingleImageProps {
    img: Image;
    alt: string;
}

export default function SingleImage({ img, alt }: SingleImageProps) {
    return (
        <div
            key={img.key}
            className="grid_item"
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
                transition: 'box-shadow 0.3s ease-in-out',
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'} // equivalent to hover:shadow-lg
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}
        >
            <div className="bg-yellow-400 px-4">{img.key} -- {img.height}</div>
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
                draggable={false}
            />
        </div>
    )
}