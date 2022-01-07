import clsx from "clsx";
import { AddCircle, User } from "iconsax-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as todoActions from "../../../actions/todo";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
    const { newList, lists, isShowAddListForm } = useSelector((state) => state.todo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const params = useParams();
    const { listId } = params;

    useEffect(() => {
        if (isShowAddListForm) {
            const addListForm = document.querySelector("#addNewList");
            const addListFormInput = addListForm.querySelector("input");
            addListFormInput.focus();
        }
    }, [isShowAddListForm]);

    const handleNewListChange = ({ target }) => {
        dispatch(todoActions.setNewList(target.value));
    };

    const handleClickAddButton = () => {
        dispatch(todoActions.setAddListFormStatus(true));
    };

    const handleSubmitAddList = (e) => {
        e.preventDefault();
        dispatch(todoActions.addNewList({ id: String(Date.now()), name: newList }));
        dispatch(todoActions.setAddListFormStatus(false));
        dispatch(todoActions.setNewList(""));
    };

    const handleBlurAddList = (e) => {
        if (e.target.value) {
            handleSubmitAddList(e);
            return;
        }
        dispatch(todoActions.setNewList(""));
        dispatch(todoActions.setAddListFormStatus(false));
    };

    const handleEditList = (listId) => {};

    const handleRemoveList = (e, selectedId) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(todoActions.removeList(selectedId));

        if (listId === String(selectedId)) {
            const defaultList = lists.find((list) => list.isDefault);
            navigate(`/todos/${defaultList.id}/all`);
        }
    };

    return (
        <div className="w-82 border-r-2 border-gray-100 p-10">
            <div className="flex border-2 border-transparent">
                <div className="flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full">
                    <User className="w-10" />
                </div>
                <div className="flex flex-col justify-center ml-5">
                    <div className="font-semibold">Khanh Nguyen</div>
                    <div className="mt-1 text-sm text-gray-400">encacap@encacap.com</div>
                </div>
            </div>
            <div className="border-t-2 border-gray-100 mt-10 pt-6">
                <div className="mt-3 font-semibold text-sm text-gray-400">List</div>
                <div className="pt-3">
                    {lists.map((list) => (
                        <Link
                            to={`./${list.id}/all`}
                            className={clsx("group relative block", styles.list__item, {
                                [styles.active]: listId === String(list.id),
                            })}
                            key={list.id}
                        >
                            <div className="flex-1">{list.name}</div>
                            <div className="absolute right-0 top-2.5 hidden group-hover:flex items-center bg-white text-gray-400 font-normal">
                                <div className="mr-2 rounded-md bg-gray-100 px-2 py-1 text-xs hover:bg-gray-200 duration-200">
                                    Edit
                                </div>
                                {!list.isDefault && (
                                    <div
                                        className="rounded-md bg-gray-100 px-2 py-1 text-xs hover:bg-gray-200 duration-200"
                                        onClick={(e) => handleRemoveList(e, list.id)}
                                    >
                                        Delete
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                    {isShowAddListForm && (
                        <form action="" onSubmit={handleSubmitAddList} id="addNewList">
                            <input
                                type="text"
                                className="block w-full py-2 border-none outline-none font-semibold"
                                placeholder="Enter name..."
                                value={newList}
                                onChange={handleNewListChange}
                                onBlur={handleBlurAddList}
                            />
                        </form>
                    )}
                </div>
                <div
                    className="flex items-center justify-center mt-7 border-2 border-blue-500 rounded-md bg-blue-500 py-3 text-white hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                    onClick={handleClickAddButton}
                >
                    <AddCircle className="w-5 h-5 mr-2" variant="Outline" />
                    <div className="font-semibold text-sm">Create new list</div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
