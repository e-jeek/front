import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
        NaverProvider({
            clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
        })
    ],
});

export { handler as GET, handler as POST };