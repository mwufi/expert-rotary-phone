import Hero, { PrimaryButton, SecondaryButton } from "@/components/blocks/Hero1";

export default function Page() {
    return (
        <div className="p-4">
            <Hero title="Welcome to Our Amazing App"
                subtitle="Discover a new way to manage your tasks, boost productivity, and achieve your goals."
                buttons={[<PrimaryButton href="#" text="Get Started" />, <SecondaryButton href="#" text="Learn More" />]}
                img="/path-to-your-app-screenshot.png"
            />
        </div>
    )

}