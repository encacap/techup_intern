const dayjs = require("dayjs");
const configs = require("../../src/config/config");
const { tokenTypes } = require("../../src/config/tokens");
const { tokenService } = require("../../src/services");
const { userOne } = require("./user.fixture");

const accessTokenExpires = dayjs().add(
    configs.jwt.accessExpirationMinutes,
    "minutes"
);

const useOneAccessToken = tokenService.generateToken(
    userOne._id,
    accessTokenExpires,
    tokenTypes.ACCESS
);

module.exports = {
    useOneAccessToken,
};
