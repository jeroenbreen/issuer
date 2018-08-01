import React from 'react';
import User from './user/user';
import { connect } from 'react-redux';
import { selectCurrentUser } from './../../redux/actions'


const getGreeting = () => {
    let date = new Date(),
        curHr = date.getHours();
    if (curHr < 12) {
        return 'Good morning';
    } else if (curHr < 18) {
        return 'Good afternoon';
    } else {
        return 'Good evening';
    }
};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    users: state.users
});

const mapDispatchToProps = dispatch => ({
    selectCurrentUser: user => dispatch(selectCurrentUser(user))
});


class WelcomeScreen extends React.Component {


    render(){
        return (

            <div className="welcome-screen">
                <h3>{getGreeting()}</h3>
                { this.props.users.map((user, index) =>
                    <User
                        key={index}
                        user={user}
                        isActive={this.props.currentUser === user}
                        selectCurrentUser={this.props.selectCurrentUser}
                    /> )
                }
            </div>
        );
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);