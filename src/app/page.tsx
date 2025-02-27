"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchImages, searchImages } from "@/services/unsplashService";
import { Photo } from "@/app/interfaces/photo";

const Home = () => {
    const [images, setImages] = useState<Photo[]>([]);
    const [query, setQuery] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        fetchImages().then(setImages).catch(console.error);
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const results = await searchImages(query);
            setImages(results);
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageClick = (image: Photo) => {
        let url = `/image/${image.id}`;
        if (query) {
            url = url.concat(`?query=${query}`)
        }

        router.push(url);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Image Gallery</h1>
            <div className="flex justify-between mb-4">
                <form onSubmit={handleSearch} className="flex">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search images..."
                        className="p-2 border rounded-md mr-2"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
                </form>
                <Link href="/favorites" className="bg-yellow-500 text-white px-4 py-2 rounded-md">Favorites</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image: Photo) => (
                    <div key={image.id} onClick={() => handleImageClick(image)} className="cursor-pointer">
                        <img
                            src={image.urls.small}
                            alt={image.alt_description}
                            className="w-full h-auto rounded-lg shadow-md hover:opacity-75"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
