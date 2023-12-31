"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";

function NewPage({ params }: { params: { id: string }}) {
    const { handleSubmit, register, setValue } = useForm();
    const router = useRouter();

    useEffect(() => {
        if (params.id) {
            axios.get(`/api/tasks/${params.id}`).then(res=> {
                setValue("title", res.data.title);
                setValue("description", res.data.description);
            });
        }
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            await axios.put('/api/tasks/${params.id}', data);
        } else {
            await axios.post('/api/tasks', data);
        }
        router.push("/");
        router.refresh();
    });

    return (
        <section className="h-screen flex items-center justify-center">
            <form onSubmit={onSubmit}>
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
                        {...register("title")}
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
                        {...register("description")}
                    ></textarea>
                <button
                    className="bg-sky-500 px-3 py-1 rounded-md text-white mt-2"
                >
                    {params.id ? "Update" : "Create"}
                </button>
            </form>
        </section>
    );
}
export default NewPage;