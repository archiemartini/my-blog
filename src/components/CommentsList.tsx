export interface Comment {
  postedBy: string;
  text: string
}

export const CommentsList = ({ comments }: { comments: Comment[]}) => (
  <>
  <h3>Comments:</h3>
  {comments && comments.map(comment => (
    <div className="comment" key={comment.postedBy + ': ' + comment.text}>
      <h4>{comment.postedBy}</h4>
      <p>{comment.text}</p>
    </div>
    ))}
  </>
)