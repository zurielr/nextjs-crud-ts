"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

function NewPage() {

    const { handleSubmit, register } = useForm();
    const router = useRouter()

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        const res = await axios.post("/api/tasks", data);
        console.log(res);
        router.push("/");
    });

    return (
        <section className="h-screen flex items-center justify-center">
            <form>
                <label 
                htmlFor="title"
                className="font-bold text-xs"
                >Write your title here
                </label>
                <input
                    id="title" 
                    type="text" 
                    placeholder="Write a title"
                    className="px-3 py-1 border 
                        border-gray-300 rounded-md shadow-sm 
                        focus:outline-none focus:ring-1 focus:ring-sky-300 
                        focus:border-sky-300 text-black block mb-2" 
                        {... register("title")}
                    />
                <label 
                htmlFor="description"
                className="font-bold text-xs"
                >Your description
                </label>
                <textarea
                    id="description" 
                    placeholder="Write a description"
                    className="px-3 py-1 border 
                        border-gray-300 rounded-md shadow-sm 
                        focus:outline-none focus:ring-1 focus:ring-sky-300 
                        focus:border-sky-300 text-black block w-full"
                        {... register("description")}
                    ></textarea>
                <button
                    className="bg-sky-500 px-3 py-1 rounded-md text-white mt-2"
                >
                    Create
                </button>
            </form>
        </section>
    );
}
export default NewPage;