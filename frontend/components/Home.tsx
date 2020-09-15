import * as React from "react";
import "../styles/Home.scss";
import "../styles/media/Home.scss";

import { connect, ConnectedProps } from 'react-redux';
import { getPosts } from "../store/posts/actions";

import Button from './partials/Button';

import { Link } from "react-router-dom";

class Home extends React.Component<Props, any> {

    private shortenContent = (content: string): string => {
        const firstCut = content.substring(0, 300);
        return firstCut.substring(-1, firstCut.lastIndexOf('.')) + ".";
    }

    componentDidMount() {
        this.props.getPosts();
    }

    public render(): JSX.Element {
        
        return(
            <div className="Home">
                {this.props.posts.length > 0 ? 
                    this.props.posts.map((post: IPost, key: number): JSX.Element => (
                        <div className="post" key={key}>
                            <div className="image" />
                            <h3 className="title">{post.title}</h3>
                            <p className="content">{this.shortenContent(post.content)}</p>
                            <Link to={`/Rats/${post._id}`}><Button name="See more" color="black"/></Link>
                        </div>
                    ))
                    :
                    <p>Loading...</p>
                }
            </div>
        )
    }
};

interface RootState {
    //interface for what I want from a store
    postsReducer: {
        posts: IPost[];
    }
}

const mapState = (state: RootState) => ({
    //mapStateToProps
    posts: state.postsReducer.posts
})

const mapDispatch = {
    //mapDispatchToProps
    getPosts: () => getPosts()
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    //backgroundColor: string
    // ^^^ in case I want any other props from other components
}

export default connector(Home);