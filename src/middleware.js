export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/record/[_id]/edit",
        "/record/add",
    ]
};