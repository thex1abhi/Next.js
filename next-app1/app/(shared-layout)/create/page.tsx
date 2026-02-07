"use client";

import { createBlogAction } from "@/app/actions";
import { postSchema } from "@/app/Schemas/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


export default function CreaterRoute() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const mutation = useMutation(api.posts.createPost);
    const form = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            content: "",
        }
    })

    function onSubmit(values: z.infer<typeof postSchema>) {

        startTransition(async () => {
            console.log(" This runs  on the client side")
            await createBlogAction(values)

        })

    }

    return (
        <div className="py-2" >
            <div className="text-center mb-12 " >
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-3xl" >Create Post</h1>
                    <p className="text-xl text-muted-foreground pt-4  " > Share your Thoughts with the world </p>
                </div>
            </div>
            <Card className="w-full max-w-xl mx-auto " >
                <CardHeader>
                    <CardTitle> Create BLog Article </CardTitle>
                    <CardDescription>Create your own blog post... </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <FieldGroup className="gap-y-4" >
                            <Controller name="title" control={form.control} render={({ field, fieldState }) => (
                                <Field>  <FieldLabel>  Title</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Some cool title" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} ></FieldError>
                                    )}
                                </Field>
                            )} />
                            <Controller name="content" control={form.control} render={({ field, fieldState }) => (
                                <Field>  <FieldLabel>  Content</FieldLabel>
                                    <Textarea aria-invalid={fieldState.invalid} placeholder="some cool message" {...field} />
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
                                    <span> Create Post
                                    </span>
                                )}
                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

        </div>
    )
}