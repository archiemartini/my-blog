import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {Article, articles} from './article-content'
import NotFoundPage from './NotFoundPage'
import { CommentsList } from '../components/CommentsList'
import AddCommentForm from '../components/AddCommentForm'
import { ArticleInfo } from '../components/AddCommentForm'
import useUser from '../hooks/useUser'


const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState<ArticleInfo>({ upvotes: 0, comments: [], canUpvote: false });
  const { canUpvote } = articleInfo;
  const { articleId } = useParams();

  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && await user.getIdToken();
      const headers = token ? { authtoken: token } : {}
      const response = await axios.get(`/api/articles/${articleId}`, { headers })
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo)
    }

    if (isLoading) {
      loadArticleInfo()
    }
  }, [isLoading, user])

  const article: Article | undefined = articles.find(article => article.name === articleId)

  const addUpvote = async () => {
    const token = user && await user.getIdToken();
    const headers = token ? { authtoken: token } : {}
    const response = await axios.put(`/api/articles/${articleId}/upvote`, null, { headers })
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  }

  if (!article) {
    return <NotFoundPage />
  }

  return (
    <>
    <h1>{article.title}</h1>
    <div className='upvotes-section'>
      {user
          ? <button onClick={addUpvote}>{canUpvote ? 'Upvote' : 'Already Upvoted'}</button>
          : <button>Log in to upvote</button>
      }
      <p>This article has {articleInfo.upvotes} upvote(s)</p>
    </div>
    {article.content.map(paragraph => (
      <p>{paragraph}</p>
    ))}
    {user
      ? <AddCommentForm 
      articleName={articleId} 
      onArticleUpdated={setArticleInfo}
      />
      :<button>Log in to add comment</button>
    }
    <CommentsList comments={articleInfo.comments} />
    </>
  );
}

export default ArticlePage;