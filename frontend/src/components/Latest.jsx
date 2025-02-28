import React from 'react'
import { BlogCard } from './BlogCard'
const Latest = () => {
    
  return (
    <div>
       <div className="w-1/3">
        {post && post.length > 0 ? (
          post.map((postItem) => (
            <div key={postItem._id}>
              <BlogCard postItem={postItem} />
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div> 
    </div>
  )
}

export default Latest
