import { Form, useLoaderData } from "@remix-run/react";

import type { SanityDocument } from "@sanity/client";

import { loadQuery } from "~/lib/sanity/loader.server";
import { POSTS_QUERY } from "~/lib/sanity/queries";

import { Posts } from "~/components/posts";
import { ActionFunction } from "@remix-run/node";
import { supabase } from "~/lib/supabase/client";

export const loader = async () => {
  const { data } = await loadQuery<SanityDocument[]>(POSTS_QUERY);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { data, user };
};

export const action: ActionFunction = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: "c.carlos.umana@gmail.com",
    password: "abc123",

    options: {
      data: {
        membership: "founder",
      },
    },
  });

  if (error) {
    console.error(error);
  }

  return { user: data };
};

export default function Index() {
  const { data, user } = useLoaderData<typeof loader>();

  console.log(user);

  return (
    <div>
      {user ? (
        <div>
          membership: {user.user_metadata?.membership}
          <Posts posts={data} />
        </div>
      ) : (
        <div>
          <h1>Sign up to show posts</h1>
        </div>
      )}

      <Form method="post">
        <button>Sign Up</button>
      </Form>
    </div>
  );
}
