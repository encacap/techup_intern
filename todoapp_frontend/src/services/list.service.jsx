import request from "../utils/request";

const listsRoute = (userId) => `/users/${userId}/lists`;
const listRoute = (userId, listId) => `${listsRoute(userId)}/${listId}`;

const createList = async (userId, listBody) => {
    return request.post(listsRoute(userId), listBody);
};

const getLists = (userId) => {
    return request.get(listsRoute(userId));
};

const updateListById = async (listId, listBody) => {
    const { user: userId } = listBody;
    const newList = await request.patch(listRoute(userId, listId), {
        name: listBody.name,
    });
    return newList;
};

const deleteListById = async (userId, listId) => {
    return request.delete(listRoute(userId, listId));
};

export { createList, getLists, updateListById, deleteListById };
