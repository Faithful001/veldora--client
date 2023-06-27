import { Logo } from "@/components/Logo";
import Head from "next/head";
import { useEffect } from "react";
import Image from "next/image"
import Link from "next/link"
import { Command } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function Login() {
  useEffect(() => {
    require("@passageidentity/passage-elements/passage-auth");
  }, []);

  const appID = process.env.NEXT_PUBLIC_APP_ID

  return (
    <>
   
      <div className="container relative min-h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
  
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex gap-4 items-center text-lg font-medium">
            <div className="w-8 h-16">
            <Logo variant="base"/>
            </div>
             Veldora
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 pt-12">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
           
            <div className="w-full min-w-[200px] p-4 md:min-w-[400px]">
            <div className="h-8 w-24 flex md:hidden mx-auto items-center justify-center ">
            <Logo variant="wordmark"/>
            </div>
          <passage-auth app-id={appID}></passage-auth>
        </div>
            {/* <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p> */}
          </div>
        </div>
      </div>
    </>
  )
}
