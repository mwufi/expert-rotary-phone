import { fetchInitialLeetCodeQuestions } from './server';
import LeetCodeSwiper from './Swiper';

const Page: React.FC = async () => {
    const questions = await fetchInitialLeetCodeQuestions()
    return (
        <LeetCodeSwiper questions={questions} />
    )
};

export default Page;