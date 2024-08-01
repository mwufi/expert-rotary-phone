
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CreatePromptFormProps {
    createNewPrompt: (formData: FormData) => Promise<void>;
}

const CreatePromptForm: React.FC<CreatePromptFormProps> = ({ createNewPrompt }) => {
    return (
        <form action={createNewPrompt} className="bg-pink-100 text-gray-800 p-6 max-w-2xl mx-auto rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">Create New Prompt</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-purple-700">Title</label>
                    <Input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="mt-1 w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                        placeholder="Enter prompt title"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-purple-700">Description</label>
                    <Textarea
                        id="description"
                        name="description"
                        required
                        className="mt-1 w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                        placeholder="Enter prompt description"
                        rows={4}
                    />
                </div>
                <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-purple-700">Tags</label>
                    <Input
                        type="text"
                        id="tags"
                        name="tags"
                        className="mt-1 w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                        placeholder="Enter tags separated by commas"
                    />
                </div>
                <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Create Prompt
                </Button>
            </div>
        </form>
    );
};

export default CreatePromptForm;