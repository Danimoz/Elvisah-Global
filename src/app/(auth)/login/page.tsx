import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./form";
import { Suspense } from "react";
import InlineLoader from "@/lib/loader";

export default function Login(){
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-3xl drop-shadow">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>Enter your credentials to log in.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<InlineLoader />}>
            <LoginForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}