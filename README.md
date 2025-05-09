## Getting Started


1. First, you need to sign up in `Unsplash API` and create your application:
https://unsplash.com/


2. After doing so, you will receive an `Access Key` and a `Secret Key`


3. Make sure you have a `/auth/callback` in the Redirect URI section. For example:
`http://localhost:3000/auth/callback`


4. Make sure you have provided `Public access`, `Read user access`, `Write likes access`


5. In the root folder create a `.env` and provide envs. For example:
`NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=ACCESS_KEY`
`NEXT_PUBLIC_UNSPLASH_SECRET_KEY=SECRET_KEY`
`NEXT_PUBLIC_AUTH_REDIRECT_URL=http://localhost:3000/auth/callback`


6. Node version 20 required


7. Run `npm install` to install the dependencies


8. Run `npm run dev ` to launch the application


9. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
