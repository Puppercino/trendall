export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/edit_record/:path*",
        "/add_record",
    ]
};