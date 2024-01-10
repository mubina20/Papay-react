import { MeLiked } from "./product";
import { Member } from "./user";

export interface BoArticleInput {
   art_subject: string;
   art_content: string;
   art_image: string;
   bo_id: string;
};

export interface BoArticle {
   _id: string;
   art_subject: string;
   art_content: string;
   art_image?: string | null;
   bo_id: string;
   art_status: string;
   art_like: number;
   art_views: number;
   mb_id: string;
   createdAt: Date;
   updatedAt: Date;
   member_data: Member;
   me_liked: MeLiked[];
};

export interface SearchArticlesObj {
   page: number;
   limit: number;
   bo_id: string;
   order?: string | null;
};

export interface SearchMemberArticlesObj {
   page: number;
   limit: number;
   mb_id: string;
};