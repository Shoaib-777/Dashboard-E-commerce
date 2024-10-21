import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Import the cookies API

let userEmail = "useremail"; // Placeholder for the user email

export const GET = async () => {
    // Retrieve the user email from the cookies if available
    const cookieStore = cookies();
    const storedEmail = cookieStore.get('userEmail')?.value || userEmail;

    return NextResponse.json({ userLogged: storedEmail });
};

export const POST = async (req) => {
    const { email } = await req.json(); // Extract email from the request body
    if (email) {
        userEmail = email; // Update the email
        
        // Set the email in a cookie using Next.js cookies API
        const cookieStore = cookies();
        cookieStore.set('userEmail', email, {
            httpOnly: true, // for security
            sameSite: 'strict', // to prevent CSRF attacks
            secure: process.env.NODE_ENV === 'production', // ensures cookie is only sent over HTTPS in production
            path: '/', // make cookie available across the site
        });

        return NextResponse.json({ message: "Email updated successfully", userLogged: email });
    }
    return NextResponse.json({ message: "Email update failed" }, { status: 400 });
};
