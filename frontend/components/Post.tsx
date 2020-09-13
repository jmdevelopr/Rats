import * as React from "react";
import "../styles/Post.scss";
import "../styles/media/Post.scss";

import Heart from '../assets/heart-emoji.svg';
import Wow from '../assets/wow-emoji.svg';
import Haha from '../assets/haha-emoji.svg';
import Sad from '../assets/sad-emoji.svg';
import Reactions from '../assets/reactions.svg';

import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

import { connect, ConnectedProps } from 'react-redux';
import { getSinglePost, addComment, reactAction } from "../store/posts/actions";

class Post extends React.Component<Props, any> {

    private isCurrentReact = (emoji: string) => {
        const reactExists = this.props.data.reactions.find(react => react.id === this.props.post._id);
        if (reactExists) {
            if (reactExists.reaction === emoji)
                return true;
            else return false;
        }
        return false;
    }

    private handleAddComment = () => {
        const commentValue: string = document.querySelector('input').value;
        const comment: IComment = {
            author: this.props.data.username,
            comment: commentValue
        };
        this.props.addComment(this.props.post._id, comment, this.props.nameDisplay);
    }

    private toggleEmoji = () => {
        document.querySelector('.reaction-buttons').classList.toggle('hidden');
    }

    private handleReact = (reactionName: string) => {
        this.props.reactAction(this.props.post._id, reactionName, this.props.data.id);
        document.querySelector('.reaction-buttons').classList.add('hidden');
    }

    componentDidMount() {
        this.props.getSinglePost(window.location.pathname);
    }

    emojiArr: Array<JSX.Element> = [<Heart />, <Wow />, <Sad />, <Haha />];
    emojiNameArr: Array<string> = ["heart", "wow", "sad", "haha"];

    public render(): JSX.Element {
        return this.props.post ? 
            <div className="Post">
                <div className="image" />
                <h3 className="title">{this.props.post.title}</h3>
                <p className="content">{this.props.post.content}</p>
                <div className="stats">
                    <div className="reactions">
                        {this.props.post.reactions.map((reaction: IReaction, index: number) => (
                            <div className="reaction" key={index}>
                                <div className="icon">{this.emojiArr[index]}</div>
                                <div className={`count ${this.props.post&&this.props.data ? this.isCurrentReact(this.emojiNameArr[index]) === true ? "current" : "" : ""}`}>
                                    {reaction.count}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p>{this.props.post.comments.length} Comments</p>
                </div>
                <div className="line" />
                <div className="action-buttons">
                    <div className="btn" onClick={() => this.toggleEmoji()}>
                        <div className="icon"><Reactions /></div>
                        <span>React</span>
                    </div>
                    <div className="reaction-buttons hidden">
                        {this.emojiArr.map((emoji: JSX.Element, index: number) => (
                            <div key={index} onClick={() => this.handleReact(this.emojiNameArr[index])}>{emoji}</div>
                        ))}
                    </div>
                    <div className="btn">
                        <ChatBubbleOutlineIcon className="icon" />
                        <span>Comment</span>
                    </div>
                </div>
                <div className="add-comment">
                    <div className="input-sec">
                        <label className="rats-label">Add comment</label>
                        <input className="rats-input" type="text"/>
                        <SendRoundedIcon className="icon" onClick={() => this.handleAddComment()} />
                    </div>
                </div>
                <div className="comments">
                    {this.props.post.comments.map((comment: IComment, key: number) => (
                        <div className="comment" key={key}>
                            <h4>{comment.author}</h4>
                            <p>{comment.comment}</p>
                        </div>
                    ))}
                </div>
            </div> 
            : 
            <div>Loading...</div> 
            
    }
};

interface IReaction {
    name: String;
    count: Number;
}

interface IComment {
    author: string;
    comment: string;
}

interface RootState {
    //interface for what I want from a store
    authReducer: {
        data: {
            id: string;
            username: string;
            reactions: [
                {
                    id: string;
                    reaction: string;
                }
            ]
        }
    },
    postsReducer: {
        post: IPost;
    },
    settingsReducer: {
        nameDisplay: boolean;
    }
}

const mapState = (state: RootState) => ({
    //mapStateToProps
    data: state.authReducer.data,
    post: state.postsReducer.post,
    nameDisplay: state.settingsReducer.nameDisplay
})

const mapDispatch = {
    //mapDispatchToProps
    getSinglePost: (path: string) => getSinglePost(path),
    addComment: (path: string, comment: IComment, nameDisplay: boolean) => addComment(path, comment, nameDisplay),
    reactAction: (path: string, reactionName: string, userID: string) => reactAction(path, reactionName, userID)
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    //backgroundColor: string
    // ^^^ in case I want any other props from other components
}

export default connector(Post);