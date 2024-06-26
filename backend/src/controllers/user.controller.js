import {asyncHandler} from '../utils/asyncHandler.js'
import {apiError} from '../utils/apiError.js'
import {apiResponse} from '../utils/apiResponse.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/uploadOnCloudinary.js'

const generateAccessRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = await user.generateAccessToken();
    
        const refreshToken = await user.generateRefreshToken();
    
        user.refreshToken = refreshToken;
    
        await user.save({validateBeforeSave: false})
    
        return {accessToken, refreshToken} 
    } catch (error) {
        throw new apiError(500, "Something went wrong while generating access token")
    }
}

const registerUser = asyncHandler(async(req, res) => {

    const {username, email, password} = req.body;

    if(!username || !email  || !password){
        throw new apiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new apiError(400, "User already exists")
    }

    const user = await User.create({
        username: username,
        email, 
        password
    })

    const createdUser = await User.findById(user?._id).select("-password -refreshToken")

    if(!createdUser){
        throw new apiError(500, "Something went wrong while registering the user")
    }

    return res
    .status(200)
    .json(new apiResponse(200, createdUser, "User registered successfully"))
})

const loginUser = asyncHandler(async(req, res) => {

    const {username, password} = req.body

    if(!username|| !password){
        throw new apiError(400, "All fields are required")
    }

    const user = await User.findOne({
        $or: [{username}]
    })

    if(!user){
        throw new apiError(401, "User does not exists")
    }

    const isPasswordValid = await user.isValidPassword(password)

    if(!isPasswordValid){
        throw new apiError(402, "Password is incorrect")
    }

    const {accessToken, refreshToken} = await generateAccessRefreshToken(user?._id)

    const loggedInUser = await User.findById(user._id).select("-refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new apiResponse(200, {user: loggedInUser, accessToken, refreshToken}, "User loggedIn successfully"))
})

const logoutUser = asyncHandler(async(req, res) => {
    
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1,
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, "User LoggedOut successfully"))
})

const uploadAvatar = asyncHandler(async(req, res) => {

    const avatarLocalPath = req.file?.path;

    if(!avatarLocalPath){
        throw new apiError(401, "Upload the avatar")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar){
        throw new apiError(500, "Something went wrong while uploading the avatar")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            avatar: avatar.url
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    return res
    .status(200)
    .json(new apiResponse(200, user.avatar, "Avatar Uploaded successfully"))
})

const getUser = asyncHandler(async(req, res) => {

    const user = await User.findById(req.user?._id).select("-password -refreshToken")

    if(!user){
        throw new apiError(402, "User does not exists")
    }

    return res
    .status(200)
    .json(new apiResponse(200, user, "User fetch successfully"))
})

const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new apiResponse(200, req?.user?.username, "Current user got successfully"))
})

export {registerUser, loginUser, logoutUser, uploadAvatar, getUser, getCurrentUser}