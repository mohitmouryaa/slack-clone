import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware((request, { convexAuth }) => {
  if (!isPublicPage(request) && !convexAuth.isAuthenticated()) {
    console.log("middleware1", request.url);
    return nextjsMiddlewareRedirect(request, "/auth");
  }
  if (isPublicPage(request) && convexAuth.isAuthenticated()) {
    console.log("middleware2", request.url);
    return nextjsMiddlewareRedirect(request, "/");
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
