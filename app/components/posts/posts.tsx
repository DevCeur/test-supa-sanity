import { Link } from "@remix-run/react";

import type { SanityDocument } from "@sanity/client";

export const Posts = ({ posts }: { posts: SanityDocument[] }) => {
  return (
    <main className="">
      {posts?.length > 0 ? (
        posts.map((post) => (
          <Link key={post._id} to={post.slug.current}>
            <h2 className="">{post.title}</h2>
          </Link>
        ))
      ) : (
        <div className="">No posts found</div>
      )}
    </main>
  );
};
