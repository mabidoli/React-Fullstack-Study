import React from 'react';
import { connect } from 'react-redux';
import { taskCreationSaga } from '../store/saga.mock';
import { Link } from 'react-router-dom';

export const TaskDetail = ({ id, comments, task, groups, isComplete }) => (
    <div>
        <div>
            <input value={task.name} />
        </div>
        <button>{isComplete ? `Reopen` : `Complete`}</button>

        <div>
            <select>
                {groups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                ))}
            </select>
        </div>

        <div>
            <Link to="/dashboard">
                <button>Done</button>
            </Link>
        </div>
    </div>
);

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.match.params.id;
    let task = state.tasks.find(task => task.id === id);
    let groups = state.groups;

    return {
        id,
        task,
        groups,
        isComplete: task.isComplete
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const id = ownProps.match.match.params.id;
    return {
        setTaskComplition(id, isComplete){
            
        }
    }
};

export const ConnectedTaskDetail = connect(mapStateToProps)(TaskDetail);