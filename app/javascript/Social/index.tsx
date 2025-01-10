import React from "react";
import { Post } from "../types/models";

type Props = {
  posts: Post[];
};

const Social = (props: Props) => {
  const regexBoldUsernames = /(\@[a-zA-Z0-9]+)/g;

  return (
    <div id='social-index' className='px-6 py-8 max-w-[600px] mx-auto'>
      <div className='text-2xl text-center mb-5'>
        Social
      </div>

      {props.posts.map((post) => (
        <div key={post.id} className='p-4 bg-[#607499] rounded-md flex'>
          <div
            className='text-sm'
            dangerouslySetInnerHTML={{
              __html: post.body.replaceAll(regexBoldUsernames, '<b>$1</b>')
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Social;
