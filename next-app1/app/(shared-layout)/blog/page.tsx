"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";


export default function BlogPage() {
    const data = useQuery(api.posts.getPosts);



    return (  
        <>
         <div  className="flex justify-center text-2xl  " >
          <div  >   Our blog  </div> 
          <div  >  Insights,thoughts and trends from our team </div> 
        </div> 
        <div className="grid mt-5 gap-6 md:grid-cols-2 lg:grid-cols-3" > 
       
            {data?.map((post) => (
                <Card key={post._id} className="pt-0" >
                    <div className="relative h-48 w-full overflow-hidden " >
                        <Image src="https://images.unsplash.com/photo-1770287691979-6b8ec41f5331?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8" alt="error" fill className="rounded-t-lg" ></Image>
                    </div> 
                    <CardContent>
                        <Link href={`/blog/${post._id}`}>  <h1 className="" >{post.title} </h1>
                        </Link> 
                        <h3> {post.body} </h3>
                    </CardContent> 

                    <CardFooter >
                    <Link className={buttonVariants({
                        className:"w-full"
                    })}  href={`/blog/${post._id}`}>  Read More 
                        </Link> 
                    </CardFooter>
                </Card>
            ))}
        </div> 
        </>
    )
}