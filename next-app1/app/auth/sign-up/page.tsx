"use client";

import { SignUpSchema } from "@/app/Schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";


export default function Signup() {

    const form = useForm({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            name: "",
            password: ""
        }
    })

    async function onSubmit(data: z.infer<typeof SignUpSchema>) {
        await authClient.signUp.email({
            email: data.email,
            name: data.name,
            password: data.password,
        })
    }

    return (
        <>
            <Card>
                <CardHeader  >
                    <CardTitle>Please Signup </CardTitle>
                    <CardDescription>Create a Account to Continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}  >
                        <FieldGroup className="gap-y-4" >
                            <Controller name="name" control={form.control} render={({ field, fieldState }) => (
                                <Field>  <FieldLabel>  Name</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="John Doe" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} ></FieldError>
                                    )}
                                </Field>
                            )} />

                            <Controller name="email" control={form.control} render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>  Email</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid}   {...field} placeholder="example@mail.com" />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} ></FieldError>
                                    )}
                                </Field>
                            )} />

                            <Controller name="password" control={form.control} render={({ field, fieldState }) => (
                                <Field>  <FieldLabel>  Password</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="********" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} ></FieldError>
                                    )}
                                </Field>
                            )} />
                            <Button>SignUp </Button>

                        </FieldGroup>





                    </form>
                </CardContent>
            </Card>
        </>
    )
} 
