import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../lib/prisma";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async(accessToken,refreshToken,profile,done)=>{
      try{
        const email = profile.emails?.[0].value;

        let user = await prisma.user.findUnique({
          where:{ email }
        })

        if(!user){
          user = await prisma.user.create({
            data:{
              name:profile.displayName,
              email:email!,
              profileImage:profile.photos?.[0].value,
              role:"STUDENT"
            }
          })
        }

        done(null,user)
      }catch(err){
        done(err,false)
      }
    }
  )
)