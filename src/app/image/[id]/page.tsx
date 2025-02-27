"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {fetchImages, likePhoto, searchImages, unlikePhoto} from "@/services/unsplashService";
import {Photo} from "@/app/interfaces/photo";

const ImageDetail = () => {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    const [images, setImages] = useState<Photo[]>([]);
    const [currentImage, setCurrentImage] = useState<Photo | null>(null);

    useEffect(() => {
        const loadImageData = async () => {
            try {
                const images = query ? await searchImages(query) : await fetchImages();
                const currentImage = images.find((img: any) => img.id === id) || images[0];

                setImages(images);
                setCurrentImage(currentImage);
            } catch (error) {
                console.error("Error fetching image details:", error);
            }
        };

        loadImageData();
    }, [id, query]);

    const handleLikeToggle = async () => {
        if (!currentImage) {return}

        try {
            if (!currentImage.liked_by_user) {
                await likePhoto(currentImage.id);
            } else {
                await unlikePhoto(currentImage.id);
            }

            const updatedImages = images.map((img) =>
                img.id === currentImage.id ? { ...img, liked_by_user: !currentImage.liked_by_user } : img
            );

            setImages(updatedImages);
            setCurrentImage({ ...currentImage, liked_by_user: !currentImage.liked_by_user });
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const handleSlideChange = (swiper: any) => {
        const newImage = images[swiper.activeIndex];
        setCurrentImage(newImage);
    };

    if (!currentImage) return <p className="text-center">Loading...</p>;

    return (
        <div className="container mx-auto p-4 relative">
            <h1 className="text-3xl font-bold text-center mb-4">Image Details</h1>
            <Link href="/" className="text-blue-500">← Back to gallery</Link>
            <div className="mt-6 flex flex-col items-center">
                <div className="relative w-full max-w-3xl">
                    <Swiper
                        autoHeight
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        modules={[Navigation, Pagination]}
                        pagination
                        loop
                        className="w-full"
                        initialSlide={images.findIndex((img) => img.id === id)}
                        onSlideChange={handleSlideChange}
                    >
                        {images.map((img) => (
                            <SwiperSlide key={img.id} className="!flex justify-center items-center">
                                <img
                                    src={img.urls.regular}
                                    alt={img.alt_description}
                                    className="rounded-lg shadow-lg max-w-full max-h-[500px] object-contain"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="flex items-center mt-4">
                    <button
                        onClick={handleLikeToggle}
                        className={`px-4 py-2 rounded-md text-white ${currentImage.liked_by_user ? "bg-red-500" : "bg-gray-500"}`}
                    >
                        {currentImage.liked_by_user ? "Unlike" : "Like"}
                    </button>
                </div>
                <p className="text-lg mt-2 font-semibold">{currentImage.description || currentImage.alt_description || "No description available"}</p>
                <p className="text-gray-500">By {currentImage.user.name}</p>
                <p className="text-gray-500">{currentImage.likes} likes</p>
            </div>
        </div>
    );
};

export default ImageDetail;
