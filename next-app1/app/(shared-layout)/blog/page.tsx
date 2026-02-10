

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";


export default function BlogPage() {


    return (
        <>
            <div className="flex justify-center text-2xl  " >
                <div  >   Our blog  </div>
                <div  >  Insights,thoughts and trends from our team </div>
            </div>
            <Suspense fallback={
                <SkeletonLoadingUI />

            } >
                < LoadBlogList />
            </Suspense>
        </>
    )
}

async function LoadBlogList() {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const data = await fetchQuery(api.posts.getPosts);

    return (
        <div className="grid mt-5 gap-6 md:grid-cols-2 lg:grid-cols-3" >

            {data?.map((post) => (
                <Card key={post._id} className="pt-0" >
                    <div className="relative h-48 w-full overflow-hidden " >
                        <Image src={post.imageUrl  ?? "https://images.unsplash.com/photo-1770297345796-8de4cf924c08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8" } 
                        alt="" fill className="rounded-t-lg"
                ></Image>
                    </div>
                    <CardContent>
                        <Link href={`/blog/${post._id}`}>  <h1 className="" >{post.title} </h1>
                        </Link>
                        <h3> {post.body} </h3>
                    </CardContent>

                    <CardFooter >
                        <Link className={buttonVariants({
                            className: "w-full"
                        })} href={`/blog/${post._id}`}>  Read More
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )

}

function SkeletonLoadingUI() {

    return (
        <div className="grid mt-5 gap-6 md:grid-cols-2 lg:grid-cols-3" >
            {[
                ...Array(6)].map((_, i) => (<div className="flex flex-col space-y-3 " key={i} >
                    <Skeleton className="h-48 w-full rounded-xl" />
                    <div className="space-y-2 flex flex-col " >
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        
                    </div>
                </div>))
            } 
        </div>
    )
} 