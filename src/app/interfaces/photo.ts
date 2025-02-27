import {User} from "@/app/interfaces/user";

export interface Photo {
    id: string;
    liked_by_user: boolean;
    likes: number;
    height: number;
    width: number;
    asset_type: string;
    alt_description: string;
    description: string;
    promoted_at: string;
    created_at: string;
    updated_at: string;
    urls: PhotoUrls;
    user: User;
}

export interface PhotoUrls {
    small: string;
    small_s3: string;
    raw: string;
    regular: string;
    medium: string;
    full: string;
    thumb: string;
}
