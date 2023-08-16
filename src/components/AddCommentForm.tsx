import { Dispatch, SetStateAction, useState } from "react";
import axios from 'axios'
import useUser from "../hooks/useUser";

export interface ArticleInfo {
  upvotes: number;
  comments: Comment[];
  canUpvote: boolean;
}

const AddCommentForm = ({ 
  articleName, 
  onArticleUpdated 
}: { 
  articleName: string | undefined, 
  onArticleUpdated: Dispatch<SetStateAction<ArticleInfo>> 
}) => {
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('')

  const { user } = useUser();

  const addComment = async () => {
    const token = user && await user.getIdToken();
    const headers = token ? { authtoken: token } : {}
    const response = await axios.post(`/api/articles/${articleName}/comments`, {
      postedBy: name,
      text: commentText
    }, { headers })

    const updatedArticle = response.data;
    onArticleUpdated(updatedArticle);
    setName('');
    setCommentText('');
  }

  return (
    <div className="add-comment-form">
      <h3>Add a Comment</h3>
      {user && <p>You are posting as {user.email}</p>}
        <textarea 
          rows={4} 
          cols={50} 
          value={commentText} 
          onChange={e => setCommentText(e.target.value)} 
        />
      <button onClick={addComment}>Add Comment</button>
    </div>
  )
}

export default AddCommentForm;