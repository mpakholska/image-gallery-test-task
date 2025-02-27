"use client";
import { useEffect, useState } from "react";
import {fetchLikedPhotos, unlikePhoto} from "@/services/unsplashService";
import { Photo } from "@/app/interfaces/photo";
import Link from "next/link";

const Favorites = () => {
    const [likedPhotos, setLikedPhotos] = useState<Photo[]>([]);
    const accessToken = localStorage.getItem("unsplash_access_token");

    useEffect(() => {
        fetchLikedPhotos().then(setLikedPhotos).catch(console.error);
    }, [accessToken]);

    const handleUnlike = async (photoId: string) => {
        if (!accessToken) return;


        await unlikePhoto(photoId);
        setLikedPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Liked Photos</h1>
            <Link href="/" className="text-blue-500">← Back to gallery</Link>
            {likedPhotos.length === 0 ? (
                <p className="text-center">No liked photos yet.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {likedPhotos.map((photo) => (
                        <div key={photo.id} className="relative">
                            <img
                                src={photo.urls.small}
                                alt={photo.alt_description}
                                className="w-full h-auto rounded-lg shadow-md"
                            />
                            <button
                                onClick={() => handleUnlike(photo.id)}
                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md"
                            >
                                Unlike
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
