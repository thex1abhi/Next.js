"use client";

import { Loader2, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader } from "../ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { commentSchema } from "@/app/Schemas/comments"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import z from "zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";



 
export function CommentSection() {  
const params=useParams<{postId:Id<'posts'>}>();  

  const data=useQuery(api.comments.getCommentsByPostId,{postId:params.postId})
 const [isPending, startTransition] = useTransition();

  

const createComment=useMutation(api.comments.createComment)

  const form = useForm({ 
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      postId: params.postId,
    }
  })
 
   function onSubmit(data: z.infer<typeof commentSchema >){
  
   startTransition(async ()=>{
   try{
   await createComment(data);
   form.reset()
   toast.success("Comment posted ")
  }catch{
 toast.error("Failed to comment ")
  } 
 })
 
 if(data===undefined){
  return <p>Loading...</p>
 }
}
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b" >
        <MessageSquare className="size-5" />

        <h2 className="text-xl font-bold">{data?.length}</h2>
      </CardHeader>
      <CardContent className="space-y-8" >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
          <Controller name="body" control={form.control} render={({ field, fieldState }) => (
            <Field>  <FieldLabel>  Name</FieldLabel>
              <Textarea aria-invalid={fieldState.invalid} placeholder="Share your thoughts " {...field} />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} ></FieldError>
              )}
            </Field> 

          )} /> 
        <Button className="cursor-pointer scale-y-95" disabled={isPending} >
                                        {isPending ? (
                                            <>
                                                <Loader2 className="size-4 animate-spin" />
                                                <span>Loading...</span>
                                            </>
                                        ) : (
                                            <span> Create Comment
                                            </span>
                                        )}
                                    </Button>
        </form> 
       <section className="space-y-6" > 
  
   {data?.map((comment)=>(
    <div key={comment._id} className="flex gap-4  " > 
    <Avatar className="size-10 shrink-0" >
    <AvatarImage  src={`https://avatar.vercel.sh/${comment.authorName}`}  
    alt={comment.authorName}
    /> 
     <AvatarFallback>
      {comment.authorName.slice(0,2).toUpperCase()}
     </AvatarFallback>
    </Avatar> 
    <div className="flex-1 space-y-1" > 
      <div className="flex items-center justify-between"> 
        <p>{comment.authorName}</p>
        <p>{new Date (comment._creationTime).toLocaleDateString()} </p>
      </div> 
      <div className="text-sm leading-relaxed " >
<p>{comment.body} </p>
      </div>
    </div>

     </div> 
  ))} 
       </section>
      </CardContent>
    </Card>
  )
}
