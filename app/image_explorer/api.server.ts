import { Image } from './types';

interface GenerateImagesProps {
    width: number;
    description?: string;
    id?: string;
}

export async function getImages(n: number, props: GenerateImagesProps): Promise<Image[]> {
    const height = 400;

    return new Promise((resolve) => {
        const images = Array.from({ length: n }, (_, i) => {
            const keyid = Math.random().toString(36).slice(2, 11);

            return {
                src: `https://picsum.photos/${props.width}/${height}?random=${keyid}`,
                // src: 'https://babagfarm.com.au/cdn/shop/articles/DALL_E_2023-12-22_19.44.24_-_a_joyful_dog_with_expressive_eyebrows_and_a_wagging_tail_running_in_a_lush_green_field_portraying_happiness_and_playfulness_perfect_for_a_blog_abou_1024x1024.png?v=1703234701',
                width: props.width,
                key: `img-${Date.now()}-${keyid}`,
                height,
                column: 0, // This will be set later when positioning the image
                x: 0, // This will be set later when positioning the image
                y: 0, // This will be set later when positioning the image
            };
        });
        resolve(images);
    });
}