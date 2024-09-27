import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./form";
import { Suspense } from "react";

export default function Login(){
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-3xl drop-shadow">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>Enter your credentials to log in.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}