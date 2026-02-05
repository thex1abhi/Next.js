"use client";

import { loginSchema } from "@/app/Schemas/auth"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";


export default function Login() {
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })


    async function onSubmit() {
        console.log("done");

    }
    return (
        <>
            <div>
                <Card>
                    <CardHeader  >
                        <CardTitle> Login </CardTitle>
                        <CardDescription>Please login to Continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)}  >
                            <FieldGroup className="gap-y-4" >


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
                                <Button>Login </Button>

                            </FieldGroup>





                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}