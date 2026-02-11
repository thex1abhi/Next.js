import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/Web/CommentSection";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PostIdRouteProps {
    params: Promise<{
        postId: Id<'posts'>
    }>
}


export default async function PostIdRoute({ params }: PostIdRouteProps) {
    const { postId } = await params;
    //running queries in parallel   
    const [post, preloadedComments] = await Promise.all([
        await fetchQuery(api.posts.getPostById, { postId: postId }),
        await preloadQuery(api.comments.getCommentsByPostId, {
            postId: postId,
        })
    ])


    if (!post) {
        return (
            <div>
                <h2 className="text-6xl text-red-500  p-20 font-extrabold" >No post Found </h2>
            </div>
        )
    }

    return (
        <>

            <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative" >
                <Link className={buttonVariants({ variant: "outline", className: "mb-4 " })} href="/blog" >
                    <ArrowLeft className="size-4" />Back to Blog
                </Link>
                <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm" >
                    <Image src={post.imageUrl ?? "https://images.unsplash.com/photo-1770110000509-6c8298224699?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"}
                        alt={post.title} fill unoptimized
                        className="object-contain hover:scale-105  transition-transform duration-500" />
                </div>
                <div>
                    <h1>{post.title}</h1>
                    <p>Created On : {new Date(post._creationTime).toLocaleDateString()}  </p>
                </div>

                <Separator className="my-8" />
                <p>   Content :{post.body}</p>
                <Separator className="my-8 " />
                <CommentSection preloadedComments={preloadedComments} />
            </div>
        </>
    )
}