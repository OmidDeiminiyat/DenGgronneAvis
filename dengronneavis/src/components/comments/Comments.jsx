import { useState, useEffect } from "react";
import style from './Comment.module.scss';
export function Comments({ product }) {
    const [comments, setComments] = useState([]); 
    const [loading, setLoading] = useState(true);
console.log(product);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(`http://localhost:4242/comment/${product}`, requestOptions);
      const result = await response.json(); // Assuming API returns JSON
      setComments(result.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };
console.log(comments);


    return (
        <>
       <section className={style.mainComment}>
            <div>
                
                {loading ? (
                    <p>Loading comments...</p>
                ) : comments.length > 0 ? (
                    <span>
                    {comments.map((items, index) => (
                        <>
                        <p>{items.user.firstname} (sælger): d. 22.22.2022</p>
                        <ul>
                            <li key={index}>
                            {items.comment} 
                            </li>
                        </ul>
                        </>
                      
                    ))}
                    </span>
                ) : (
                    <p>No comments available.</p>
                
                )}
            </div>
            <div>
                test
            </div>
           </section>
          </>
    
    );
  }
  