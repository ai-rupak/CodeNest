// app/components/NavigationHeaderServer.tsx
// app/components/NavigationHeaderServer.tsx
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/../convex/_generated/api";
import NavigationHeaderClient from "@/components/NavigationHeaderClient.tsx";

type ConvexUser = {
  isPro: boolean;
  name?: string;
  email?: string;
  };

export default async function NavigationHeaderServer() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  let convexUser: ConvexUser | null = null;

  if (user?.id) {
    convexUser = await convex.query(api.users.getUser, {
      userId: user.id,
    });
  }

  return <NavigationHeaderClient convexUser={convexUser} />;
}
