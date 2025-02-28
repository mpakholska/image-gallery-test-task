import {getAccessToken} from "@/services/authService";
import {Photo} from "@/app/interfaces/photo";
import {User} from "@/app/interfaces/user";

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export const fetchImages = async (): Promise<Photo[]> => {
    const response = await fetch(`https://api.unsplash.com/photos?client_id=${UNSPLASH_ACCESS_KEY}`);
    if (!response.ok) throw new Error("Failed to fetch images");

    return response.json();
};

export const searchImages = async (query: string): Promise<Photo[]> => {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`);
    if (!response.ok) throw new Error("Failed to search images");

    const data = await response.json();
    return data.results;
};

export const likePhoto = async (photoId: string): Promise<{photo: Photo, user: User}> => {
    const accessToken = getAccessToken();

    const response = await fetch(`https://api.unsplash.com/photos/${photoId}/like`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) throw new Error("Failed to like the photo");
    return response.json();
};

export const fetchLikedPhotos = async (): Promise<Photo[]> => {
    const accessToken = getAccessToken();
    const username = localStorage.getItem("username");

    const response = await fetch(`https://api.unsplash.com/users/${username}/likes`, {
        headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
    });

    if (!response.ok) throw new Error("Failed to fetch liked photos");
    return response.json();
};

export const unlikePhoto = async (photoId: string): Promise<{photo: Photo, user: User}> => {
    const accessToken = getAccessToken();

    const response = await fetch(`https://api.unsplash.com/photos/${photoId}/like`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) throw new Error("Failed to unlike the photo");
    return response.json();
};
