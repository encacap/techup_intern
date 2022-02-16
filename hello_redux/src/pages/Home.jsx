import { useDispatch, useSelector } from "react-redux";
import { addNewHobby, setNewHobby } from "../actions/hobby";
import HobbyList from "../components/Home/HobbyList";

const Home = () => {
    const { hobbies: hobbyList, newHobby } = useSelector((state) => state.hobby);
    const dispatch = useDispatch();

    const handleInputNewHobby = ({ target }) => {
        dispatch(setNewHobby(target.value));
    };

    const handleAddHobby = (e) => {
        e.preventDefault();

        dispatch(
            addNewHobby({
                id: Date.now(),
                title: newHobby,
            })
        );
        dispatch(setNewHobby(""));
    };

    return (
        <>
            <form action="" onSubmit={handleAddHobby}>
                <label htmlFor="hobbyInput">Enter your new hobby: </label>
                <input
                    type="text"
                    name="hobbyInput"
                    id="hobbyInput"
                    placeholder="Ex: Playing game..."
                    value={newHobby}
                    onChange={handleInputNewHobby}
                />
            </form>
            <h1>Your hobbies</h1>
            <div>
                <HobbyList hobbies={hobbyList}></HobbyList>
            </div>
        </>
    );
};

export default Home;
