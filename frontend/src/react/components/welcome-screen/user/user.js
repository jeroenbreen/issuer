import React from 'react';

class User extends React.Component {

    handleOnClick() {
        this.props.selectCurrentUser(this.props.user);
    }

    render(){
        let className = 'user';
        if (this.props.isActive) {
            className += ' user--current';
        }
        return (
            <div className={className} onClick={() => this.handleOnClick()}>
                <div className="avatar" style={{backgroundImage: 'url(' + this.props.user.thumbnail + ')'}}></div>
                {this.props.user.getFullName()}
            </div>
        );
    }
}



export default User;