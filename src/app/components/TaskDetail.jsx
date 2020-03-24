import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as mutations from '../store/mutations';

export const TaskDetail = ({
    id, comments, task, groups, isComplete,
    setTaskComplition, setTaskName, setTaskGroup }) => (
        <div>
            <div>
                <input onChange={setTaskName} value={task.name} />
            </div>
            <button onClick={() => setTaskComplition(id, !isComplete)}>{isComplete ? `Reopen` : `Complete`}</button>

            <div>
                <select onChange={setTaskGroup} value={task.group}>
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
        setTaskComplition(id, isComplete) {
            dispatch(mutations.setTaskComplition(id, isComplete));
        },
        setTaskName(e) {
            dispatch(mutations.setTaskName(id, e.target.value));
        },
        setTaskGroup(e) {
            dispatch(mutations.setTaskGroup(id, e.target.value));
        },
    }
};

export const ConnectedTaskDetail = connect(mapStateToProps, mapDispatchToProps)(TaskDetail);