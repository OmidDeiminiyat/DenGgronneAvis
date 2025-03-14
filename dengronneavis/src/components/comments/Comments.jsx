import { useState, useEffect } from "react";
import style from './Comment.module.scss';

export function Comments({ product }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const accessToken =  localStorage.getItem('access_token');

console.log(product);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        var requestOptions = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            redirect: "follow"
        };

        try {
            const response = await fetch(`http://localhost:4242/products/${product}`, requestOptions);
            const result = await response.json();
            setComments(result.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoading(false);
        }
    };
console.log(comments);

    return (
      <section className={style.mainComment}>
      <div>
          {loading ? (
              <p>Loading comments...</p>
          ) : comments.comments.length > 0 ? (
              <span>
                  {comments.comments.map((item, index) => (
                      <div key={index}>
                          <p>{item.user.firstname} (sælger): d. {item.createdAt}</p>
                          <ul>
                              <li>{item.comment}</li>
                          </ul>
                      </div>
                  ))}
              </span>
          ) : (
              <p>No comments available.</p>
          )}
      </div>
      <div className={style.secondDiv}>
          {loading ? (
              <p>Loading comments...</p>
          ) : comments.comments.length > 0 ? (
              <span>
                  {comments.comments.map((item, index) => (
                      <div key={index}>
                          <p>{comments.owner.firstName} (sælger): d. {item.createdAt}</p>
                          <ul>
                              <li>{item.comment}</li>
                          </ul>
                      </div>
                  ))}
              </span>
          ) : (
              <p>No comments available.</p>
          )}
      </div>
  </section>
    );
}
