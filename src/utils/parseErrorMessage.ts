import { getErrorMessage } from "react-declarative";

const ERROR_CONSTANTS = {
    BAD_EMAIL: "Wrong or invalid email!",
    INCORRECT_PASSWORD: "Your password is incorrect !",
    USER_NOT_FOUND: "The user was not found !",
    UNSPECTED_ERROR: "Unexpected error, please try again later."
};

export const parseErrorMessage = (error: any) => {

    if (error.code === "auth/user-not-found") {
        return ERROR_CONSTANTS.USER_NOT_FOUND;
    }

    if (error.code === "auth/wrong-password") {
        return ERROR_CONSTANTS.INCORRECT_PASSWORD;
    }

    if (error.code === "auth/invalid-email") {
        return ERROR_CONSTANTS.BAD_EMAIL;
    }

    return getErrorMessage(error) || ERROR_CONSTANTS.UNSPECTED_ERROR;
};

export default parseErrorMessage;
