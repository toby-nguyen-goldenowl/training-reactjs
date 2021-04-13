import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogOut from '../Login/Logout';

const Title = (props) => (
  <>
    <div>
      <div>
        {props.userId ? (
          <LogOut />
        ) : (
          <Link to="/signin" className="MyLink">
            Sign In
          </Link>
        )}
      </div>
    </div>
    {props.children}
  </>
);

const mapStateToProps = (state) => ({
  toDoItemsList: state.todo.toDoItemsList,
  userId: state.user.userId,
  loading: state.user.loading,
});

export default connect(mapStateToProps, null)(Title);
