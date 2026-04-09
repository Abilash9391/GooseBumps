import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Registration Disabled</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Public sign-up is disabled. Only admin users may sign in to manage content.
          </p>
          <Button asChild className="w-full">
            <Link href="/auth/signin">Go to Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
