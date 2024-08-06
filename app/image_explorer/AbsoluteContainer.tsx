import { Image } from './types';

const AbsoluteContainer: React.FC<{
    img: Image;
    children: React.ReactNode;
}> = ({ img, children }) => {
    return (
        <div
            key={img.key}
            id={`img-${img.key}`}
            style={{
                position: 'absolute',
                width: `${img.width}px`,
                height: `${img.height}px`,
                left: `${img.x}px`,
                top: `${img.y}px`,
                transition: 'left 0.8s ease-in-out, top 0.8s ease-in-out',
            }}
        >
            {children}
        </div>
    );
};

export default AbsoluteContainer;