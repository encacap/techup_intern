import PropTypes from "prop-types";

const HobbyList = (props) => {
    return (
        <ul>
            {props.hobbies.map((hobby) => (
                <li key={hobby.id}>{hobby.title}</li>
            ))}
        </ul>
    );
};

HobbyList.propTypes = {
    hobbies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

HobbyList.defaultProps = {
    hobbies: [],
};

export default HobbyList;
