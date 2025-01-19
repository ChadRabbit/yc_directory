// @ts-ignore

import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import {AUTHOR_BY_GITHUB_ID_QUERY} from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client";
import {writeClient} from "@/sanity/lib/write-client";


export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub],
    callbacks:{
        async signIn({user:{name,email,image},profile:{id,login,bio}}){
            const existingUser = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY,{id:id});
            if(!existingUser){
                await writeClient.create({
                    _type:'author',
                    id,
                    name,
                    username:login,
                    email,
                    image,
                    bio:bio || "",
                });
            }
            // console.log("Sign In Callback:", { name,email,image,id,login,bio });
            return true;
        },
        async jwt({token,account,profile}){
            if(account && profile){
                const user=await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY,{id:profile?.id})
                token.id=user._id
            }
            // console.log("JWT Callback:", { token, profile, account });
            return token;
        },
        async session({session,token}){
            Object.assign(session,{id:token.id})
            // console.log('Session:', session);
            // console.log('Token:', token);
            // console.log("Session Callback:", { session, token });
            return session;
        }

    },
})