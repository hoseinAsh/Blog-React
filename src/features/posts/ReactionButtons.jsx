import {useDispatch} from 'react-redux'
import {reactionsAdded} from '../../redux/postsSlice'

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButtons = ({post}) => {
    const dispatch = useDispatch(); 
    const reactionButton = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button 
                key={name}
                type='button'
                className='reactionButton'
                onClick={()=> dispatch(reactionsAdded({postId : post.id, reaction : name}))}
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    }) 

  return (
    <div>{reactionButton}</div>
  )
}

export default ReactionButtons