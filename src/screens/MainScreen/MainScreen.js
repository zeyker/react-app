import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect'

import classes from './MainScreen.module.css';
import Loader from '../../components/loader/Loader';
import Button from '../../components/Button/Button';
import * as actions from '../../store/actions';


const selectFilterdPosts = createSelector(
    state => state.posts,
    state => state.filter,
    (posts, filterValue) => posts.filter(post => post.name.includes(filterValue))
)

const MainScreen = props => {
    const [name, setName] = useState('');
    const [search, setSearch] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const posts = useSelector(selectFilterdPosts);
    const dispatch = useDispatch();


    const loadPosts = useCallback(async () => {
        try {
            await dispatch(actions.getPosts());
        } catch (err) {

        }
    }, [dispatch]);

    const addPostHandler = async (name, description) => {

        try {
            setIsloading(true);
            await dispatch(actions.addPost(name, description));
        } catch (error) {

        }
        setIsloading(false);
        setName('');
        setDescription('');
    }
    const deletePostHandler = async (id) => {

        try {
            setIsloading(true);
            await dispatch(actions.deletePost(id));
        } catch (error) {

        }
        setIsloading(false);
    }
    useEffect(() => {
        console.log('Fetching');
        setIsloading(true);
        loadPosts().then(() => {
            setIsloading(false);
        });
    }, [dispatch, loadPosts]);

    const filterPostHanlder = (value) => {
        dispatch(actions.filterPosts(value));
    }

    const inputSearchHandler = (event) => {
        setSearch(event.target.value);
    }
    const inputNameHandler = (event) => {
        setName(event.target.value);
    }
    const inputDescriptionHandler = (event) => {
        setDescription(event.target.value);
    }
    return (
        <div className={classes.mainContainer}>
            <h1 className={classes.mainTitle}>The Post app for TCIT</h1>
            <div className={classes.topControlsContainer}>
                <div className={classes.inputContainer}>
                    <input placeholder='Name...' className={classes.inputElement} onChange={(event) => inputSearchHandler(event)} value={search} />
                </div>
                <div>
                    <Button btnType='Save' clicked={() => filterPostHanlder(search)}>search</Button>
                </div>
            </div>
            <div className={classes.tableContainer}>
                 <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {posts.length > 0 ? (

                        <tbody>
                            {posts.map(post => (
                                <tr key={post.id}>
                                    <td>{post.name}</td>
                                    <td>{post.description}</td>
                                    <td><Button btnType='Danger' clicked={() => deletePostHandler(post.id)}>delete</Button></td>
                                </tr>
                            ))}


                        </tbody>

                    ) : null}

                </table>

            </div>
            <div className={classes.bottomControlsContainer}>
                <div className={classes.inputContainer}>
                    <input placeholder='Name...' className={classes.inputElement} onChange={(event) => inputNameHandler(event)} value={name} />
                </div>
                <div className={classes.inputContainer}>
                    <input placeholder='Description...' className={classes.inputElement} onChange={(event) => inputDescriptionHandler(event)} value={description} />
                </div>
                <div>
                    <Button btnType='Save' clicked={() => addPostHandler(name, description)}>Create</Button>
                </div>
            </div>
            {isLoading? <div className={classes.loaderContainer}>
                <Loader />
            </div> : null}

        </div>
    );
}

export default MainScreen;